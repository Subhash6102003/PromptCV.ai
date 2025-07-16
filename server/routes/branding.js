import express from 'express'

const router = express.Router()

// Get branding settings
router.get('/settings', async (req, res) => {
  try {
    const brandingSettings = {
      company: {
        name: 'AI Resume Builder',
        logo: '/assets/logo.png',
        primaryColor: '#0F172A',
        secondaryColor: '#FFFFFF',
        accentColor: '#3B82F6'
      },
      customization: {
        allowCustomBranding: true,
        watermarkEnabled: false,
        footerText: 'Created with AI Resume Builder',
        showBranding: true
      },
      subscription: {
        plan: 'free', // free, pro, enterprise
        features: {
          customLogo: false,
          removeWatermark: false,
          customColors: false,
          whiteLabel: false
        }
      }
    }

    res.json({
      success: true,
      branding: brandingSettings
    })
  } catch (error) {
    console.error('Error fetching branding settings:', error)
    res.status(500).json({ error: 'Failed to fetch branding settings' })
  }
})

// Update branding settings (Pro/Enterprise only)
router.put('/settings', async (req, res) => {
  try {
    const { 
      companyName, 
      logoUrl, 
      primaryColor, 
      secondaryColor, 
      accentColor,
      footerText,
      showBranding,
      watermarkEnabled 
    } = req.body

    // Check subscription level
    const userPlan = 'free' // In production, get from user session/database
    
    if (userPlan === 'free') {
      return res.status(403).json({ 
        error: 'Custom branding requires Pro or Enterprise subscription',
        upgradeRequired: true 
      })
    }

    const updatedBranding = {
      company: {
        name: companyName || 'AI Resume Builder',
        logo: logoUrl || '/assets/logo.png',
        primaryColor: primaryColor || '#0F172A',
        secondaryColor: secondaryColor || '#FFFFFF',
        accentColor: accentColor || '#3B82F6'
      },
      customization: {
        footerText: footerText || 'Created with AI Resume Builder',
        showBranding: showBranding !== false,
        watermarkEnabled: watermarkEnabled || false
      },
      updatedAt: new Date()
    }

    // In production, save to database
    res.json({
      success: true,
      branding: updatedBranding,
      message: 'Branding settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating branding settings:', error)
    res.status(500).json({ error: 'Failed to update branding settings' })
  }
})

// Upload custom logo
router.post('/logo', async (req, res) => {
  try {
    // Check subscription level
    const userPlan = 'free' // In production, get from user session/database
    
    if (userPlan === 'free') {
      return res.status(403).json({ 
        error: 'Custom logo requires Pro or Enterprise subscription',
        upgradeRequired: true 
      })
    }

    // In production, handle file upload with multer or similar
    const logoUrl = '/uploads/custom-logo.png' // Mock URL

    res.json({
      success: true,
      logoUrl,
      message: 'Logo uploaded successfully'
    })
  } catch (error) {
    console.error('Error uploading logo:', error)
    res.status(500).json({ error: 'Failed to upload logo' })
  }
})

// Get subscription plans with branding features
router.get('/plans', async (req, res) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: {
          resumes: 3,
          templates: 3,
          downloads: 'PDF only',
          branding: {
            customLogo: false,
            removeWatermark: false,
            customColors: false,
            whiteLabel: false,
            customFooter: false
          }
        }
      },
      {
        id: 'pro',
        name: 'Pro',
        price: 9.99,
        popular: true,
        features: {
          resumes: 'Unlimited',
          templates: 'All premium',
          downloads: 'PDF, Word, Text',
          branding: {
            customLogo: true,
            removeWatermark: true,
            customColors: true,
            whiteLabel: false,
            customFooter: true
          }
        }
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 29.99,
        features: {
          resumes: 'Unlimited',
          templates: 'All + Custom',
          downloads: 'All formats',
          branding: {
            customLogo: true,
            removeWatermark: true,
            customColors: true,
            whiteLabel: true,
            customFooter: true,
            apiAccess: true,
            bulkOperations: true
          }
        }
      }
    ]

    res.json({
      success: true,
      plans
    })
  } catch (error) {
    console.error('Error fetching plans:', error)
    res.status(500).json({ error: 'Failed to fetch plans' })
  }
})

// Apply branding to resume
router.post('/:resumeId/apply', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { brandingConfig } = req.body

    // Check subscription permissions
    const userPlan = 'free' // In production, get from user session/database
    
    if (userPlan === 'free' && (brandingConfig.customLogo || brandingConfig.removeWatermark)) {
      return res.status(403).json({ 
        error: 'Advanced branding features require subscription upgrade',
        upgradeRequired: true 
      })
    }

    // Apply branding to resume
    const appliedBranding = {
      resumeId,
      branding: brandingConfig,
      appliedAt: new Date()
    }

    res.json({
      success: true,
      branding: appliedBranding,
      message: 'Branding applied to resume successfully'
    })
  } catch (error) {
    console.error('Error applying branding:', error)
    res.status(500).json({ error: 'Failed to apply branding' })
  }
})

// Get white-label settings (Enterprise only)
router.get('/white-label', async (req, res) => {
  try {
    const userPlan = 'free' // In production, get from user session/database
    
    if (userPlan !== 'enterprise') {
      return res.status(403).json({ 
        error: 'White-label features require Enterprise subscription',
        upgradeRequired: true 
      })
    }

    const whiteLabelSettings = {
      domain: {
        custom: false,
        url: null,
        sslEnabled: false
      },
      branding: {
        hidePoweredBy: true,
        customEmailTemplates: true,
        customLoadingScreen: true,
        customErrorPages: true
      },
      api: {
        customEndpoints: true,
        webhook: true,
        bulkOperations: true
      }
    }

    res.json({
      success: true,
      whiteLabel: whiteLabelSettings
    })
  } catch (error) {
    console.error('Error fetching white-label settings:', error)
    res.status(500).json({ error: 'Failed to fetch white-label settings' })
  }
})

// Preview branding changes
router.post('/preview', async (req, res) => {
  try {
    const { brandingConfig } = req.body

    // Generate preview URL or data
    const preview = {
      previewId: `preview-${Date.now()}`,
      brandingConfig,
      previewUrl: `/api/branding/preview/${Date.now()}`,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    }

    res.json({
      success: true,
      preview
    })
  } catch (error) {
    console.error('Error generating branding preview:', error)
    res.status(500).json({ error: 'Failed to generate preview' })
  }
})

export default router
