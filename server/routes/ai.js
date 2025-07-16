import express from 'express'
import OpenAI from 'openai'

const router = express.Router()

// Initialize OpenAI only if API key is provided
let openai = null
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

// Generate AI content for resume sections
router.post('/generate', async (req, res) => {
  try {
    const { section, context, currentResume } = req.body

    if (!openai) {
      return res.status(503).json({ error: 'OpenAI service not configured' })
    }

    let prompt = ''
    let maxTokens = 150

    switch (section) {
      case 'summary':
        prompt = `Generate a professional resume summary for someone with the following background:
        
        Name: ${currentResume.personalInfo?.name || 'Professional'}
        Experience: ${JSON.stringify(currentResume.experience || [])}
        Skills: ${JSON.stringify(currentResume.skills || [])}
        Projects: ${JSON.stringify(currentResume.projects || [])}
        
        Write a compelling 2-3 sentence professional summary that highlights their key strengths and career objectives. Make it engaging and specific to their background.`
        maxTokens = 200
        break

      case 'experience':
        prompt = `Enhance the following work experience description to be more impactful and ATS-friendly:
        
        Current description: "${context.description || 'No description provided'}"
        Job title: ${context.title || ''}
        Company: ${context.company || ''}
        
        Rewrite this to include:
        - Specific achievements with quantifiable results where possible
        - Action verbs and industry keywords
        - 2-3 bullet points maximum
        - Professional tone suitable for ${context.industry || 'technology'} industry`
        maxTokens = 250
        break

      case 'skills':
        prompt = `Based on the following background, suggest relevant technical and soft skills:
        
        Experience: ${JSON.stringify(currentResume.experience || [])}
        Projects: ${JSON.stringify(currentResume.projects || [])}
        Current skills: ${JSON.stringify(currentResume.skills || [])}
        
        Return 5-8 additional skills that would be valuable for this professional. Focus on:
        - Technical skills relevant to their field
        - In-demand technologies
        - Complementary soft skills
        
        Return only a comma-separated list of skills, no explanations.`
        maxTokens = 100
        break

      case 'personalInfo':
        prompt = `Suggest improvements for this professional's personal branding:
        
        Current info: ${JSON.stringify(currentResume.personalInfo || {})}
        
        Provide suggestions for:
        - Professional email format
        - LinkedIn URL optimization
        - Personal website/portfolio suggestions
        
        Format as JSON with suggestions.`
        maxTokens = 150
        break

      default:
        return res.status(400).json({ error: 'Invalid section type' })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer and career counselor. Provide concise, impactful content that will help job seekers stand out to employers and pass ATS systems."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    })

    const generatedContent = completion.choices[0].message.content.trim()

    // Process the content based on section type
    let processedContent = generatedContent
    
    if (section === 'skills') {
      // Convert comma-separated skills to array
      processedContent = generatedContent
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)
    }

    res.json({
      content: processedContent,
      section: section,
      tokens_used: completion.usage.total_tokens
    })

  } catch (error) {
    console.error('OpenAI generation error:', error)
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: 'OpenAI quota exceeded. Please try again later.' })
    }
    
    res.status(500).json({ error: 'Failed to generate AI content' })
  }
})

// Generate resume suggestions
router.post('/suggestions', async (req, res) => {
  try {
    const { resume } = req.body

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' })
    }

    const prompt = `Analyze this resume and provide improvement suggestions:
    
    ${JSON.stringify(resume, null, 2)}
    
    Provide specific, actionable suggestions for:
    1. Content improvements
    2. Missing sections
    3. Keyword optimization
    4. Structure enhancements
    
    Format as a JSON object with categories and specific suggestions.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system", 
          content: "You are an expert resume reviewer and ATS optimization specialist. Provide detailed, actionable feedback to improve resume effectiveness."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    })

    const suggestions = completion.choices[0].message.content.trim()

    res.json({
      suggestions: suggestions,
      tokens_used: completion.usage.total_tokens
    })

  } catch (error) {
    console.error('AI suggestions error:', error)
    res.status(500).json({ error: 'Failed to generate suggestions' })
  }
})

export default router
