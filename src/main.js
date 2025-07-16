import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// Axios configuration
import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL
if (apiUrl) {
  axios.defaults.baseURL = apiUrl
  console.log('API URL configured:', apiUrl)
} else {
  console.log('No API URL configured, running in frontend-only mode')
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Mount the app
app.mount('#app')

// Initialize Firebase Auth asynchronously with better error handling
setTimeout(async () => {
  try {
    // Import auth store only when needed
    const { useAuthStore } = await import('./stores/auth')
    const authStore = useAuthStore()
    
    // Initialize auth with proper error handling
    await authStore.initAuth()
    console.log('Auth initialized successfully')
  } catch (error) {
    console.warn('Auth initialization failed:', error)
    // App continues to work without auth
  }
}, 200)
