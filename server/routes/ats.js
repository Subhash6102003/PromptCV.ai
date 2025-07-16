import express from 'express'

const router = express.Router()

// ATS keyword database (in production, this would be more comprehensive)
const atsKeywords = {
  'software-developer': [
    'JavaScript', 'Python', 'React', 'Node.js', 'Git', 'API', 'Database', 'Agile', 'Scrum',
    'Frontend', 'Backend', 'Full-stack', 'DevOps', 'CI/CD', 'Testing', 'Debug'
  ],
  'data-scientist': [
    'Python', 'R', 'Machine Learning', 'Statistics', 'SQL', 'Pandas', 'NumPy', 'TensorFlow',
    'PyTorch', 'Data Visualization', 'Big Data', 'Analytics', 'Algorithms'
  ],
  'marketing-manager': [
    'Digital Marketing', 'SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics',
    'Campaign Management', 'Brand Strategy', 'Lead Generation', 'Conversion Optimization'
  ],
  'project-manager': [
    'Project Management', 'Agile', 'Scrum', 'Kanban', 'Risk Management', 'Stakeholder Management',
    'Budget Management', 'Timeline Management', 'Resource Planning', 'PMP', 'Jira'
  ]
}

// Run ATS compatibility check
router.post('/check', async (req, res) => {
  try {
    const { resumeContent, jobTitle, jobDescription } = req.body

    if (!resumeContent) {
      return res.status(400).json({ error: 'Resume content is required' })
    }

    // Analyze resume content
    const analysis = analyzeATS(resumeContent, jobTitle, jobDescription)

    res.json({
      success: true,
      score: analysis.score,
      analysis: analysis,
      recommendations: generateRecommendations(analysis),
      checkedAt: new Date()
    })
  } catch (error) {
    console.error('Error running ATS check:', error)
    res.status(500).json({ error: 'Failed to run ATS check' })
  }
})

// Get ATS optimization suggestions
router.post('/optimize', async (req, res) => {
  try {
    const { section, content, jobTitle } = req.body

    const suggestions = getOptimizationSuggestions(section, content, jobTitle)

    res.json({
      success: true,
      section,
      suggestions,
      optimizedAt: new Date()
    })
  } catch (error) {
    console.error('Error generating ATS suggestions:', error)
    res.status(500).json({ error: 'Failed to generate ATS suggestions' })
  }
})

function analyzeATS(resumeContent, jobTitle, jobDescription) {
  const analysis = {
    score: 0,
    sections: {},
    keywords: {},
    formatting: {},
    overall: {}
  }

  // Keyword analysis
  const relevantKeywords = getRelevantKeywords(jobTitle)
  const foundKeywords = []
  const missingKeywords = []

  relevantKeywords.forEach(keyword => {
    if (resumeContent.toLowerCase().includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword)
    } else {
      missingKeywords.push(keyword)
    }
  })

  analysis.keywords = {
    found: foundKeywords,
    missing: missingKeywords,
    score: Math.round((foundKeywords.length / relevantKeywords.length) * 100)
  }

  // Formatting analysis
  analysis.formatting = {
    hasHeaders: checkForHeaders(resumeContent),
    hasBulletPoints: resumeContent.includes('•') || resumeContent.includes('-'),
    hasQuantifiableResults: checkForNumbers(resumeContent),
    hasActionVerbs: checkForActionVerbs(resumeContent),
    length: resumeContent.length,
    score: calculateFormattingScore(resumeContent)
  }

  // Section analysis
  analysis.sections = {
    hasContactInfo: checkForContactInfo(resumeContent),
    hasSummary: checkForSummary(resumeContent),
    hasExperience: checkForExperience(resumeContent),
    hasSkills: checkForSkills(resumeContent),
    hasEducation: checkForEducation(resumeContent),
    score: calculateSectionScore(resumeContent)
  }

  // Calculate overall score
  analysis.score = Math.round(
    (analysis.keywords.score * 0.4 + 
     analysis.formatting.score * 0.3 + 
     analysis.sections.score * 0.3)
  )

  analysis.overall = {
    strengths: getStrengths(analysis),
    weaknesses: getWeaknesses(analysis),
    priority: getPriorityImprovements(analysis)
  }

  return analysis
}

function getRelevantKeywords(jobTitle) {
  const normalizedTitle = jobTitle?.toLowerCase().replace(/\s+/g, '-') || 'software-developer'
  return atsKeywords[normalizedTitle] || atsKeywords['software-developer']
}

function checkForHeaders(content) {
  const headers = ['experience', 'education', 'skills', 'summary', 'contact']
  return headers.some(header => content.toLowerCase().includes(header))
}

function checkForNumbers(content) {
  return /\d+/.test(content)
}

