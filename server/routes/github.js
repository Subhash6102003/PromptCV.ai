import express from 'express'
import axios from 'axios'

const router = express.Router()

// GitHub API endpoints
const GITHUB_API_BASE = 'https://api.github.com'

// Get user's GitHub profile
router.get('/profile/:username', async (req, res) => {
  try {
    const { username } = req.params
    const token = req.headers.authorization?.replace('Bearer ', '')

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'PromptCV-AI'
    }
    
    if (token) {
      headers.Authorization = `token ${token}`
    }

    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers })
    
    res.json({
      success: true,
      profile: response.data
    })

  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    res.status(500).json({ error: 'Failed to fetch GitHub profile' })
  }
})

// Get user's repositories
router.get('/repos/:username', async (req, res) => {
  try {
    const { username } = req.params
    const { sort = 'updated', per_page = 30 } = req.query
    const token = req.headers.authorization?.replace('Bearer ', '')

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'PromptCV-AI'
    }
    
    if (token) {
      headers.Authorization = `token ${token}`
    }

    const response = await axios.get(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=${sort}&per_page=${per_page}`,
      { headers }
    )

    // Filter and format repositories
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      language: repo.language,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      topics: repo.topics,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      isPrivate: repo.private,
      isFork: repo.fork
    }))

    res.json({
      success: true,
      repositories: repos,
      totalCount: repos.length
    })

  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    res.status(500).json({ error: 'Failed to fetch repositories' })
  }
})

// Get repository languages
router.get('/repos/:username/:repo/languages', async (req, res) => {
  try {
    const { username, repo } = req.params
    const token = req.headers.authorization?.replace('Bearer ', '')

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'PromptCV-AI'
    }
    
    if (token) {
      headers.Authorization = `token ${token}`
    }

    const response = await axios.get(
      `${GITHUB_API_BASE}/repos/${username}/${repo}/languages`,
      { headers }
    )

    res.json({
      success: true,
      languages: response.data
    })

  } catch (error) {
    console.error('Error fetching repository languages:', error)
    res.status(500).json({ error: 'Failed to fetch repository languages' })
  }
})

// Get user's GitHub statistics
router.get('/stats/:username', async (req, res) => {
  try {
    const { username } = req.params
    const token = req.headers.authorization?.replace('Bearer ', '')

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'PromptCV-AI'
    }
    
    if (token) {
      headers.Authorization = `token ${token}`
    }

    // Get profile and repos in parallel
    const [profileResponse, reposResponse] = await Promise.all([
      axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers }),
      axios.get(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100`, { headers })
    ])

    const profile = profileResponse.data
    const repos = reposResponse.data

    // Calculate statistics
    const stats = {
      totalRepos: profile.public_repos,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: {},
      topRepositories: repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url
        }))
    }

    // Get language statistics for top repos
    const languagePromises = stats.topRepositories.slice(0, 5).map(repo =>
      axios.get(`${GITHUB_API_BASE}/repos/${username}/${repo.name}/languages`, { headers })
        .catch(() => ({ data: {} }))
    )

    const languageResponses = await Promise.all(languagePromises)
    
    languageResponses.forEach(response => {
      Object.entries(response.data).forEach(([language, bytes]) => {
        stats.languages[language] = (stats.languages[language] || 0) + bytes
      })
    })

    res.json({
      success: true,
      profile: {
        username: profile.login,
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        company: profile.company,
        blog: profile.blog,
        followers: profile.followers,
        following: profile.following
      },
      stats
    })

  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    res.status(500).json({ error: 'Failed to fetch GitHub statistics' })
  }
})

// Connect GitHub (save user's GitHub data)
router.post('/connect', async (req, res) => {
  try {
    const { username, token } = req.body

    if (!username) {
      return res.status(400).json({ error: 'GitHub username is required' })
    }

    // Verify the token and username
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'PromptCV-AI'
    }
    
    if (token) {
      headers.Authorization = `token ${token}`
    }

    const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers })
    
    // Here you would save the GitHub connection info to the database
    res.json({
      success: true,
      message: 'GitHub account connected successfully',
      profile: response.data
    })

  } catch (error) {
    console.error('Error connecting GitHub:', error)
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'GitHub user not found' })
    } else {
      res.status(500).json({ error: 'Failed to connect GitHub account' })
    }
  }
})

export default router
