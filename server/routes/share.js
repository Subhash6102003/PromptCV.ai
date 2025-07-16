import express from 'express'

const router = express.Router()

// Share resume publicly
router.post('/:resumeId/create', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { 
      shareType = 'public', 
      expiresIn = null, 
      password = null,
      allowDownload = true,
      allowComments = false 
    } = req.body

    // Generate unique share ID
    const shareId = generateShareId()
    const shareUrl = `${process.env.FRONTEND_URL}/shared/${shareId}`

    const shareLink = {
      id: shareId,
      resumeId,
      shareUrl,
      shareType,
      expiresAt: expiresIn ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000) : null,
      password,
      allowDownload,
      allowComments,
      views: 0,
      createdAt: new Date(),
      isActive: true
    }

    // In production, save to database
    res.json({
      success: true,
      shareLink,
      message: 'Share link created successfully'
    })
  } catch (error) {
    console.error('Error creating share link:', error)
    res.status(500).json({ error: 'Failed to create share link' })
  }
})

// Get shared resume
router.get('/view/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params
    const { password } = req.query

    // In production, fetch from database
    const shareLink = {
      id: shareId,
      resumeId: 'sample-resume-id',
      shareType: 'public',
      allowDownload: true,
      allowComments: false,
      views: 42,
      expiresAt: null,
      password: null
    }

    // Check if share link exists and is active
    if (!shareLink || !shareLink.isActive) {
      return res.status(404).json({ error: 'Share link not found or expired' })
    }

    // Check expiration
    if (shareLink.expiresAt && new Date() > shareLink.expiresAt) {
      return res.status(410).json({ error: 'Share link has expired' })
    }

    // Check password protection
    if (shareLink.password && shareLink.password !== password) {
      return res.status(401).json({ error: 'Password required or incorrect' })
    }

    // Increment view count (in production, update database)
    shareLink.views += 1

    // Mock resume data
    const resumeData = {
      id: shareLink.resumeId,
      name: 'John Doe',
      title: 'Senior Software Developer',
      summary: 'Experienced developer with 5+ years in full-stack development...',
      experience: [
        {
          title: 'Senior Developer',
          company: 'Tech Corp',
          duration: '2022 - Present',
          description: 'Led development of microservices architecture...'
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      template: 'modern'
    }

    res.json({
      success: true,
      resume: resumeData,
      shareSettings: {
        allowDownload: shareLink.allowDownload,
        allowComments: shareLink.allowComments,
        views: shareLink.views
      }
    })
  } catch (error) {
    console.error('Error fetching shared resume:', error)
    res.status(500).json({ error: 'Failed to fetch shared resume' })
  }
})

// Get share analytics
router.get('/:resumeId/analytics', async (req, res) => {
  try {
    const { resumeId } = req.params

    // Mock analytics data
    const analytics = {
      totalShares: 3,
      totalViews: 127,
      uniqueViewers: 89,
      shares: [
        {
          id: 'share1',
          shareUrl: `${process.env.FRONTEND_URL}/shared/abc123`,
          views: 67,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          isActive: true
        },
        {
          id: 'share2',
          shareUrl: `${process.env.FRONTEND_URL}/shared/def456`,
          views: 34,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          isActive: true
        },
        {
          id: 'share3',
          shareUrl: `${process.env.FRONTEND_URL}/shared/ghi789`,
          views: 26,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          isActive: false
        }
      ],
      viewsOverTime: [
        { date: '2024-01-01', views: 15 },
        { date: '2024-01-02', views: 23 },
        { date: '2024-01-03', views: 18 },
        { date: '2024-01-04', views: 31 },
        { date: '2024-01-05', views: 40 }
      ]
    }

    res.json({
      success: true,
      analytics
    })
  } catch (error) {
    console.error('Error fetching share analytics:', error)
    res.status(500).json({ error: 'Failed to fetch share analytics' })
  }
})

// Update share settings
router.put('/update/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params
    const { allowDownload, allowComments, expiresIn, password } = req.body

    // In production, update database
    const updatedShare = {
      id: shareId,
      allowDownload: allowDownload !== undefined ? allowDownload : true,
      allowComments: allowComments !== undefined ? allowComments : false,
      expiresAt: expiresIn ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000) : null,
      password,
      updatedAt: new Date()
    }

    res.json({
      success: true,
      shareLink: updatedShare,
      message: 'Share settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating share settings:', error)
    res.status(500).json({ error: 'Failed to update share settings' })
  }
})

// Deactivate share link
router.delete('/deactivate/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params

    // In production, update database to set isActive = false
    res.json({
      success: true,
      message: 'Share link deactivated successfully'
    })
  } catch (error) {
    console.error('Error deactivating share link:', error)
    res.status(500).json({ error: 'Failed to deactivate share link' })
  }
})

// Social media sharing
router.post('/:resumeId/social', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { platform, message } = req.body

    const shareUrl = `${process.env.FRONTEND_URL}/shared/${generateShareId()}`
    
    const socialLinks = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message || 'Check out my professional resume')}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=My Professional Resume&body=${encodeURIComponent(`${message || 'I wanted to share my professional resume with you:'}\n\n${shareUrl}`)}`
    }

    res.json({
      success: true,
      platform,
      shareUrl: socialLinks[platform] || shareUrl,
      directUrl: shareUrl
    })
  } catch (error) {
    console.error('Error creating social share:', error)
    res.status(500).json({ error: 'Failed to create social share' })
  }
})

function generateShareId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export default router
