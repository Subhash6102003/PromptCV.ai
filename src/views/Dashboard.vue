<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ authStore.user?.displayName }}!</h1>
      <p class="text-gray-600 mt-2">Create and manage your professional resumes</p>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        @click="createNewResume"
        class="text-white p-6 rounded-lg hover:opacity-90 transition-colors group cursor-pointer"
        style="background-color: #0F172A;"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold mb-2">Create New Resume</h3>
            <p class="text-primary-100">Start building your perfect resume</p>
          </div>
          <svg class="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      <div 
        class="bg-white border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-gray-400 transition-colors cursor-pointer"
        @click="$refs.dashboardPdfInput.click()"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="handleDashboardFileDrop"
      >
        <div class="text-center">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Import Resume</h3>
          <p class="text-gray-600 text-sm mb-2">Upload an existing resume to edit</p>
          <p class="text-xs text-gray-500">Drag & drop PDF or click to browse</p>
        </div>
        <input 
          ref="dashboardPdfInput"
          type="file"
          accept=".pdf"
          class="hidden"
          @change="handleDashboardPdfUpload"
        >
      </div>

      <div class="bg-white border border-gray-200 p-6 rounded-lg">
        <div class="text-center">
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">AI Resume Review</h3>
          <p class="text-gray-600 text-sm">Get AI-powered feedback on your resume</p>
          <button class="mt-3 text-primary-600 text-sm font-medium hover:text-primary-700">
            Coming Soon
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Resumes -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900">Your Resumes</h2>
      </div>
      <div class="p-6">
        <div v-if="resumes.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
          <p class="text-gray-600 mb-4">Create your first resume to get started</p>
          <router-link 
            to="/builder"
            class="text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 inline-block"
            style="background-color: #0F172A;"
          >
            Create Resume
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="resume in resumes" 
            :key="resume.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 mb-1">{{ resume.title }}</h3>
                <p class="text-sm text-gray-500">Updated {{ resume.updatedAt }}</p>
              </div>
              <div class="flex space-x-1">
                <button class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button class="text-gray-400 hover:text-gray-600 p-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="bg-gray-100 rounded h-32 mb-3 flex items-center justify-center">
              <span class="text-gray-500 text-sm">Resume Preview</span>
            </div>
            <div class="flex space-x-2">
              <router-link 
                :to="`/builder/${resume.id}`"
                class="flex-1 text-white text-center py-2 rounded text-sm font-medium hover:opacity-90"
                style="background-color: #0F172A;"
              >
                Edit
              </router-link>
              <button class="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'

const router = useRouter()
const authStore = useAuthStore()
const resumeStore = useResumeStore()

const resumes = ref([])

const createNewResume = async () => {
  try {
    const newResume = await resumeStore.createResume({
      title: 'New Resume',
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: ''
      },
      sections: []
    })
    
    showToast('New resume created successfully!', 'success')
    router.push(`/builder/${newResume.id}`)
    
  } catch (error) {
    showToast('Failed to create resume', 'error')
    console.error('Resume creation error:', error)
  }
}

const syncGitHub = async () => {
  try {
    await resumeStore.syncWithGitHub()
    // Show success message
  } catch (error) {
    console.error('GitHub sync failed:', error)
    // Show error message
  }
}

const syncLinkedIn = async () => {
  try {
    await resumeStore.syncWithLinkedIn()
    // Show success message
  } catch (error) {
    console.error('LinkedIn sync failed:', error)
    // Show error message
  }
}

const handleDashboardPdfUpload = async (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    await processDashboardPdfFile(file)
  } else {
    showToast('Please select a valid PDF file', 'error')
  }
}

const handleDashboardFileDrop = async (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.type === 'application/pdf') {
      await processDashboardPdfFile(file)
    } else {
      showToast('Please drop a valid PDF file', 'error')
    }
  }
}

const processDashboardPdfFile = async (file) => {
  try {
    showToast('Processing PDF file...', 'info')
    
    // Simulate PDF processing - in real implementation, you would:
    // 1. Upload the PDF to a backend service
    // 2. Use AI/OCR to extract resume data
    // 3. Create a new resume with the extracted data
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock: Create a new resume from the PDF
    const newResume = {
      id: Date.now().toString(),
      title: `Imported Resume - ${file.name.replace('.pdf', '')}`,
      updatedAt: 'Just now',
      importedFrom: 'PDF'
    }
    
    resumes.value.unshift(newResume)
    
    showToast('PDF imported successfully! New resume created.', 'success')
    
    // Optionally redirect to edit the new resume
    // router.push(`/builder/${newResume.id}`)
    
  } catch (error) {
    showToast('Failed to process PDF file', 'error')
    console.error('PDF processing error:', error)
  }
}

const showToast = (message, type = 'info') => {
  console.log(`${type.toUpperCase()}: ${message}`)
  // You can integrate with a toast library here
}

onMounted(async () => {
  // Load user's resumes
  await resumeStore.loadResumes()
  resumes.value = resumeStore.resumes
})
</script>
