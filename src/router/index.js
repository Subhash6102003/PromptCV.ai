import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import views
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import ResumeBuilder from '@/views/ResumeBuilder.vue'
import ResumePreview from '@/views/ResumePreview.vue'
import Profile from '@/views/Profile.vue'
import TestSections from '@/views/TestSections.vue'
import SimpleTest from '@/views/SimpleTest.vue'
import LinkedInCallback from '@/views/LinkedInCallback.vue'
import GitHubCallback from '@/views/GitHubCallback.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/builder',
    name: 'ResumeBuilder',
    component: ResumeBuilder,
    meta: { requiresAuth: true }
  },
  {
    path: '/builder/:id',
    name: 'ResumeBuilderEdit',
    component: ResumeBuilder,
    meta: { requiresAuth: true }
  },
  {
    path: '/preview/:id?',
    name: 'ResumePreview',
    component: ResumePreview,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth/linkedin',
    name: 'LinkedInCallback',
    component: LinkedInCallback
  },
  {
    path: '/auth/github',
    name: 'GitHubCallback',
    component: GitHubCallback
  },
  {
    path: '/test-sections',
    name: 'TestSections',
    component: TestSections
  },
  {
    path: '/simple-test',
    name: 'SimpleTest',
    component: SimpleTest
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (authStore.user === null) {
    await authStore.initAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
