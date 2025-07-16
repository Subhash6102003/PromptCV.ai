<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Connect GitHub Profile</h3>
    <p class="text-gray-600 mb-4">
      Enter your GitHub username to automatically import your repositories, skills, and project information.
    </p>

    <!-- GitHub Username Input -->
    <div class="mb-6">
      <label for="github-username" class="block text-sm font-medium text-gray-700 mb-2">
        GitHub Username
      </label>
      <div class="flex space-x-3">
        <div class="flex-1 relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 text-sm">github.com/</span>
          </div>
          <input
            id="github-username"
            v-model="username"
            type="text"
            placeholder="your-username"
            class="block w-full pl-20 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @keyup.enter="fetchGitHubData"
            :disabled="isLoading"
          >
        </div>
        <button
          @click="fetchGitHubData"
          :disabled="!username.trim() || isLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ isLoading ? 'Loading...' : 'Connect' }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <svg class="animate-spin mx-auto h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="mt-2 text-sm text-gray-600">Fetching GitHub data...</p>
    </div>

    <!-- GitHub Profile Preview -->
    <div v-if="profileData && !isLoading" class="mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex items-center space-x-4 mb-4">
        <img 
          :src="profileData.avatar_url" 
          :alt="profileData.name"
          class="w-16 h-16 rounded-full"
        >
        <div>
          <h4 class="font-semibold text-gray-800">{{ profileData.name || profileData.login }}</h4>
          <p class="text-sm text-gray-600">{{ profileData.bio }}</p>
          <p class="text-xs text-gray-500 mt-1">
            {{ profileData.public_repos }} repositories • {{ profileData.followers }} followers
          </p>
        </div>
      </div>
      
      <div v-if="profileData.location || profileData.company" class="text-sm text-gray-600 space-y-1">
        <div v-if="profileData.company" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          {{ profileData.company }}
        </div>
        <div v-if="profileData.location" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {{ profileData.location }}
        </div>
      </div>
    </div>

    <!-- Repository Statistics -->
    <div v-if="repoStats && !isLoading" class="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="text-center p-3 bg-blue-50 rounded-lg">
        <div class="text-2xl font-bold text-blue-600">{{ repoStats.totalRepos }}</div>
        <div class="text-xs text-blue-700">Repositories</div>
      </div>
      <div class="text-center p-3 bg-green-50 rounded-lg">
        <div class="text-2xl font-bold text-green-600">{{ repoStats.totalStars }}</div>
        <div class="text-xs text-green-700">Stars</div>
      </div>
      <div class="text-center p-3 bg-purple-50 rounded-lg">
        <div class="text-2xl font-bold text-purple-600">{{ repoStats.totalForks }}</div>
        <div class="text-xs text-purple-700">Forks</div>
      </div>
      <div class="text-center p-3 bg-orange-50 rounded-lg">
        <div class="text-2xl font-bold text-orange-600">{{ repoStats.languages.length }}</div>
        <div class="text-xs text-orange-700">Languages</div>
      </div>
    </div>

    <!-- Top Languages -->
    <div v-if="repoStats && repoStats.languages.length > 0 && !isLoading" class="mb-6">
      <h4 class="font-medium text-gray-800 mb-3">Top Programming Languages</h4>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="language in repoStats.languages.slice(0, 8)" 
          :key="language"
          class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
        >
          {{ language }}
        </span>
      </div>
    </div>

    <!-- Top Repositories -->
    <div v-if="repositories && repositories.length > 0 && !isLoading" class="mb-6">
      <h4 class="font-medium text-gray-800 mb-3">Top Repositories</h4>
      <div class="space-y-3 max-h-60 overflow-y-auto">
        <div 
          v-for="repo in repositories.slice(0, 5)" 
          :key="repo.id"
          class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div class="flex justify-between items-start mb-2">
            <h5 class="font-medium text-gray-800">{{ repo.name }}</h5>
            <div class="flex items-center space-x-3 text-sm text-gray-500">
              <span v-if="repo.stargazers_count > 0" class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {{ repo.stargazers_count }}
              </span>
              <span v-if="repo.language" class="px-2 py-1 bg-gray-100 rounded text-xs">
                {{ repo.language }}
              </span>
            </div>
          </div>
          <p v-if="repo.description" class="text-sm text-gray-600">{{ repo.description }}</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div v-if="profileData && !isLoading" class="flex space-x-3">
      <button
        @click="applyToResume"
        class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
      >
        Apply to Resume
      </button>
      <button
        @click="clearData"
        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear
      </button>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="mt-4 p-4 bg-red-50 rounded-lg">
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['data-extracted'])

const username = ref('')
const isLoading = ref(false)
const profileData = ref(null)
const repositories = ref([])
const repoStats = ref(null)
const error = ref('')

const fetchGitHubData = async () => {
  if (!username.value.trim()) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    // Fetch profile data
    const profileResponse = await fetch(`/api/github/profile/${username.value.trim()}`)
    if (!profileResponse.ok) {
      throw new Error('GitHub user not found')
    }
    
    const profile = await profileResponse.json()
    profileData.value = profile
    
    // Fetch repositories
    const reposResponse = await fetch(`/api/github/repositories/${username.value.trim()}`)
    if (reposResponse.ok) {
      const repos = await reposResponse.json()
      repositories.value = repos
    }
    
    // Fetch statistics
    const statsResponse = await fetch(`/api/github/stats/${username.value.trim()}`)
    if (statsResponse.ok) {
      const stats = await statsResponse.json()
      repoStats.value = stats
    }
    
  } catch (err) {
    error.value = err.message || 'Failed to fetch GitHub data. Please check the username and try again.'
    profileData.value = null
    repositories.value = []
    repoStats.value = null
  } finally {
    isLoading.value = false
  }
}

const applyToResume = () => {
  const githubData = {
    profile: profileData.value,
    repositories: repositories.value,
    stats: repoStats.value,
    type: 'github'
  }
  
  emit('data-extracted', githubData)
}

const clearData = () => {
  username.value = ''
  profileData.value = null
  repositories.value = []
  repoStats.value = null
  error.value = ''
}
</script>
