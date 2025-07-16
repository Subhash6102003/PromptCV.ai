import express from 'express'

const router = express.Router()

// Get available resume sections
router.get('/available', async (req, res) => {
  try {
    const availableSections = [
      {
        id: 'custom',
        name: 'Custom Section',
        description: 'Add your own custom content',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'content', type: 'textarea', required: true }
        ]
      },
      {
        id: 'languages',
        name: 'Languages',
        description: 'Languages you speak and proficiency levels',
        fields: [
          { name: 'language', type: 'text', required: true },
          { name: 'proficiency', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced', 'Native'], required: true }
        ]
      },
      {
        id: 'training',
        name: 'Training / Courses',
        description: 'Professional training and online courses',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'provider', type: 'text', required: true },
          { name: 'date', type: 'text', required: false },
          { name: 'description', type: 'textarea', required: false }
        ]
      },
      {
        id: 'achievements',
        name: 'Key Achievements',
        description: 'Notable accomplishments and awards',
        fields: [
          { name: 'title', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: true },
          { name: 'date', type: 'text', required: false }
        ]
      },
      {
        id: 'strengths',
        name: 'Strengths',
        description: 'Core competencies and soft skills',
        fields: [
          { name: 'strength', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: false }
        ]
      },
      {
        id: 'volunteering',
        name: 'Volunteering',
        description: 'Volunteer work and community involvement',
        fields: [
          { name: 'organization', type: 'text', required: true },
          { name: 'role', type: 'text', required: true },
          { name: 'startDate', type: 'text', required: false },
          { name: 'endDate', type: 'text', required: false },
          { name: 'description', type: 'textarea', required: false }
        ]
      },
      {
        id: 'expertise',
        name: 'Industry Expertise',
        description: 'Domain knowledge and specializations',
        fields: [
          { name: 'area', type: 'text', required: true },
          { name: 'level', type: 'range', min: 1, max: 10, required: true },
          { name: 'description', type: 'textarea', required: false }
        ]
      },
      {
        id: 'interests',
        name: 'Interests',
        description: 'Personal interests and hobbies',
        fields: [
          { name: 'interest', type: 'text', required: true },
          { name: 'description', type: 'textarea', required: false }
        ]
      },
      {
        id: 'timeline',
        name: 'My Time',
        description: 'Time allocation and availability',
        fields: [
          { name: 'activity', type: 'text', required: true },
          { name: 'percentage', type: 'number', min: 0, max: 100, required: true }
        ]
      }
    ]

    res.json(availableSections)
  } catch (error) {
    console.error('Error fetching available sections:', error)
    res.status(500).json({ error: 'Failed to fetch available sections' })
  }
})

// Add section to resume
router.post('/:resumeId/add', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { sectionType, sectionData, position } = req.body

    // Here you would typically save to database
    // For now, returning success response
    const newSection = {
      id: Date.now().toString(),
      type: sectionType,
      data: sectionData,
      position: position || 999,
      createdAt: new Date()
    }

    res.json({ 
      success: true, 
      section: newSection,
      message: 'Section added successfully' 
    })
  } catch (error) {
    console.error('Error adding section:', error)
    res.status(500).json({ error: 'Failed to add section' })
  }
})

// Rearrange sections
router.put('/:resumeId/rearrange', async (req, res) => {
  try {
    const { resumeId } = req.params
    const { sectionOrder } = req.body

    // Validate section order array
    if (!Array.isArray(sectionOrder)) {
      return res.status(400).json({ error: 'Section order must be an array' })
    }

    // Here you would update the database with new section order
    res.json({ 
      success: true, 
      sectionOrder,
      message: 'Sections rearranged successfully' 
    })
  } catch (error) {
    console.error('Error rearranging sections:', error)
    res.status(500).json({ error: 'Failed to rearrange sections' })
  }
})

// Delete section
router.delete('/:resumeId/sections/:sectionId', async (req, res) => {
  try {
    const { resumeId, sectionId } = req.params

    // Here you would delete from database
    res.json({ 
      success: true, 
      message: 'Section deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting section:', error)
    res.status(500).json({ error: 'Failed to delete section' })
  }
})

export default router
