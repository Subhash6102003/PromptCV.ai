<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Resume Preview</h1>
        <div class="flex space-x-4">
          <router-link 
            to="/builder"
            class="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
          >
            Edit Resume
          </router-link>
          <button 
            @click="exportToPDF"
            class="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      </div>

      <!-- Resume Preview -->
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-[8.5in] mx-auto">
        <ResumePreview :resume="resumeStore.resume" :template="resumeStore.selectedTemplate" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useResumeStore } from '@/stores/resume'
import ResumePreview from '@/components/ResumePreview.vue'

const resumeStore = useResumeStore()

const exportToPDF = () => {
  import('html2pdf.js').then(html2pdf => {
    const element = document.querySelector('.bg-white.rounded-lg.shadow-lg')
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf.default().set(opt).from(element).save()
  })
}
</script>
