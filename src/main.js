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

// Initialize Firebase Auth asynchronously (non-blocking)
try {
  import('./stores/auth').then(({ useAuthStore }) => {
    const authStore = useAuthStore()
    authStore.initAuth().catch(error => {
      console.warn('Firebase Auth initialization failed:', error)
      // Continue without auth for now
    })
  })
} catch (error) {
  console.warn('Auth store import failed:', error)
}
