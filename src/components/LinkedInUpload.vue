<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Import from LinkedIn PDF</h3>
    <p class="text-gray-600 mb-4">
      Download your LinkedIn profile as PDF and upload it here to automatically extract your professional information.
    </p>
    
    <div class="mb-4 p-4 bg-blue-50 rounded-lg">
      <h4 class="font-medium text-blue-800 mb-2">How to download your LinkedIn PDF:</h4>
      <ol class="text-sm text-blue-700 list-decimal list-inside space-y-1">
        <li>Go to your LinkedIn profile</li>
        <li>Click "More" → "Save to PDF"</li>
        <li>Upload the downloaded PDF here</li>
      </ol>
    </div>

    <!-- Upload Area -->
    <div 
      class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
      :class="{ 'border-blue-400 bg-blue-50': isDragOver }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <div v-if="!selectedFile && !isUploading">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="mt-2 text-sm text-gray-600">
          <span class="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500">PDF files only</p>
      </div>
      
      <div v-else-if="selectedFile && !isUploading" class="text-green-600">
        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="mt-2 text-sm font-medium">{{ selectedFile.name }}</p>
        <p class="text-xs text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
      </div>
      
      <div v-else class="text-blue-600">
        <svg class="animate-spin mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="mt-2 text-sm font-medium">Processing PDF...</p>
        <p class="text-xs text-gray-500">Extracting your professional information</p>
      </div>
    </div>

    <input 
      ref="fileInput" 
      type="file" 
      accept=".pdf" 
      class="hidden" 
      @change="handleFileSelect"
    >

    <!-- Action Buttons -->
    <div class="mt-6 flex space-x-3">
      <button
        @click="uploadAndProcess"
        :disabled="!selectedFile || isUploading"
        class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ isUploading ? 'Processing...' : 'Extract Information' }}
      </button>
      
      <button
        v-if="selectedFile && !isUploading"
        @click="clearFile"
        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear
      </button>
    </div>

    <!-- Results -->
    <div v-if="extractedData" class="mt-6 p-4 bg-green-50 rounded-lg">
      <h4 class="font-medium text-green-800 mb-2">Extracted Information:</h4>
      <div class="text-sm text-green-700 space-y-2">
        <div v-if="extractedData.name">
          <strong>Name:</strong> {{ extractedData.name }}
        </div>
        <div v-if="extractedData.title">
          <strong>Title:</strong> {{ extractedData.title }}
        </div>
        <div v-if="extractedData.location">
          <strong>Location:</strong> {{ extractedData.location }}
        </div>
        <div v-if="extractedData.summary">
          <strong>Summary:</strong> {{ extractedData.summary }}
        </div>
        <div v-if="extractedData.experience && extractedData.experience.length > 0">
          <strong>Experience:</strong> {{ extractedData.experience.length }} positions found
        </div>
        <div v-if="extractedData.education && extractedData.education.length > 0">
          <strong>Education:</strong> {{ extractedData.education.length }} entries found
        </div>
        <div v-if="extractedData.skills && extractedData.skills.length > 0">
          <strong>Skills:</strong> {{ extractedData.skills.length }} skills found
        </div>
      </div>
      
      <button
        @click="applyToResume"
        class="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
      >
        Apply to Resume
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

const isDragOver = ref(false)
const selectedFile = ref(null)
const isUploading = ref(false)
const extractedData = ref(null)
const error = ref('')
const fileInput = ref(null)

const handleDrop = (e) => {
  isDragOver.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = (file) => {
  if (file.type !== 'application/pdf') {
    error.value = 'Please select a PDF file'
    return
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    error.value = 'File size must be less than 10MB'
    return
  }
  
  selectedFile.value = file
  error.value = ''
  extractedData.value = null
}

const uploadAndProcess = async () => {
  if (!selectedFile.value) return
  
  isUploading.value = true
  error.value = ''
  
  try {
    const formData = new FormData()
    formData.append('pdf', selectedFile.value)
    
    const response = await fetch('/api/linkedin/upload', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('Failed to process PDF')
    }
    
    const data = await response.json()
    extractedData.value = data.extractedData
    
  } catch (err) {
    error.value = err.message || 'Failed to process PDF. Please try again.'
  } finally {
    isUploading.value = false
  }
}

const applyToResume = () => {
  emit('data-extracted', extractedData.value)
}

const clearFile = () => {
  selectedFile.value = null
  extractedData.value = null
  error.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
