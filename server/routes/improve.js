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

// Improve text with AI
router.post('/improve', async (req, res) => {
  try {
    const { text, context, improvementType } = req.body

    if (!openai) {
      return res.status(503).json({ error: 'OpenAI service not configured' })
    }

    if (!text) {
      return res.status(400).json({ error: 'Text is required' })
    }

    let prompt = ''
    
    switch (improvementType) {
      case 'professional':
        prompt = `Rewrite the following text to be more professional and polished for a resume:\n\n"${text}"\n\nContext: ${context || 'General resume content'}\n\nImproved version:`
        break
      case 'concise':
        prompt = `Make the following text more concise and impactful for a resume:\n\n"${text}"\n\nContext: ${context || 'General resume content'}\n\nConcise version:`
        break
      case 'achievements':
        prompt = `Rewrite the following text to focus on achievements and quantifiable results:\n\n"${text}"\n\nContext: ${context || 'General resume content'}\n\nAchievement-focused version:`
        break
      case 'keywords':
        prompt = `Optimize the following text for ATS systems by including relevant keywords:\n\n"${text}"\n\nContext: ${context || 'General resume content'}\n\nKeyword-optimized version:`
        break
      default:
        prompt = `Improve the following resume text to be more engaging and professional:\n\n"${text}"\n\nContext: ${context || 'General resume content'}\n\nImproved version:`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer with expertise in creating compelling, ATS-friendly content. Always provide improved text that is professional, concise, and impactful."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7
    })

    const improvedText = completion.choices[0].message.content.trim()

    res.json({
      success: true,
      originalText: text,
      improvedText,
      improvementType,
      suggestions: [
        'Consider adding quantifiable metrics',
        'Use action verbs to start bullet points',
        'Include relevant industry keywords'
      ]
    })
  } catch (error) {
    console.error('Error improving text:', error)
    if (error.code === 'insufficient_quota') {
      res.status(402).json({ error: 'OpenAI API quota exceeded. Please try again later.' })
    } else {
      res.status(500).json({ error: 'Failed to improve text' })
    }
  }
})

// Generate content suggestions
router.post('/suggest', async (req, res) => {
  try {
    const { section, jobTitle, industry, experience } = req.body

    let prompt = ''
    
    switch (section) {
      case 'summary':
        prompt = `Generate a professional summary for a ${jobTitle} with ${experience} years of experience in ${industry}. Make it 2-3 sentences, highlighting key strengths and value proposition.`
        break
      case 'skills':
        prompt = `List 8-12 relevant skills for a ${jobTitle} in the ${industry} industry. Include both technical and soft skills.`
        break
      case 'experience':
        prompt = `Generate 3-4 bullet points describing responsibilities and achievements for a ${jobTitle} role in ${industry}. Focus on quantifiable results and impact.`
        break
      default:
        prompt = `Generate professional content for the ${section} section of a resume for a ${jobTitle} in ${industry}.`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Generate content that is specific, quantifiable, and tailored to the user's role and industry."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.8
    })

    const suggestions = completion.choices[0].message.content.trim()

    res.json({
      success: true,
      section,
      suggestions,
      metadata: {
        jobTitle,
        industry,
        experience,
        generatedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Error generating suggestions:', error)
    res.status(500).json({ error: 'Failed to generate suggestions' })
  }
})

// Grammar and spell check
router.post('/grammar-check', async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ error: 'Text is required' })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional editor. Check the provided text for grammar, spelling, and style issues. Return the corrected text and list any changes made."
        },
        {
          role: "user",
          content: `Please check the following text for grammar and spelling errors:\n\n"${text}"\n\nProvide the corrected version and list the changes made.`
        }
      ],
      max_tokens: 300,
      temperature: 0.3
    })

    const result = completion.choices[0].message.content.trim()

    res.json({
      success: true,
      originalText: text,
      result,
      checkedAt: new Date()
    })
  } catch (error) {
    console.error('Error checking grammar:', error)
    res.status(500).json({ error: 'Failed to check grammar' })
  }
})

export default router
