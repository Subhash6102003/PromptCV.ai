<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Panel: Features -->
        <div class="lg:col-span-1">
          <!-- Personal Info Section -->
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <div 
              class="p-4 border-b cursor-pointer flex items-center justify-between"
              @click="togglePersonalInfo"
            >
              <h3 class="font-semibold text-gray-900">Personal Information</h3>
              <div class="flex items-center space-x-2">
                <button 
                  v-if="!showPersonalInfo && personalInfoFilled"
                  @click.stop="editPersonalInfo"
                  class="text-sm text-blue-600 hover:text-blue-700"
                >
                  Edit Info
                </button>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': showPersonalInfo }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Personal Info Form (Collapsible) -->
            <div 
              class="overflow-hidden transition-all duration-300"
              :class="showPersonalInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
            >
              <div class="p-4 space-y-4">
                <div class="grid grid-cols-1 gap-3">
                  <input 
                    v-model="personalInfo.fullName"
                    type="text"
                    placeholder="Full Name"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <input 
                    v-model="personalInfo.email"
                    type="email"
                    placeholder="Email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <input 
                    v-model="personalInfo.phone"
                    type="tel"
                    placeholder="Phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <input 
                    v-model="personalInfo.location"
                    type="text"
                    placeholder="Location"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <input 
                    v-model="personalInfo.linkedin"
                    type="url"
                    placeholder="LinkedIn URL"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                  <input 
                    v-model="personalInfo.github"
                    type="url"
                    placeholder="GitHub URL"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                </div>
                
                <div class="flex space-x-2">
                  <button 
                    @click="savePersonalInfo"
                    class="flex-1 py-2 px-4 text-white rounded-lg hover:opacity-90 transition-colors"
                    style="background-color: #0F172A;"
                  >
                    {{ personalInfoFilled ? 'Update Info' : 'Save Info' }}
                  </button>
                  <button 
                    v-if="personalInfoFilled"
                    @click="cancelEditPersonalInfo"
                    class="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Cleaned up PromptCV.ai Features (Removed Download, Share, History, Branding) -->
          <ResumeFeatures 
            @data-extracted="handleDataExtracted"
            @section-added="handleSectionAdded"
          />
        </div>

        <!-- Right Panel: Resume Preview -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Resume Preview</h3>
              <div class="flex items-center space-x-3">
                <div class="text-sm text-gray-500">
                  Template: {{ selectedTemplate }}
                </div>
                
                <!-- Export Dropdown -->
                <div class="relative" ref="exportDropdownRef">
                  <button 
                    @click="showExportDropdown = !showExportDropdown"
                    class="flex items-center px-3 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm"
                    style="background-color: #0F172A;"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Export
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div 
                    v-show="showExportDropdown"
                    class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
                  >
                    <button 
                      @click="exportResume('pdf')"
                      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Export PDF
                    </button>
                    <button 
                      @click="exportResume('docx')"
                      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Export Word Document
                    </button>
                    <button 
                      @click="shareResume"
                      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <svg class="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                      </svg>
                      Share Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Draggable Resume Sections -->
            <div class="space-y-4">
              <draggable 
                v-model="resumeSections" 
                @change="handleSectionReorder"
                handle=".drag-handle"
                class="space-y-4"
              >
                <template #item="{ element }">
                  <div class="border border-gray-200 rounded-lg p-4 relative group">
                    <!-- Drag Handle -->
                    <div class="drag-handle absolute left-2 top-2 opacity-0 group-hover:opacity-100 cursor-move transition-opacity">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </div>
                    
                    <!-- Section Content -->
                    <component 
                      :is="getSectionComponent(element.type)"
                      :data="element.data"
                      :editable="true"
                      @update="updateSection(element.id, $event)"
                    />
                    
                    <!-- Section Controls -->
                    <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        @click="moveSection(element.id, 'up')"
                        class="p-1 text-gray-400 hover:text-gray-600 mr-1"
                        title="Move Up"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                      </button>
                      <button 
                        @click="moveSection(element.id, 'down')"
                        class="p-1 text-gray-400 hover:text-gray-600 mr-1"
                        title="Move Down"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      <button 
                        @click="removeSection(element.id)"
                        class="p-1 text-red-400 hover:text-red-600"
                        title="Remove Section"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            
            <!-- Add Section Button -->
            <button 
              @click="showAddSectionModal = true"
              class="mt-4 w-full py-3 border-2 border-dashed rounded-lg hover:border-gray-400 transition-colors"
              style="border-color: #E5E7EB; color: #6B7280;"
            >
              + Add Section
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div 
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white border-l-4 p-4 rounded-lg shadow-lg transition-all duration-300"
      :class="{
        'border-green-500': toast.type === 'success',
        'border-red-500': toast.type === 'error',
        'border-blue-500': toast.type === 'info'
      }"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg 
            v-if="toast.type === 'success'"
            class="h-5 w-5 text-green-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg 
            v-else-if="toast.type === 'error'"
            class="h-5 w-5 text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg 
            v-else
            class="h-5 w-5 text-blue-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">{{ toast.message }}</p>
        </div>
      </div>
    </div>
    
    <!-- Add Section Modal -->
    <div 
      v-if="showAddSectionModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showAddSectionModal = false"
    >
      <div 
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        @click.stop
      >
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Add New Section</h3>
        
        <div class="space-y-3">
          <button
            @click="addSection('projects')"
            class="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="font-medium text-gray-900">Projects</div>
            <div class="text-sm text-gray-500">Add your projects and portfolio</div>
          </button>
          
          <button
            @click="addSection('certifications')"
            class="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="font-medium text-gray-900">Certifications</div>
            <div class="text-sm text-gray-500">Add your professional certifications</div>
          </button>
          
          <button
            @click="addSection('languages')"
            class="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="font-medium text-gray-900">Languages</div>
            <div class="text-sm text-gray-500">Add languages you speak</div>
          </button>
          
          <button
            @click="addSection('achievements')"
            class="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="font-medium text-gray-900">Achievements</div>
            <div class="text-sm text-gray-500">Add awards and recognition</div>
          </button>
          
          <button
            @click="addSection('volunteer')"
            class="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="font-medium text-gray-900">Volunteer Work</div>
            <div class="text-sm text-gray-500">Add volunteer experience</div>
          </button>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button
            @click="showAddSectionModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import draggable from 'vuedraggable'

