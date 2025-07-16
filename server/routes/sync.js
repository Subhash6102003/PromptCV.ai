import express from 'express'
import axios from 'axios'

const router = express.Router()

// Sync GitHub data
router.get('/github', async (req, res) => {
  try {
    if (!req.session.githubConnected || !req.session.githubData) {
      return res.status(401).json({ error: 'GitHub not connected' })
    }

    const { accessToken } = req.session.githubData
    
    // Fetch user repositories
    const reposResponse = await axios.get('https://api.github.com/user/repos', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'AI-Resume-Builder'
      },
      params: {
        sort: 'updated',
        per_page: 20
      }
    })

    // Fetch user profile
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'AI-Resume-Builder'
      }
    })

    // Process repositories to extract languages and key info
    const processedRepos = await Promise.all(
      reposResponse.data.map(async (repo) => {
        let languages = {}
        
        // Fetch languages for each repo
        try {
          const langResponse = await axios.get(repo.languages_url, {
            headers: {
              'Authorization': `token ${accessToken}`,
              'User-Agent': 'AI-Resume-Builder'
            }
          })
          languages = langResponse.data
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error.message)
        }

        return {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          languages: Object.keys(languages),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          topics: repo.topics || []
        }
      })
    )

    const syncData = {
      user: {
        login: userResponse.data.login,
        name: userResponse.data.name,
        bio: userResponse.data.bio,
        company: userResponse.data.company,
        location: userResponse.data.location,
        email: userResponse.data.email,
        blog: userResponse.data.blog,
        public_repos: userResponse.data.public_repos,
        followers: userResponse.data.followers,
        following: userResponse.data.following
      },
      repos: processedRepos
    }

    res.json(syncData)
  } catch (error) {
    console.error('GitHub sync error:', error)
    res.status(500).json({ error: 'Failed to sync GitHub data' })
  }
})

// Sync LinkedIn data
router.get('/linkedin', async (req, res) => {
  try {
    if (!req.session.linkedinConnected || !req.session.linkedinData) {
      return res.status(401).json({ error: 'LinkedIn not connected' })
    }

    const { accessToken } = req.session.linkedinData

    // Fetch LinkedIn profile
    const profileResponse = await axios.get('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,headline,summary,industry,positions,educations)', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    // Fetch email address
    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    const profile = profileResponse.data
    const email = emailResponse.data.elements?.[0]?.['handle~']?.emailAddress

    // Process LinkedIn data
    const syncData = {
      name: `${profile.firstName.localized.en_US} ${profile.lastName.localized.en_US}`,
      headline: profile.headline?.localized?.en_US,
      summary: profile.summary?.localized?.en_US,
      industry: profile.industry?.localized?.en_US,
      email: email,
      experience: profile.positions?.values?.map(pos => ({
        title: pos.title?.localized?.en_US,
        company: pos.companyName?.localized?.en_US,
        description: pos.description?.localized?.en_US,
        startDate: pos.startDate ? `${pos.startDate.month}/${pos.startDate.year}` : null,
        endDate: pos.endDate ? `${pos.endDate.month}/${pos.endDate.year}` : 'Present',
        location: pos.location?.localized?.en_US
      })) || [],
      education: profile.educations?.values?.map(edu => ({
        school: edu.schoolName?.localized?.en_US,
        degree: edu.degreeName?.localized?.en_US,
        field: edu.fieldOfStudy?.localized?.en_US,
        startYear: edu.startDate?.year,
        endYear: edu.endDate?.year,
        grade: edu.grade?.localized?.en_US
      })) || []
    }

    res.json(syncData)
  } catch (error) {
    console.error('LinkedIn sync error:', error)
    res.status(500).json({ error: 'Failed to sync LinkedIn data' })
  }
})

export default router
