import express from 'express'

const router = express.Router()

// Get available templates
router.get('/', async (req, res) => {
  try {
    const templates = [
      {
        id: 'modern',
        name: 'Modern Professional',
        description: 'Clean, contemporary design perfect for tech and creative roles',
        preview: '/templates/modern-preview.png',
        category: 'professional',
        isPremium: false
      },
      {
        id: 'classic',
        name: 'Classic Business',
        description: 'Traditional layout ideal for corporate and finance positions',
        preview: '/templates/classic-preview.png',
        category: 'business',
        isPremium: false
      },
      {
        id: 'creative',
        name: 'Creative Designer',
        description: 'Bold and artistic design for creative professionals',
        preview: '/templates/creative-preview.png',
        category: 'creative',
        isPremium: true
      },
      {
        id: 'minimal',
        name: 'Minimal Clean',
        description: 'Simple, distraction-free layout focusing on content',
        preview: '/templates/minimal-preview.png',
        category: 'minimal',
        isPremium: false
      },
      {
        id: 'executive',
        name: 'Executive Elite',
        description: 'Premium design for C-level and senior management',
        preview: '/templates/executive-preview.png',
        category: 'executive',
        isPremium: true
      },
      {
        id: 'tech',
        name: 'Tech Pro',
        description: 'Developer-focused template with project highlights',
        preview: '/templates/tech-preview.png',
        category: 'technology',
        isPremium: true
      }
    ]

    res.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    res.status(500).json({ error: 'Failed to fetch templates' })
  }
})

// Apply template to resume
router.put('/:resumeId/apply/:templateId', async (req, res) => {
  try {
    const { resumeId, templateId } = req.params

    // Here you would update the resume with the new template
    res.json({ 
      success: true, 
      templateId,
      message: 'Template applied successfully' 
    })
  } catch (error) {
    console.error('Error applying template:', error)
    res.status(500).json({ error: 'Failed to apply template' })
  }
})

// Get design customization options
router.get('/design-options', async (req, res) => {
  try {
    const designOptions = {
      fonts: [
        { id: 'inter', name: 'Inter', category: 'sans-serif', isPremium: false },
        { id: 'roboto', name: 'Roboto', category: 'sans-serif', isPremium: false },
        { id: 'open-sans', name: 'Open Sans', category: 'sans-serif', isPremium: false },
        { id: 'lato', name: 'Lato', category: 'sans-serif', isPremium: false },
        { id: 'montserrat', name: 'Montserrat', category: 'sans-serif', isPremium: true },
        { id: 'playfair', name: 'Playfair Display', category: 'serif', isPremium: true },
        { id: 'source-serif', name: 'Source Serif Pro', category: 'serif', isPremium: true }
      ],
      colors: [
        { id: 'navy', name: 'Navy Blue', primary: '#0F172A', secondary: '#334155' },
        { id: 'emerald', name: 'Emerald', primary: '#059669', secondary: '#065F46' },
        { id: 'purple', name: 'Purple', primary: '#7C3AED', secondary: '#5B21B6' },
        { id: 'rose', name: 'Rose', primary: '#E11D48', secondary: '#BE123C' },
        { id: 'amber', name: 'Amber', primary: '#D97706', secondary: '#92400E' },
        { id: 'slate', name: 'Slate', primary: '#475569', secondary: '#334155' }
      ],
      spacing: [
        { id: 'compact', name: 'Compact', value: 0.8 },
        { id: 'normal', name: 'Normal', value: 1.0 },
        { id: 'relaxed', name: 'Relaxed', value: 1.2 },
        { id: 'loose', name: 'Loose', value: 1.4 }
      ],
      margins: [
        { id: 'narrow', name: 'Narrow', value: '0.5in' },
        { id: 'normal', name: 'Normal', value: '0.75in' },
        { id: 'wide', name: 'Wide', value: '1in' }
      ]
    }

    res.json(designOptions)
  } catch (error) {
    console.error('Error fetching design options:', error)
    res.status(500).json({ error: 'Failed to fetch design options' })
  }
})

// Update resume design
router.put('/:resumeId/design', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { font, color, spacing, margins } = req.body

    // Here you would update the resume design settings
    res.json({ 
      success: true, 
      design: { font, color, spacing, margins },
      message: 'Design updated successfully' 
    })
  } catch (error) {
    console.error('Error updating design:', error)
    res.status(500).json({ error: 'Failed to update design' })
  }
})

export default router
