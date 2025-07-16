import axios from 'axios'

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Generate AI-powered resume content
 */
export class OpenAIService {
  constructor() {
    this.apiKey = OPENAI_API_KEY
    this.baseURL = OPENAI_API_URL
  }

  /**
   * Generate professional summary
   */
  async generateSummary(profileData) {
    try {
      if (!this.apiKey || this.apiKey === 'your_openai_api_key') {
        return this.getMockSummary(profileData)
      }

      const prompt = `Generate a professional summary for a resume based on the following profile data:
        Name: ${profileData.fullName}
        Industry: ${profileData.industry}
        Experience Level: ${profileData.experienceLevel}
        Skills: ${profileData.skills?.join(', ')}
        
        Write a compelling 2-3 sentence professional summary that highlights their key strengths and experience.`

      const response = await axios.post(this.baseURL, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Write compelling, ATS-friendly resume content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return response.data.choices[0].message.content.trim()
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getMockSummary(profileData)
    }
  }

  /**
   * Enhance job description
   */
  async enhanceJobDescription(jobData) {
    try {
      if (!this.apiKey || this.apiKey === 'your_openai_api_key') {
        return this.getMockJobDescription(jobData)
      }

      const prompt = `Enhance this job description for a resume:
        Job Title: ${jobData.title}
        Company: ${jobData.company}
        Duration: ${jobData.duration}
        Current Description: ${jobData.description}
        
        Rewrite this to be more impactful, use action verbs, and quantify achievements where possible. Return 3-4 bullet points.`

      const response = await axios.post(this.baseURL, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Enhance job descriptions with strong action verbs and quantifiable achievements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      return response.data.choices[0].message.content.trim()
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getMockJobDescription(jobData)
    }
  }

  /**
   * Generate skills suggestions
   */
  async suggestSkills(profileData) {
    try {
      if (!this.apiKey || this.apiKey === 'your_openai_api_key') {
        return this.getMockSkills(profileData)
      }

      const prompt = `Based on this profile, suggest 10 relevant technical and soft skills:
        Industry: ${profileData.industry}
        Experience Level: ${profileData.experienceLevel}
        Current Skills: ${profileData.skills?.join(', ')}
        
        Return a comma-separated list of skills that would be valuable for this professional.`

      const response = await axios.post(this.baseURL, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a career counselor. Suggest relevant skills for professionals in various industries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      const skillsText = response.data.choices[0].message.content.trim()
      return skillsText.split(',').map(skill => skill.trim()).filter(skill => skill)
    } catch (error) {
      console.error('OpenAI API error:', error)
      return this.getMockSkills(profileData)
    }
  }

  /**
   * Mock implementations for when no API key is available
   */
  getMockSummary(profileData) {
    const templates = [
      `Experienced ${profileData.industry} professional with ${profileData.experienceLevel} of expertise. Skilled in ${profileData.skills?.slice(0, 3).join(', ')} with a proven track record of delivering results.`,
      `Dynamic ${profileData.industry} specialist with strong background in ${profileData.skills?.slice(0, 2).join(' and ')}. Demonstrated ability to drive innovation and optimize processes.`,
      `Results-driven ${profileData.industry} professional with comprehensive experience in ${profileData.skills?.slice(0, 3).join(', ')}. Committed to excellence and continuous improvement.`
    ]
    
    return templates[Math.floor(Math.random() * templates.length)]
  }

  getMockJobDescription(jobData) {
    return `• Led cross-functional teams to deliver ${jobData.title} initiatives, resulting in improved operational efficiency
• Collaborated with stakeholders to implement strategic solutions and drive business growth
• Utilized industry best practices to optimize workflows and enhance team productivity
• Mentored junior team members and contributed to knowledge sharing initiatives`
  }

  getMockSkills(profileData) {
    const skillSets = {
      'Technology': ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'Agile', 'Problem Solving', 'Team Leadership'],
      'Marketing': ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Analytics', 'Campaign Management', 'Brand Management', 'Market Research', 'Communication', 'Creativity'],
      'Finance': ['Financial Analysis', 'Excel', 'Risk Management', 'Budgeting', 'Forecasting', 'Compliance', 'Audit', 'Investment Analysis', 'Data Analysis', 'Attention to Detail'],
      'Healthcare': ['Patient Care', 'Medical Records', 'HIPAA Compliance', 'Clinical Research', 'Healthcare Technology', 'Team Collaboration', 'Communication', 'Empathy', 'Problem Solving', 'Attention to Detail'],
      'Education': ['Curriculum Development', 'Classroom Management', 'Assessment', 'Educational Technology', 'Differentiated Instruction', 'Student Engagement', 'Communication', 'Patience', 'Adaptability', 'Leadership']
    }

    return skillSets[profileData.industry] || skillSets['Technology']
  }
}

export default new OpenAIService()
