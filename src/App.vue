<template>
  <div id="app" class="min-h-screen" style="background-color: #FFFFFF;">
    <!-- Navigation -->
    <nav v-if="authStore.isAuthenticated" class="bg-white shadow-sm border-b" style="border-color: #0F172A;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background-color: #0F172A;">
                <span class="text-white font-bold text-sm">PC</span>
              </div>
              <span class="text-xl font-semibold" style="color: #0F172A;">PromptCV.ai</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <router-link 
              to="/dashboard" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80"
              style="color: #0F172A;"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/builder" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80"
              style="color: #0F172A;"
            >
              Builder
            </router-link>
            <router-link 
              to="/profile" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:opacity-80"
              style="color: #0F172A;"
            >
              Profile
            </router-link>
            
            <div class="flex items-center space-x-2">
              <img 
                v-if="authStore.user?.photoURL" 
                :src="authStore.user.photoURL" 
                :alt="authStore.user.displayName"
                class="w-8 h-8 rounded-full"
              >
              <span class="text-sm font-medium" style="color: #0F172A;">
                {{ authStore.user?.displayName }}
              </span>
              <button 
                @click="authStore.signOut"
                class="p-1 hover:opacity-80"
                style="color: #0F172A;"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Loading Overlay -->
    <div 
      v-if="authStore.loading" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        <span class="text-gray-700">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>
