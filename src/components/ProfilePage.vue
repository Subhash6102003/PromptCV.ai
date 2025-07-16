<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p class="text-gray-600">Manage your professional profile and sync preferences</p>
      </div>

      <!-- Profile Form -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <form @submit.prevent="saveProfile" class="space-y-6">
          
          <!-- Profile Photo Section -->
          <div class="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div class="flex-shrink-0">
              <div class="relative">
                <img 
                  :src="profileData.photo || defaultAvatar" 
                  alt="Profile Photo"
                  class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                >
                <button 
                  type="button"
                  @click="$refs.photoInput.click()"
                  class="absolute bottom-0 right-0 text-white rounded-full p-2 hover:opacity-90 transition-colors"
                  style="background-color: #0F172A;"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
                <input 
                  ref="photoInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handlePhotoUpload"
                >
              </div>
            </div>
            
            <!-- Basic Info -->
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  v-model="profileData.fullName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="profileData.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  v-model="profileData.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  v-model="profileData.location"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="New York, NY"
                >
              </div>
            </div>
          </div>

          <!-- Professional Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Professional Headline</label>
              <input 
                v-model="profileData.headline"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Stack Developer | React & Node.js Expert"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Current Designation</label>
              <input 
                v-model="profileData.currentDesignation"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Senior Software Engineer"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select 
                v-model="profileData.industry"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Industry</option>
                <option value="IT">Information Technology</option>
                <option value="Finance">Finance & Banking</option>
                <option value="Marketing">Marketing & Advertising</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail & E-commerce</option>
                <option value="Consulting">Consulting</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Media">Media & Entertainment</option>
                <option value="Non-profit">Non-profit</option>
                <option value="Government">Government</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <select 
                v-model="profileData.experienceLevel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher (0-1 years)</option>
                <option value="Junior">Junior (1-3 years)</option>
                <option value="Mid">Mid-level (3-5 years)</option>
                <option value="Senior">Senior (5-8 years)</option>
                <option value="Lead">Lead (8-12 years)</option>
                <option value="Manager">Manager (10+ years)</option>
                <option value="Director">Director/VP (15+ years)</option>
                <option value="Executive">C-Level Executive</option>
              </select>
            </div>
          </div>

          <!-- Social Links -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
              <input 
                v-model="profileData.linkedinUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourprofile"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
              <input 
                v-model="profileData.githubUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/yourusername"
              >
            </div>
          </div>

          <!-- PDF Import Section -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Import Existing Resume
            </h3>
            
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="text-center">
                <div 
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer"
                  @click="$refs.pdfInput.click()"
                  @dragover.prevent
                  @dragenter.prevent
                  @drop.prevent="handleFileDrop"
                >
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p class="text-gray-600 mb-2">Upload your existing resume or CV</p>
                  <p class="text-sm text-gray-500 mb-4">Drag and drop a PDF file here, or click to browse</p>
                  <button 
                    type="button"
                    :disabled="pdfProcessing"
                    class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    {{ pdfProcessing ? 'Processing...' : 'Choose PDF File' }}
                  </button>
                </div>
                
                <!-- Show uploaded PDFs -->
                <div v-if="uploadedPdfs.length > 0" class="mt-4 space-y-3">
                  <h4 class="text-sm font-medium text-gray-700">Uploaded PDFs:</h4>
                  <div v-for="pdf in uploadedPdfs" :key="pdf.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ pdf.name }}</p>
                        <p class="text-xs text-gray-500">{{ pdf.uploadDate }}</p>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="viewPdf(pdf)"
                        class="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="View PDF"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </button>
                      <button
                        @click="deletePdf(pdf.id)"
                        class="p-1 text-red-600 hover:text-red-800 transition-colors"
                        title="Delete PDF"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Processing Status -->
                <div v-if="pdfProcessing" class="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-blue-600 font-medium">Processing PDF...</span>
                  </div>
                  <p class="text-sm text-blue-600 mt-2">Extracting information from your resume</p>
                </div>

                <!-- Success Message -->
                <div v-if="pdfImported" class="mt-4 p-4 bg-green-50 rounded-lg">
                  <div class="flex items-center justify-center text-green-600">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="font-medium">Resume imported successfully!</span>
                  </div>
                  <p class="text-sm text-green-600 mt-1">Your profile has been updated with extracted information</p>
                </div>
              </div>
              
              <input 
                ref="pdfInput"
                type="file"
                accept=".pdf"
                class="hidden"
                @change="handlePdfUpload"
              >
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end pt-6 border-t">
            <button 
              type="submit"
              :disabled="isSaving"
              class="px-6 py-2 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style="background-color: #0F172A;"
            >
              <span v-if="isSaving">Saving...</span>
              <span v-else>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const profileData = ref({
  photo: '',
  fullName: '',
  email: '',
  phone: '',
  location: '',
  headline: '',
  currentDesignation: '',
  industry: '',
  experienceLevel: '',
  linkedinUrl: '',
  githubUrl: '',
  autoSync: false
})