// Import all section components
import HeaderSection from './sections/HeaderSection.vue'
import SummarySection from './sections/SummarySection.vue'
import ExperienceSection from './sections/ExperienceSection.vue'
import EducationSection from './sections/EducationSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import ProjectsSection from './sections/ProjectsSection.vue'
import CertificationsSection from './sections/CertificationsSection.vue'
import ResumeFeatures from './ResumeFeatures.vue'

const route = useRoute()

// Reactive data
const showExportDropdown = ref(false)
const showPersonalInfo = ref(true)
const showAddSectionModal = ref(false)
const selectedTemplate = ref('Modern')
const personalInfoFilled = ref(false)

const personalInfo = ref({
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: ''
})

const resumeSections = ref([
  {
    id: 'header',
    type: 'header',
    data: { name: 'Header' },
    order: 0
  },
  {
    id: 'summary',
    type: 'summary',
    data: { name: 'Professional Summary' },
    order: 1
  },
  {
    id: 'experience',
    type: 'experience',
    data: { name: 'Professional Experience', experiences: [] },
    order: 2
  },
  {
    id: 'education',
    type: 'education',
    data: { name: 'Education', educations: [] },
    order: 3
  },
  {
    id: 'skills',
    type: 'skills',
    data: { name: 'Skills', skillCategories: [] },
    order: 4
  }
])

const toast = ref({
  show: false,
  message: '',
  type: 'info'
})

// Auto-save functionality
let autoSaveTimer = null

// Computed properties
const exportDropdownRef = ref(null)

// Methods
const togglePersonalInfo = () => {
  showPersonalInfo.value = !showPersonalInfo.value
}

const editPersonalInfo = () => {
  showPersonalInfo.value = true
}

