import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { db } from '@/config/firebase'
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore'

export const useResumeStore = defineStore('resume', () => {
  const resume = ref({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  })

  const templates = ref([
    { id: 'modern', name: 'Modern', preview: '/templates/modern.png' },
    { id: 'classic', name: 'Classic', preview: '/templates/classic.png' },
    { id: 'creative', name: 'Creative', preview: '/templates/creative.png' },
    { id: 'minimal', name: 'Minimal', preview: '/templates/minimal.png' }
  ])

  const selectedTemplate = ref('modern')
  const loading = ref(false)
  const resumes = ref([])
  const currentResume = ref(null)

  // Generate AI content
  const generateAIContent = async (section, context = {}) => {
    loading.value = true
    try {
      const response = await axios.post('/api/ai/generate', {
        section,
        context,
        currentResume: resume.value
      })
      return response.data.content
    } catch (error) {
      console.error('AI generation error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Sync with GitHub
  const syncWithGitHub = async () => {
    loading.value = true
    try {
      const response = await axios.get('/api/sync/github')
      const githubData = response.data
      
      // Update projects from GitHub repos
      resume.value.projects = githubData.repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        technologies: repo.languages,
        url: repo.html_url,
        highlights: []
      }))

      // Update skills from GitHub languages
      const languages = new Set()
      githubData.repos.forEach(repo => {
        if (repo.languages) {
          Object.keys(repo.languages).forEach(lang => languages.add(lang))
        }
      })
      resume.value.skills = Array.from(languages)

      return githubData
    } catch (error) {
      console.error('GitHub sync error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Sync with LinkedIn
  const syncWithLinkedIn = async () => {
    loading.value = true
    try {
      const response = await axios.get('/api/sync/linkedin')
      const linkedinData = response.data

      // Update personal info
      resume.value.personalInfo = {
        ...resume.value.personalInfo,
        name: linkedinData.name,
        location: linkedinData.location
      }

      // Update experience
      resume.value.experience = linkedinData.experience || []

      // Update education
      resume.value.education = linkedinData.education || []

      return linkedinData
    } catch (error) {
      console.error('LinkedIn sync error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Create new resume
  const createResume = async (resumeData) => {
    loading.value = true
    try {
      const newResume = {
        ...resumeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'user123', // Replace with actual user ID
        sections: resumeData.sections || [],
        template: selectedTemplate.value
      }
      
      const docRef = await addDoc(collection(db, 'resumes'), newResume)
      
      const createdResume = {
        id: docRef.id,
        ...newResume
      }
      
      resumes.value.unshift(createdResume)
      currentResume.value = createdResume
      
      // Save to localStorage as backup
      localStorage.setItem('current_resume', JSON.stringify(createdResume))
      
      return createdResume
      
    } catch (error) {
      console.error('Create resume error:', error)
      
      // Fallback to localStorage
      const localResume = {
        id: Date.now().toString(),
        ...resumeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        template: selectedTemplate.value
      }
      
      resumes.value.unshift(localResume)
      currentResume.value = localResume
      localStorage.setItem('current_resume', JSON.stringify(localResume))
      
      return localResume
    } finally {
      loading.value = false
    }
  }

  // Load user's resumes
  const loadResumes = async (userId = 'user123') => {
    loading.value = true
    try {
      const q = query(
        collection(db, 'resumes'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      resumes.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
    } catch (error) {
      console.error('Load resumes error:', error)
      // Fallback to localStorage
      const saved = localStorage.getItem('user_resumes')
      if (saved) {
        resumes.value = JSON.parse(saved)
      }
    } finally {
      loading.value = false
    }
  }

  // Update existing resume
  const updateResume = async (resumeId, updates) => {
    loading.value = true
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      await updateDoc(doc(db, 'resumes', resumeId), updateData)
      
      // Update local state
      const index = resumes.value.findIndex(r => r.id === resumeId)
      if (index !== -1) {
        resumes.value[index] = { ...resumes.value[index], ...updateData }
      }
      
      if (currentResume.value?.id === resumeId) {
        currentResume.value = { ...currentResume.value, ...updateData }
        localStorage.setItem('current_resume', JSON.stringify(currentResume.value))
      }
      
      return resumes.value[index]
      
    } catch (error) {
      console.error('Update resume error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Save resume
  const saveResume = async () => {
    if (currentResume.value) {
      return await updateResume(currentResume.value.id, currentResume.value)
    } else {
      return await createResume(resume.value)
    }
  }

  // Load resume
  const loadResume = async (resumeId) => {
    loading.value = true
    try {
      const response = await axios.get(`/api/resume/${resumeId}`)
      resume.value = response.data.resume
      selectedTemplate.value = response.data.template
      return response.data
    } catch (error) {
      console.error('Load resume error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    resume,
    templates,
    selectedTemplate,
    loading,
    resumes,
    currentResume,
    generateAIContent,
    syncWithGitHub,
    syncWithLinkedIn,
    saveResume,
    loadResume,
    createResume,
    loadResumes,
    updateResume
  }
})