const syncStatus = ref({
  github: false,
  linkedin: false
})

const uploadedPdfs = ref([])
const isSaving = ref(false)
const pdfProcessing = ref(false)
const pdfImported = ref(false)

// Computed properties
const defaultAvatar = computed(() => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.value.fullName || 'User')}&background=3B82F6&color=fff&size=200`
})

// Methods
const handlePhotoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileData.value.photo = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = async () => {
  isSaving.value = true
  try {
    // Save profile data to localStorage or backend
    localStorage.setItem('promptcv_profile', JSON.stringify(profileData.value))
    
    // Show success toast
    showToast('Profile saved successfully!', 'success')
    
    // Auto-start resume if all required fields are filled
    if (isProfileComplete()) {
      setTimeout(() => {
        router.push('/resume-builder?auto-start=true')
      }, 1000)
    }
  } catch (error) {
    showToast('Failed to save profile', 'error')
  } finally {
    isSaving.value = false
  }
}

const isProfileComplete = () => {
  return profileData.value.fullName && 
         profileData.value.email && 
         profileData.value.phone &&
         profileData.value.headline
}

const connectGitHub = () => {
  // Implementation for GitHub connection
  showToast('GitHub connection feature coming soon!', 'info')
}

const connectLinkedIn = () => {
  // Implementation for LinkedIn connection
  showToast('LinkedIn PDF upload feature coming soon!', 'info')
}

const showToast = (message, type = 'info') => {
  // Simple toast implementation
  console.log(`${type.toUpperCase()}: ${message}`)
  // You can integrate with a toast library here
}

const handlePdfUpload = async (event) => {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    await processPdfFile(file)
  } else {
    showToast('Please select a valid PDF file', 'error')
  }
}

const handleFileDrop = async (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.type === 'application/pdf') {
      await processPdfFile(file)
    } else {
      showToast('Please drop a valid PDF file', 'error')
    }
  }
}

const processPdfFile = async (file) => {
  pdfProcessing.value = true
  pdfImported.value = false
  
  try {
    // For now, we'll use a simple approach with local storage
    // This can be replaced with real backend when server is working
    
    // Generate a simple ID
    const fileId = Date.now().toString()
    
    // Create a mock file object
    const pdfInfo = {
      id: fileId,
      name: file.name,
      uploadDate: new Date().toLocaleDateString(),
      size: file.size,
      fileId: fileId
    }
    
    // Add to uploaded PDFs
    uploadedPdfs.value.push(pdfInfo)
    
    // Save to localStorage
    localStorage.setItem('uploaded_pdfs', JSON.stringify(uploadedPdfs.value))
    
    // Try to extract basic info from filename
    const filename = file.name.toLowerCase()
    if (filename.includes('resume') || filename.includes('cv')) {
      if (!profileData.value.fullName) {
        profileData.value.fullName = filename.split(/[-_\s]/)[0] || ''
      }
    }
    
    pdfImported.value = true
    showToast('PDF uploaded successfully!', 'success')
    
  } catch (error) {
    showToast(`Failed to process PDF: ${error.message}`, 'error')
    console.error('PDF processing error:', error)
  } finally {
    pdfProcessing.value = false
  }
}

// View PDF function
const viewPdf = async (pdf) => {
  showToast('PDF view functionality will be available when server is running', 'info')
}

// Delete PDF function
const deletePdf = async (pdfId) => {
  try {
    uploadedPdfs.value = uploadedPdfs.value.filter(pdf => pdf.id !== pdfId)
    localStorage.setItem('uploaded_pdfs', JSON.stringify(uploadedPdfs.value))
    showToast('PDF deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting PDF:', error)
    showToast('Failed to delete PDF', 'error')
  }
}

// Load saved profile data
onMounted(async () => {
  const savedProfile = localStorage.getItem('promptcv_profile')
  if (savedProfile) {
    profileData.value = { ...profileData.value, ...JSON.parse(savedProfile) }
  }
  
  // Load uploaded PDFs from localStorage
  const savedPdfs = localStorage.getItem('uploaded_pdfs')
  if (savedPdfs) {
    uploadedPdfs.value = JSON.parse(savedPdfs)
  }
  
  // Load sync status
  const savedSyncStatus = localStorage.getItem('sync_status')
  if (savedSyncStatus) {
    syncStatus.value = { ...syncStatus.value, ...JSON.parse(savedSyncStatus) }
  }
  
  // Check for OAuth callback success and populate profile data
  checkOAuthCallback()
})

// Check for OAuth callback and populate profile data
const checkOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const successParam = urlParams.get('success')
  const source = urlParams.get('source')
  
  if (successParam === 'true' && source) {
    try {
      if (source === 'linkedin') {
        await populateLinkedInData()
      } else if (source === 'github') {
        await populateGitHubData()
      }
      
      // Update sync status
      syncStatus.value[source] = true
      localStorage.setItem('sync_status', JSON.stringify(syncStatus.value))
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)
      
      // Show success message
      alert(`Successfully connected to ${source.charAt(0).toUpperCase() + source.slice(1)}! Your profile has been updated.`)
    } catch (error) {
      console.error(`Error populating ${source} data:`, error)
      alert(`Connected to ${source.charAt(0).toUpperCase() + source.slice(1)} but failed to update profile data.`)
    }
  }
}

// Populate profile data from LinkedIn
const populateLinkedInData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/linkedin/profile', {
      credentials: 'include'
    })
    
    if (response.ok) {
      const linkedInData = await response.json()
      
      // Update profile data with LinkedIn information
      if (linkedInData.firstName || linkedInData.lastName) {
        profileData.value.fullName = `${linkedInData.firstName || ''} ${linkedInData.lastName || ''}`.trim()
      }
      
      if (linkedInData.headline) {
        profileData.value.headline = linkedInData.headline
      }
      
      if (linkedInData.summary) {
        profileData.value.summary = linkedInData.summary
      }
      
      if (linkedInData.location) {
        profileData.value.location = linkedInData.location
      }
      
      if (linkedInData.industry) {
        profileData.value.industry = linkedInData.industry
      }
      
      if (linkedInData.profilePicture) {
        profileData.value.profilePicture = linkedInData.profilePicture
      }
      
      // Save updated profile data
      localStorage.setItem('promptcv_profile', JSON.stringify(profileData.value))
    }
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error)
  }
}

// Populate profile data from GitHub
const populateGitHubData = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/github/profile', {
      credentials: 'include'
    })
    
    if (response.ok) {
      const githubData = await response.json()
      
      // Update profile data with GitHub information
      if (githubData.name && !profileData.value.fullName) {
        profileData.value.fullName = githubData.name
      }
      
      if (githubData.bio && !profileData.value.summary) {
        profileData.value.summary = githubData.bio
      }
      
      if (githubData.location && !profileData.value.location) {
        profileData.value.location = githubData.location
      }
      
      if (githubData.email && !profileData.value.email) {
        profileData.value.email = githubData.email
      }
      
      if (githubData.avatar_url && !profileData.value.profilePicture) {
        profileData.value.profilePicture = githubData.avatar_url
      }
      
      if (githubData.blog && !profileData.value.personalWebsite) {
        profileData.value.personalWebsite = githubData.blog
      }
      
      // Save updated profile data
      localStorage.setItem('promptcv_profile', JSON.stringify(profileData.value))
    }
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
  }
}
</script>

<style scoped>
/* Add any additional styles here */
.peer-checked-bg {
  background-color: #0F172A !important;
}

/* Ensure the toggle switch uses the correct checked color */
.peer:checked + .peer-checked-bg {
  background-color: #0F172A;
}
</style>
