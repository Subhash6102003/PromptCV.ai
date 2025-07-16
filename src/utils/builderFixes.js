import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useResumeStore } from '@/stores/resume'

// Fix Import Features components
const ImportFeatures = {
  template: `
    <div class="space-y-6">
      <!-- LinkedIn Import -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: #0F172A;">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">LinkedIn Import</h3>
              <p class="text-sm text-gray-600">Import your profile and experience data</p>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <p class="text-gray-600">Connect your LinkedIn account to automatically import your professional experience, education, and skills.</p>
          <button 
            @click="connectLinkedIn"
            class="w-full py-3 px-4 text-white font-medium rounded-lg hover:opacity-90 transition-colors"
            style="background-color: #0F172A;"
          >
            Connect LinkedIn & Import Data
          </button>
        </div>
      </div>

      <!-- GitHub Import -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-900">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">GitHub Import</h3>
              <p class="text-sm text-gray-600">Import your projects and repositories</p>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <p class="text-gray-600">Connect your GitHub account to automatically import your projects and contributions.</p>
          <button 
            @click="connectGitHub"
            class="w-full py-3 px-4 text-white font-medium rounded-lg hover:opacity-90 transition-colors"
            style="background-color: #0F172A;"
          >
            Connect GitHub & Import Projects
          </button>
        </div>
      </div>
    </div>
  `,
  setup() {
    const authStore = useAuthStore()
    const resumeStore = useResumeStore()
    
    const connectLinkedIn = () => {
      window.location.href = 'http://localhost:5174/profile'
    }
    
    const connectGitHub = () => {
      window.location.href = 'http://localhost:5174/profile'
    }
    
    return {
      connectLinkedIn,
      connectGitHub
    }
  }
}

// Fix Add Section functionality
const addSection = (sectionType) => {
  const newSection = {
    id: Date.now().toString(),
    type: sectionType,
    data: getDefaultSectionData(sectionType)
  }
  
  resumeSections.value.push(newSection)
  localStorage.setItem('resume_sections', JSON.stringify(resumeSections.value))
  showToast(`${sectionType} section added successfully!`, 'success')
}

const getDefaultSectionData = (sectionType) => {
  switch (sectionType) {
    case 'experience':
      return {
        title: 'New Position',
        company: 'Company Name',
        duration: 'Start Date - End Date',
        location: 'Location',
        description: 'Job description and achievements...'
      }
    case 'education':
      return {
        degree: 'Degree',
        school: 'Institution',
        year: 'Year',
        location: 'Location',
        description: 'Relevant coursework and achievements...'
      }
    case 'skills':
      return {
        category: 'Technical Skills',
        skills: ['Skill 1', 'Skill 2', 'Skill 3']
      }
    case 'projects':
      return {
        title: 'Project Name',
        description: 'Project description and key achievements...',
        technologies: ['Tech 1', 'Tech 2'],
        link: 'https://github.com/username/project'
      }
    case 'certifications':
      return {
        name: 'Certification Name',
        issuer: 'Issuing Organization',
        date: 'Issue Date',
        description: 'Certification description...'
      }
    default:
      return {}
  }
}

export { ImportFeatures, addSection, getDefaultSectionData }
