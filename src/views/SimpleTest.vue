<template>
  <div class="min-h-screen bg-blue-100 p-8">
    <h1 class="text-4xl font-bold text-blue-900 mb-4">🎉 Test Page Working!</h1>
    <p class="text-lg text-gray-700">If you can see this, the routing is working correctly.</p>
    
    <div class="mt-8 space-y-4">
      <h2 class="text-2xl font-semibold">Navigation Test:</h2>
      <div class="space-x-4">
        <router-link to="/" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Home</router-link>
        <router-link to="/dashboard" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Dashboard</router-link>
        <router-link to="/profile" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Profile</router-link>
        <router-link to="/builder" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Builder</router-link>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Profile Component Test:</h2>
      <div class="bg-white p-6 rounded-lg shadow">
        <ProfilePageComponent />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProfilePageComponent from '@/components/ProfilePage.vue'
</script>