const savePersonalInfo = async () => {
  try {
    // Save to localStorage
    localStorage.setItem('promptcv_personal_info', JSON.stringify(personalInfo.value))
    
    personalInfoFilled.value = true
    
    // Auto-collapse after save
    setTimeout(() => {
      showPersonalInfo.value = false
    }, 500)
    
    // Auto-start with template
    if (!resumeSections.value.find(section => section.type === 'summary')) {
      await autoStartWithTemplate()
    }
    
    showToast('Personal information saved successfully!', 'success')
    
    // Trigger auto-save
    startAutoSave()
    
  } catch (error) {
    showToast('Failed to save personal information', 'error')
  }
}

const cancelEditPersonalInfo = () => {
  // Reload saved data
  loadPersonalInfo()
  showPersonalInfo.value = false
}

const autoStartWithTemplate = async () => {
  // Add default sections based on modern template
  const defaultSections = [
    { id: 'summary', type: 'summary', data: { content: '' }, order: 1 },
    { id: 'experience', type: 'experience', data: { items: [] }, order: 2 },
    { id: 'education', type: 'education', data: { items: [] }, order: 3 },
    { id: 'skills', type: 'skills', data: { items: [] }, order: 4 }
  ]
  
  // Add sections that don't exist
  defaultSections.forEach(section => {
    if (!resumeSections.value.find(s => s.type === section.type)) {
      resumeSections.value.push(section)
    }
  })
  
  // Sort sections by order
  resumeSections.value.sort((a, b) => a.order - b.order)
  
  selectedTemplate.value = 'Modern'
  showToast('Template applied automatically!', 'info')
}

const handleDataExtracted = (data) => {
  // Handle LinkedIn/GitHub data extraction
  if (data.type === 'linkedin') {
    // Process LinkedIn data
    populateFromLinkedIn(data)
  } else if (data.type === 'github') {
    // Process GitHub data
    populateFromGitHub(data)
  }
  
  showToast('Data imported successfully!', 'success')
}

const handleSectionAdded = (sectionType) => {
  const newSection = {
    id: `${sectionType}-${Date.now()}`,
    type: sectionType,
    data: getDefaultSectionData(sectionType),
    order: resumeSections.value.length
  }
  
  resumeSections.value.push(newSection)
  showToast(`${sectionType} section added!`, 'success')
}

const handleSectionReorder = () => {
  // Update order based on new position
  resumeSections.value.forEach((section, index) => {
    section.order = index
  })
  
  saveResumeData()
  showToast('Sections reordered!', 'info')
}

const moveSection = (sectionId, direction) => {
  const currentIndex = resumeSections.value.findIndex(s => s.id === sectionId)
  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
  
  if (newIndex >= 0 && newIndex < resumeSections.value.length) {
    const section = resumeSections.value.splice(currentIndex, 1)[0]
    resumeSections.value.splice(newIndex, 0, section)
    handleSectionReorder()
  }
}

const removeSection = (sectionId) => {
  resumeSections.value = resumeSections.value.filter(s => s.id !== sectionId)
  saveResumeData()
  showToast('Section removed!', 'info')
}

const updateSection = (sectionId, data) => {
  const section = resumeSections.value.find(s => s.id === sectionId)
  if (section) {
    section.data = { ...section.data, ...data }
    saveResumeData()
  }
}

const getSectionComponent = (type) => {
  const componentMap = {
    'header': HeaderSection,
    'summary': SummarySection,
    'experience': ExperienceSection,
    'education': EducationSection,
    'skills': SkillsSection,
    'projects': ProjectsSection,
    'certifications': CertificationsSection
  }
  
  return componentMap[type] || 'div'
}

const exportResume = (format) => {
  showExportDropdown.value = false
  showToast(`Exporting as ${format.toUpperCase()}...`, 'info')
  
  // Implementation for different export formats
  switch (format) {
    case 'pdf':
      // PDF export logic
      break
    case 'docx':
      // Word export logic
      break
    case 'html':
      // HTML export logic
      break
    case 'image':
      // Image export logic
      break
  }
}

