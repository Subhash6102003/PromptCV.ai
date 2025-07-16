import express from 'express'

const router = express.Router()

// In-memory storage for demo purposes
// In production, replace with proper database
let resumes = new Map()

// Save resume
router.post('/save', (req, res) => {
  try {
    const { resume, template } = req.body
    const resumeId = Date.now().toString() // Simple ID generation
    
    const resumeData = {
      id: resumeId,
      resume,
      template,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    resumes.set(resumeId, resumeData)
    
    res.json({
      success: true,
      id: resumeId,
      message: 'Resume saved successfully'
    })
  } catch (error) {
    console.error('Resume save error:', error)
    res.status(500).json({ error: 'Failed to save resume' })
  }
})

// Load resume
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const resumeData = resumes.get(id)
    
    if (!resumeData) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    
    res.json(resumeData)
  } catch (error) {
    console.error('Resume load error:', error)
    res.status(500).json({ error: 'Failed to load resume' })
  }
})

// List user's resumes
router.get('/', (req, res) => {
  try {
    // In production, filter by user ID
    const allResumes = Array.from(resumes.values()).map(resume => ({
      id: resume.id,
      title: resume.resume.personalInfo?.name || 'Untitled Resume',
      template: resume.template,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt
    }))
    
    res.json(allResumes)
  } catch (error) {
    console.error('Resume list error:', error)
    res.status(500).json({ error: 'Failed to load resumes' })
  }
})

// Update resume
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const { resume, template } = req.body
    
    const existingResume = resumes.get(id)
    if (!existingResume) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    
    const updatedResume = {
      ...existingResume,
      resume,
      template,
      updatedAt: new Date()
    }
    
    resumes.set(id, updatedResume)
    
    res.json({
      success: true,
      message: 'Resume updated successfully'
    })
  } catch (error) {
    console.error('Resume update error:', error)
    res.status(500).json({ error: 'Failed to update resume' })
  }
})

// Delete resume
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params
    
    if (!resumes.has(id)) {
      return res.status(404).json({ error: 'Resume not found' })
    }
    
    resumes.delete(id)
    
    res.json({
      success: true,
      message: 'Resume deleted successfully'
    })
  } catch (error) {
    console.error('Resume delete error:', error)
    res.status(500).json({ error: 'Failed to delete resume' })
  }
})

// Apply LinkedIn data to resume
router.post('/apply-linkedin', async (req, res) => {
  try {
    const { data } = req.body
    
    // Process and apply LinkedIn data to the user's resume
    const resumeUpdate = {
      personalInfo: {
        name: data.name || '',
        title: data.title || '',
        location: data.location || '',
        summary: data.summary || ''
      },
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || []
    }
    
    // Here you would typically save this to the database
    // For now, we'll just return a success response
    
    res.json({
      success: true,
      message: 'LinkedIn data applied successfully',
      appliedData: resumeUpdate
    })
  } catch (error) {
    console.error('Error applying LinkedIn data:', error)
    res.status(500).json({ error: 'Failed to apply LinkedIn data' })
  }
})

// Apply GitHub data to resume
router.post('/apply-github', async (req, res) => {
  try {
    const { data } = req.body
    
    // Process and apply GitHub data to the user's resume
    const resumeUpdate = {
      personalInfo: {
        name: data.profile?.name || data.profile?.login || '',
        bio: data.profile?.bio || '',
        location: data.profile?.location || '',
        website: data.profile?.blog || data.profile?.html_url || ''
      },
      projects: data.repositories?.slice(0, 5).map(repo => ({
        name: repo.name,
        description: repo.description || '',
        technologies: repo.language ? [repo.language] : [],
        url: repo.html_url,
        stars: repo.stargazers_count || 0
      })) || [],
      skills: data.stats?.languages || [],
      githubStats: {
        repositories: data.stats?.totalRepos || 0,
        stars: data.stats?.totalStars || 0,
        followers: data.profile?.followers || 0
      }
    }
    
    // Here you would typically save this to the database
    // For now, we'll just return a success response
    
    res.json({
      success: true,
      message: 'GitHub data applied successfully',
      appliedData: resumeUpdate
    })
  } catch (error) {
    console.error('Error applying GitHub data:', error)
    res.status(500).json({ error: 'Failed to apply GitHub data' })
  }
})

export default router
