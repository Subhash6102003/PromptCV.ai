import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  const githubConnected = ref(false)
  const linkedinConnected = ref(false)
  const userData = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  // Initialize auth state listener
  const initAuth = async () => {
    try {
      loading.value = true
      const currentUser = await authService.init()
      user.value = currentUser
      
      if (currentUser) {
        // Load additional user data from Firestore
        userData.value = await authService.getUserData()
        githubConnected.value = userData.value?.githubConnected || false
        linkedinConnected.value = userData.value?.linkedinConnected || false
      }
      
      loading.value = false
      return currentUser
    } catch (error) {
      console.error('Auth initialization error:', error)
      loading.value = false
      return null
    }
  }

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      loading.value = true
      const result = await authService.signInWithGoogle()
      user.value = result
      
      // Load user data
      userData.value = await authService.getUserData()
      githubConnected.value = userData.value?.githubConnected || false
      linkedinConnected.value = userData.value?.linkedinConnected || false
      
      loading.value = false
      return result
    } catch (error) {
      console.error('Google sign in error:', error)
      loading.value = false
      throw error
    }
  }

  // Sign Out
  const signOut = async () => {
    try {
      loading.value = true
      await authService.signOut()
      user.value = null
      userData.value = null
      githubConnected.value = false
      linkedinConnected.value = false
      loading.value = false
    } catch (error) {
      console.error('Sign out error:', error)
      loading.value = false
      throw error
    }
  }

  // Connect GitHub
  const connectGitHub = async () => {
    try {
      // This will be implemented with backend OAuth flow
      console.log('Connecting to GitHub...')
      // For now, simulate connection
      githubConnected.value = true
      await authService.connectGitHub({ username: 'demo-user' })
    } catch (error) {
      console.error('GitHub connection error:', error)
      throw error
    }
  }

  // Connect LinkedIn
  const connectLinkedIn = async () => {
    try {
      // This will be implemented with backend OAuth flow
      console.log('Connecting to LinkedIn...')
      // For now, simulate connection
      linkedinConnected.value = true
      await authService.connectLinkedIn({ profile: 'demo-profile' })
    } catch (error) {
      console.error('LinkedIn connection error:', error)
      throw error
    }
  }

  return {
    user,
    userData,
    loading,
    githubConnected,
    linkedinConnected,
    isAuthenticated,
    initAuth,
    signInWithGoogle,
    signOut,
    connectGitHub,
    connectLinkedIn
  }
})