const shareResume = () => {
  showExportDropdown.value = false
  showToast('Share functionality coming soon!', 'info')
}

const viewHistory = () => {
  showExportDropdown.value = false
  showToast('Version history coming soon!', 'info')
}

const showToast = (message, type = 'info') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

const startAutoSave = () => {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
  }
  
  autoSaveTimer = setInterval(() => {
    saveResumeData(false) // Silent save
  }, 10000) // Every 10 seconds
}

const saveResumeData = (showToastMessage = true) => {
  try {
    const resumeData = {
      personalInfo: personalInfo.value,
      sections: resumeSections.value,
      template: selectedTemplate.value,
      lastModified: new Date().toISOString()
    }
    
    localStorage.setItem('promptcv_resume_data', JSON.stringify(resumeData))
    
    if (showToastMessage) {
      showToast('Resume saved!', 'success')
    }
  } catch (error) {
    if (showToastMessage) {
      showToast('Failed to save resume', 'error')
    }
  }
}

const loadPersonalInfo = () => {
  const saved = localStorage.getItem('promptcv_personal_info')
  if (saved) {
    personalInfo.value = JSON.parse(saved)
    personalInfoFilled.value = true
  }
}

const loadResumeData = () => {
  const saved = localStorage.getItem('promptcv_resume_data')
  if (saved) {
    const data = JSON.parse(saved)
    resumeSections.value = data.sections || []
    selectedTemplate.value = data.template || 'Modern'
  }
}

// Add Section functionality
const addSection = (sectionType) => {
  const sectionExists = resumeSections.value.find(s => s.type === sectionType)
  if (sectionExists) {
    showToast(`${sectionType} section already exists!`, 'error')
    return
  }
  
  const newSection = {
    id: `${sectionType}-${Date.now()}`,
    type: sectionType,
    data: getDefaultSectionData(sectionType),
    order: resumeSections.value.length
  }
  
  resumeSections.value.push(newSection)
  showAddSectionModal.value = false
  showToast(`${sectionType} section added successfully!`, 'success')
}

const getDefaultSectionData = (sectionType) => {
  switch (sectionType) {
    case 'experience':
      return {
        name: 'Professional Experience',
        items: [{
          title: 'Job Title',
          company: 'Company Name',
          duration: 'Start Date - End Date',
          location: 'Location',
          description: 'Job description and key achievements...'
        }]
      }
    case 'education':
      return {
        name: 'Education',
        items: [{
          degree: 'Degree',
          school: 'Institution',
          year: 'Year',
          location: 'Location',
          description: 'Relevant coursework and achievements...'
        }]
      }
    case 'skills':
      return {
        name: 'Skills',
        items: ['Skill 1', 'Skill 2', 'Skill 3']
      }
    case 'projects':
      return {
        name: 'Projects',
        items: [{
          title: 'Project Name',
          description: 'Project description and key achievements...',
          technologies: ['Tech 1', 'Tech 2'],
          link: 'https://github.com/username/project'
        }]
      }
    case 'certifications':
      return {
        name: 'Certifications',
        items: [{
          name: 'Certification Name',
          issuer: 'Issuing Organization',
          date: 'Issue Date',
          description: 'Certification description...'
        }]
      }
    default:
      return { name: sectionType, items: [] }
  }
}

// Watchers
watch(personalInfo, () => {
  startAutoSave()
}, { deep: true })

watch(resumeSections, () => {
  startAutoSave()
}, { deep: true })

// Lifecycle
onMounted(() => {
  loadPersonalInfo()
  loadResumeData()
  
  // Check for auto-start parameter
  if (route.query['auto-start'] === 'true') {
    nextTick(() => {
      if (personalInfoFilled.value) {
        autoStartWithTemplate()
      }
    })
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (exportDropdownRef.value && !exportDropdownRef.value.contains(event.target)) {
      showExportDropdown.value = false
    }
  })
})
</script>

<style scoped>
/* Smooth transitions for collapsible sections */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Drag handle styling */
.drag-handle {
  transition: opacity 0.2s ease-in-out;
}

/* Toast animation */
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