function checkForActionVerbs(content) {
  const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'led', 'designed', 'built', 'achieved']
  return actionVerbs.some(verb => content.toLowerCase().includes(verb))
}

function checkForContactInfo(content) {
  return /@/.test(content) || /\(\d{3}\)/.test(content)
}

function checkForSummary(content) {
  return content.toLowerCase().includes('summary') || content.toLowerCase().includes('objective')
}

function checkForExperience(content) {
  return content.toLowerCase().includes('experience') || content.toLowerCase().includes('work')
}

function checkForSkills(content) {
  return content.toLowerCase().includes('skills') || content.toLowerCase().includes('technical')
}

function checkForEducation(content) {
  return content.toLowerCase().includes('education') || content.toLowerCase().includes('degree')
}

function calculateFormattingScore(content) {
  let score = 0
  if (checkForHeaders(content)) score += 20
  if (content.includes('•') || content.includes('-')) score += 20
  if (checkForNumbers(content)) score += 20
  if (checkForActionVerbs(content)) score += 20
  if (content.length > 500 && content.length < 2000) score += 20
  return score
}

function calculateSectionScore(content) {
  let score = 0
  if (checkForContactInfo(content)) score += 20
  if (checkForSummary(content)) score += 20
  if (checkForExperience(content)) score += 20
  if (checkForSkills(content)) score += 20
  if (checkForEducation(content)) score += 20
  return score
}

function getStrengths(analysis) {
  const strengths = []
  if (analysis.keywords.score > 70) strengths.push('Good keyword optimization')
  if (analysis.formatting.hasQuantifiableResults) strengths.push('Includes quantifiable results')
  if (analysis.formatting.hasActionVerbs) strengths.push('Uses strong action verbs')
  if (analysis.sections.score > 80) strengths.push('Complete resume sections')
  return strengths
}

function getWeaknesses(analysis) {
  const weaknesses = []
  if (analysis.keywords.score < 50) weaknesses.push('Missing important keywords')
  if (!analysis.formatting.hasQuantifiableResults) weaknesses.push('Lacks quantifiable achievements')
  if (!analysis.formatting.hasBulletPoints) weaknesses.push('Poor formatting structure')
  if (analysis.sections.score < 60) weaknesses.push('Missing essential sections')
  return weaknesses
}

function getPriorityImprovements(analysis) {
  const improvements = []
  if (analysis.keywords.score < 60) improvements.push('Add more relevant keywords')
  if (!analysis.formatting.hasQuantifiableResults) improvements.push('Include metrics and numbers')
  if (analysis.sections.score < 80) improvements.push('Complete all resume sections')
  return improvements
}

function generateRecommendations(analysis) {
  const recommendations = []

  // Keyword recommendations
  if (analysis.keywords.missing.length > 0) {
    recommendations.push({
      category: 'Keywords',
      priority: 'High',
      suggestion: `Add these missing keywords: ${analysis.keywords.missing.slice(0, 5).join(', ')}`,
      impact: 'Improves ATS scanning and keyword matching'
    })
  }

  // Formatting recommendations
  if (!analysis.formatting.hasQuantifiableResults) {
    recommendations.push({
      category: 'Quantifiable Results',
      priority: 'High',
      suggestion: 'Add specific numbers, percentages, and metrics to your achievements',
      impact: 'Makes your accomplishments more concrete and impressive'
    })
  }

  if (!analysis.formatting.hasBulletPoints) {
    recommendations.push({
      category: 'Formatting',
      priority: 'Medium',
      suggestion: 'Use bullet points to organize your experience and achievements',
      impact: 'Improves readability and ATS parsing'
    })
  }

  // Section recommendations
  if (!analysis.sections.hasSummary) {
    recommendations.push({
      category: 'Professional Summary',
      priority: 'Medium',
      suggestion: 'Add a professional summary at the top of your resume',
      impact: 'Provides a quick overview of your qualifications'
    })
  }

  return recommendations
}

function getOptimizationSuggestions(section, content, jobTitle) {
  const suggestions = []

  switch (section) {
    case 'summary':
      suggestions.push('Include your years of experience')
      suggestions.push('Mention your key technical skills')
      suggestions.push('Highlight your biggest achievement')
      break
    case 'experience':
      suggestions.push('Start each bullet point with an action verb')
      suggestions.push('Include specific metrics and numbers')
      suggestions.push('Use past tense for previous roles')
      break
    case 'skills':
      suggestions.push('List skills relevant to the job posting')
      suggestions.push('Separate technical and soft skills')
      suggestions.push('Use exact terminology from job descriptions')
      break
    default:
      suggestions.push('Use keywords relevant to your industry')
      suggestions.push('Be specific and quantifiable')
      suggestions.push('Keep content concise and impactful')
  }

  return suggestions
}

export default router
