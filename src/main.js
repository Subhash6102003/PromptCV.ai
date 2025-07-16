import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// Firebase and Auth initialization
import { useAuthStore } from './stores/auth'

// Axios configuration
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize Firebase Auth after app is created
const authStore = useAuthStore()
authStore.initAuth().then(() => {
  console.log('Firebase Auth initialized')
})

app.mount('#app')
