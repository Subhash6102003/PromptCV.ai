<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          GitHub Authentication
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ message }}
        </p>
      </div>
      
      <div class="flex justify-center">
        <div v-if="loading" class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <div v-else-if="success" class="text-green-600">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div v-else class="text-red-600">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
      
      <div class="text-center">
        <button 
          @click="goToProfile"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-colors"
          style="background-color: #0F172A;"
        >
          Continue to Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const success = ref(false)
const message = ref('Processing GitHub authentication...')

const goToProfile = () => {
  router.push('/profile')
}

const handleGitHubCallback = async () => {
  try {
    const code = route.query.code
    const error = route.query.error
    
    if (error) {
      throw new Error(`GitHub authentication failed: ${error}`)
    }
    
    if (!code) {
      throw new Error('No authorization code received')
    }
    
    // Exchange code for access token
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
    const clientSecret = import.meta.env.VITE_GITHUB_CLIENT_SECRET
    const redirectUri = window.location.origin + '/auth/github'
    
    // In a real app, this should be done on your backend for security
    const tokenResponse = await axios.post('/api/auth/github/token', {
      code,
      clientId,
      clientSecret,
      redirectUri
    })
    
    const accessToken = tokenResponse.data.access_token
    
    // Store the token securely
    localStorage.setItem('github_token', accessToken)
    localStorage.setItem('github_connected', 'true')
    
    success.value = true
    message.value = 'GitHub connected successfully!'
    
    // Redirect to profile after a short delay
    setTimeout(() => {
      router.push('/profile')
    }, 2000)
    
  } catch (error) {
    console.error('GitHub authentication error:', error)
    success.value = false
    message.value = 'Authentication failed. Please try again.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  handleGitHubCallback()
})
</script>
