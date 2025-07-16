<template>
  <div class="space-y-6">
    <!-- LinkedIn Import -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #0F172A;">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Import from LinkedIn</h3>
            <p class="text-sm text-gray-600">Import your profile and experience data</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span 
            class="px-2 py-1 text-xs font-medium rounded-full"
            :class="linkedinConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
          >
            {{ linkedinConnected ? 'Connected' : 'Not Connected' }}
          </span>
        </div>
      </div>
      
      <div v-if="!linkedinConnected" class="space-y-4">
        <p class="text-gray-600">Connect your LinkedIn account to automatically import your professional experience, education, and skills.</p>
        <button 
          @click="connectLinkedIn"
          :disabled="loading"
          class="w-full py-3 px-4 text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors"
          style="background-color: #0F172A;"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Connecting...' : 'Connect LinkedIn' }}
        </button>
      </div>
      
      <div v-else class="space-y-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-green-800 font-medium">LinkedIn Connected</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            @click="importLinkedInProfile"
            :disabled="importing"
            class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {{ importing ? 'Importing...' : 'Import Profile Data' }}
          </button>
          <button 
            @click="importLinkedInExperience"
            :disabled="importing"
            class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {{ importing ? 'Importing...' : 'Import Experience' }}
          </button>
        </div>
      </div>
    </div>

    <!-- GitHub Import -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Import from GitHub</h3>
            <p class="text-sm text-gray-600">Import your repositories and projects</p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span 
            class="px-2 py-1 text-xs font-medium rounded-full"
            :class="githubConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
          >
            {{ githubConnected ? 'Connected' : 'Not Connected' }}
          </span>
        </div>
      </div>
      
      <div v-if="!githubConnected" class="space-y-4">
        <p class="text-gray-600">Connect your GitHub account to automatically import your repositories and showcase your projects.</p>
        <button 
          @click="connectGitHub"
          :disabled="loading"
          class="w-full py-3 px-4 text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors"
          style="background-color: #0F172A;"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? 'Connecting...' : 'Connect GitHub' }}
        </button>
      </div>
      
      <div v-else class="space-y-4">
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-green-800 font-medium">GitHub Connected</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            @click="importGitHubProjects"
            :disabled="importing"
            class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {{ importing ? 'Importing...' : 'Import Projects' }}
          </button>
          <button 
            @click="importGitHubRepositories"
            :disabled="importing"
            class="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {{ importing ? 'Importing...' : 'Import Repositories' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useResumeStore } from '@/stores/resume'

const resumeStore = useResumeStore()

const linkedinConnected = ref(false)
const githubConnected = ref(false)
const loading = ref(false)
const importing = ref(false)

const emit = defineEmits(['data-imported'])

const connectLinkedIn = async () => {
  loading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      showToast('LinkedIn connection requires backend API. Running in demo mode.', 'error')
      loading.value = false
      return
    }
    // Use the backend endpoint for LinkedIn OAuth
    window.location.href = `${apiUrl}/api/linkedin/connect`
  } catch (error) {
    showToast('Failed to connect LinkedIn', 'error')
    loading.value = false
  }
}

const connectGitHub = async () => {
  loading.value = true
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      showToast('GitHub connection requires backend API. Running in demo mode.', 'error')
      loading.value = false
      return
    }
    // Use the backend endpoint for GitHub OAuth
    window.location.href = `${apiUrl}/api/github/connect`
  } catch (error) {
    showToast('Failed to connect GitHub', 'error')
    loading.value = false
  }
}

const importLinkedInProfile = async () => {
  importing.value = true
  try {
    const data = await resumeStore.syncWithLinkedIn()
    emit('data-imported', { type: 'linkedin-profile', data })
    showToast('LinkedIn profile imported successfully!', 'success')
  } catch (error) {
    showToast('Failed to import LinkedIn profile', 'error')
  } finally {
    importing.value = false
  }
}

const importLinkedInExperience = async () => {
  importing.value = true
  try {
    const data = await resumeStore.syncWithLinkedIn()
    emit('data-imported', { type: 'linkedin-experience', data })
    showToast('LinkedIn experience imported successfully!', 'success')
  } catch (error) {
    showToast('Failed to import LinkedIn experience', 'error')
  } finally {
    importing.value = false
  }
}

const importGitHubProjects = async () => {
  importing.value = true
  try {
    const data = await resumeStore.syncWithGitHub()
    emit('data-imported', { type: 'github-projects', data })
    showToast('GitHub projects imported successfully!', 'success')
  } catch (error) {
    showToast('Failed to import GitHub projects', 'error')
  } finally {
    importing.value = false
  }
}

const importGitHubRepositories = async () => {
  importing.value = true
  try {
    const data = await resumeStore.syncWithGitHub()
    emit('data-imported', { type: 'github-repositories', data })
    showToast('GitHub repositories imported successfully!', 'success')
  } catch (error) {
    showToast('Failed to import GitHub repositories', 'error')
  } finally {
    importing.value = false
  }
}

const showToast = (message, type = 'info') => {
  console.log(`${type.toUpperCase()}: ${message}`)
  // Integrate with your toast system
}

onMounted(() => {
  // Check connection status from localStorage
  linkedinConnected.value = localStorage.getItem('linkedin_connected') === 'true'
  githubConnected.value = localStorage.getItem('github_connected') === 'true'
})
</script>
