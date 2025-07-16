import express from 'express'

const router = express.Router()

// Get resume version history
router.get('/:resumeId', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { limit = 20, offset = 0 } = req.query

    // Mock version history data
    const versionHistory = [
      {
        id: 'v1',
        version: '1.5',
        title: 'Updated work experience',
        description: 'Added new role at TechCorp and updated skills section',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        author: 'John Doe',
        changes: [
          { section: 'experience', action: 'added', description: 'New role: Senior Developer at TechCorp' },
          { section: 'skills', action: 'updated', description: 'Added React Native and TypeScript' }
        ],
        isCurrent: true,
        size: '2.4 KB'
      },
      {
        id: 'v2',
        version: '1.4',
        title: 'Template design update',
        description: 'Changed to modern template with better formatting',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        author: 'John Doe',
        changes: [
          { section: 'template', action: 'changed', description: 'Switched from classic to modern template' },
          { section: 'formatting', action: 'updated', description: 'Improved spacing and typography' }
        ],
        isCurrent: false,
        size: '2.1 KB'
      },
      {
        id: 'v3',
        version: '1.3',
        title: 'AI-enhanced content',
        description: 'Used AI to improve job descriptions and summary',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        author: 'John Doe',
        changes: [
          { section: 'summary', action: 'improved', description: 'AI-enhanced professional summary' },
          { section: 'experience', action: 'improved', description: 'Enhanced job descriptions with quantifiable results' }
        ],
        isCurrent: false,
        size: '2.0 KB'
      },
      {
        id: 'v4',
        version: '1.2',
        title: 'Added education section',
        description: 'Included university degree and certifications',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        author: 'John Doe',
        changes: [
          { section: 'education', action: 'added', description: 'Added Computer Science degree from MIT' },
          { section: 'certifications', action: 'added', description: 'Added AWS Solutions Architect certification' }
        ],
        isCurrent: false,
        size: '1.8 KB'
      },
      {
        id: 'v5',
        version: '1.1',
        title: 'LinkedIn sync integration',
        description: 'Synchronized profile data from LinkedIn',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        author: 'John Doe',
        changes: [
          { section: 'experience', action: 'synced', description: 'Imported work history from LinkedIn' },
          { section: 'profile', action: 'synced', description: 'Updated contact information from LinkedIn' }
        ],
        isCurrent: false,
        size: '1.5 KB'
      },
      {
        id: 'v6',
        version: '1.0',
        title: 'Initial resume creation',
        description: 'Created first version of resume',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
        author: 'John Doe',
        changes: [
          { section: 'all', action: 'created', description: 'Initial resume creation with basic information' }
        ],
        isCurrent: false,
        size: '1.2 KB'
      }
    ]

    // Apply pagination
    const paginatedHistory = versionHistory.slice(parseInt(offset), parseInt(offset) + parseInt(limit))

    res.json({
      success: true,
      versions: paginatedHistory,
      pagination: {
        total: versionHistory.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < versionHistory.length
      }
    })
  } catch (error) {
    console.error('Error fetching version history:', error)
    res.status(500).json({ error: 'Failed to fetch version history' })
  }
})

// Create new version (save current state)
router.post('/:resumeId/save', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { title, description, changes } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Version title is required' })
    }

    const newVersion = {
      id: `v${Date.now()}`,
      version: '1.6', // In production, increment based on latest version
      title,
      description: description || '',
      createdAt: new Date(),
      author: 'John Doe', // In production, get from session
      changes: changes || [],
      isCurrent: true,
      size: '2.5 KB' // In production, calculate actual size
    }

    // In production, save to database and update previous current version
    res.json({
      success: true,
      version: newVersion,
      message: 'New version saved successfully'
    })
  } catch (error) {
    console.error('Error saving version:', error)
    res.status(500).json({ error: 'Failed to save version' })
  }
})

// Restore specific version
router.post('/:resumeId/restore/:versionId', async (req, res) => {
  try {
    const { resumeId, versionId } = req.params

    // In production, fetch version data and restore it
    const restoredVersion = {
      id: versionId,
      restoredAt: new Date(),
      newVersionId: `v${Date.now()}`,
      message: 'Version restored successfully'
    }

    res.json({
      success: true,
      restored: restoredVersion
    })
  } catch (error) {
    console.error('Error restoring version:', error)
    res.status(500).json({ error: 'Failed to restore version' })
  }
})

// Compare versions
router.get('/:resumeId/compare/:version1/:version2', async (req, res) => {
  try {
    const { resumeId, version1, version2 } = req.params

    // Mock comparison data
    const comparison = {
      version1: {
        id: version1,
        version: '1.4',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      version2: {
        id: version2,
        version: '1.5',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      differences: [
        {
          section: 'experience',
          type: 'addition',
          description: 'Added new role: Senior Developer at TechCorp',
          content: {
            added: 'Senior Developer at TechCorp (2024 - Present)',
            context: 'Work Experience section'
          }
        },
        {
          section: 'skills',
          type: 'modification',
          description: 'Updated technical skills',
          content: {
            before: 'JavaScript, React, Node.js, Python',
            after: 'JavaScript, React, React Native, Node.js, TypeScript, Python',
            context: 'Technical Skills section'
          }
        },
        {
          section: 'summary',
          type: 'modification',
          description: 'Enhanced professional summary',
          content: {
            before: 'Experienced developer with 4+ years...',
            after: 'Experienced developer with 5+ years...',
            context: 'Professional Summary'
          }
        }
      ],
      summary: {
        additions: 1,
        modifications: 2,
        deletions: 0,
        totalChanges: 3
      }
    }

    res.json({
      success: true,
      comparison
    })
  } catch (error) {
    console.error('Error comparing versions:', error)
    res.status(500).json({ error: 'Failed to compare versions' })
  }
})

// Get version details
router.get('/:resumeId/version/:versionId', async (req, res) => {
  try {
    const { resumeId, versionId } = req.params

    // Mock version details
    const versionDetails = {
      id: versionId,
      version: '1.4',
      title: 'Template design update',
      description: 'Changed to modern template with better formatting',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: 'John Doe',
      size: '2.1 KB',
      changes: [
        { section: 'template', action: 'changed', description: 'Switched from classic to modern template' },
        { section: 'formatting', action: 'updated', description: 'Improved spacing and typography' }
      ],
      resumeData: {
        // Mock resume data for this version
        name: 'John Doe',
        title: 'Software Developer',
        summary: 'Experienced developer with 4+ years in full-stack development...',
        template: 'modern'
      }
    }

    res.json({
      success: true,
      version: versionDetails
    })
  } catch (error) {
    console.error('Error fetching version details:', error)
    res.status(500).json({ error: 'Failed to fetch version details' })
  }
})

// Delete version
router.delete('/:resumeId/version/:versionId', async (req, res) => {
  try {
    const { resumeId, versionId } = req.params

    // In production, check if version can be deleted (not current version)
    res.json({
      success: true,
      message: 'Version deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting version:', error)
    res.status(500).json({ error: 'Failed to delete version' })
  }
})

// Auto-save functionality
router.post('/:resumeId/autosave', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { resumeData } = req.body

    // Create auto-save version
    const autoSaveVersion = {
      id: `autosave-${Date.now()}`,
      type: 'autosave',
      createdAt: new Date(),
      resumeData
    }

    // In production, save as temporary version
    res.json({
      success: true,
      autoSave: autoSaveVersion,
      message: 'Auto-save completed'
    })
  } catch (error) {
    console.error('Error auto-saving:', error)
    res.status(500).json({ error: 'Failed to auto-save' })
  }
})

export default router
