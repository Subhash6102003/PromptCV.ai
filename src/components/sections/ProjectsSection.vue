<template>
  <div class="resume-section-projects p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ data.name || 'Projects' }}</h2>
      <div v-if="editable" class="flex items-center space-x-2">
        <button 
          @click="addProject"
          class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
        >
          + Add Project
        </button>
        <button 
          @click="importFromGitHub"
          class="px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-900 transition-colors"
        >
          Import GitHub
        </button>
      </div>
    </div>
    
    <div class="space-y-6">
      <div v-if="!editable && (!projects || projects.length === 0)" class="text-gray-500 text-center py-8">
        No projects added yet.
      </div>
      
      <div v-for="(project, index) in projects" :key="project.id" class="project-item">
        <div v-if="!editable" class="project-display">
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
                <div class="flex space-x-2">
                  <a 
                    v-if="project.liveUrl" 
                    :href="project.liveUrl" 
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Live Demo
                  </a>
                  <a 
                    v-if="project.githubUrl" 
                    :href="project.githubUrl" 
                    target="_blank"
                    class="text-gray-700 hover:text-gray-900 text-sm flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ project.type }} • {{ formatDateRange(project.startDate, project.endDate) }}</p>
            </div>
          </div>
          
          <div v-if="project.description" class="mb-3 text-gray-700">
            <p class="leading-relaxed">{{ project.description }}</p>
          </div>
          
          <div v-if="project.features && project.features.length > 0" class="mb-3">
            <h4 class="text-sm font-semibold text-gray-800 mb-2">Key Features:</h4>
            <ul class="space-y-1">
              <li v-for="feature in project.features" :key="feature" class="flex items-start text-sm text-gray-700">
                <span class="text-blue-600 mr-2 mt-1 text-xs">•</span>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          
          <div v-if="project.technologies && project.technologies.length > 0" class="mb-3">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div v-if="project.achievements && project.achievements.length > 0" class="mt-3">
            <h4 class="text-sm font-semibold text-gray-800 mb-2">Achievements:</h4>
            <ul class="space-y-1">
              <li v-for="achievement in project.achievements" :key="achievement" class="flex items-start text-sm text-gray-700">
                <span class="text-green-600 mr-2 mt-1 text-xs">★</span>
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div v-else class="project-edit border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Project {{ index + 1 }}</h3>
            <div class="flex space-x-2">
              <button 
                @click="improveProject(index)"
                class="px-2 py-1 text-white text-xs rounded hover:opacity-90 transition-colors"
                style="background-color: #0F172A;"
              >
                AI Improve
              </button>
              <button 
                @click="removeProject(index)"
                class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                v-model="project.name"
                @input="updateProjects"
                type="text"
                placeholder="e.g., E-commerce Dashboard"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select
                v-model="project.type"
                @change="updateProjects"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Web Application">Web Application</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Desktop Application">Desktop Application</option>
                <option value="API/Backend">API/Backend</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Design Project">Design Project</option>
                <option value="Open Source">Open Source</option>
                <option value="Academic Project">Academic Project</option>
                <option value="Personal Project">Personal Project</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="project.status"
                @change="updateProjects"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                v-model="project.startDate"
                @input="updateProjects"
                type="month"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                v-model="project.endDate"
                @input="updateProjects"
                type="month"
                :disabled="project.status === 'in-progress'"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Live URL (Optional)</label>
              <input
                v-model="project.liveUrl"
                @input="updateProjects"
                type="url"
                placeholder="https://your-project.com"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">GitHub URL (Optional)</label>
              <input
                v-model="project.githubUrl"
                @input="updateProjects"
                type="url"
                placeholder="https://github.com/username/repo"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="project.description"
              @input="updateProjects"
              placeholder="Brief description of the project, its purpose, and your role..."
              rows="3"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
            <textarea
              v-model="project.featuresText"
              @input="updateFeatures(index, $event)"
              placeholder="• Real-time chat functionality&#10;• User authentication and authorization&#10;• Responsive design for mobile and desktop"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Use bullet points (•) or separate each feature on a new line</p>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
            <input
              v-model="project.technologiesText"
              @input="updateTechnologies(index, $event)"
              type="text"
              placeholder="e.g., React, Node.js, MongoDB, Express, Socket.io"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
            <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Achievements (Optional)</label>
            <textarea
              v-model="project.achievementsText"
              @input="updateAchievements(index, $event)"
              placeholder="• Gained 1000+ users within first month&#10;• Reduced loading time by 50%&#10;• Featured on Product Hunt"
              rows="3"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Use bullet points (•) or separate each achievement on a new line</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update'])

const projects = ref(props.data.projects || [])

const addProject = () => {
  const newProject = {
    id: Date.now(),
    name: '',
    type: '',
    status: 'completed',
    startDate: '',
    endDate: '',
    description: '',
    features: [],
    featuresText: '',
    technologies: [],
    technologiesText: '',
    achievements: [],
    achievementsText: '',
    liveUrl: '',
    githubUrl: ''
  }
  projects.value.push(newProject)
  updateProjects()
}

const removeProject = (index) => {
  if (confirm('Are you sure you want to remove this project?')) {
    projects.value.splice(index, 1)
    updateProjects()
  }
}

const updateProjects = () => {
  emit('update', { projects: projects.value })
}

const updateFeatures = (index, event) => {
  const featuresText = event.target.value
  const features = featuresText
    .split('\n')
    .map(feature => feature.replace(/^[•\-*]\s*/, '').trim())
    .filter(feature => feature.length > 0)
  
  projects.value[index].features = features
  projects.value[index].featuresText = featuresText
  updateProjects()
}

const updateTechnologies = (index, event) => {
  const technologiesText = event.target.value
  const technologies = technologiesText
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
  
  projects.value[index].technologies = technologies
  projects.value[index].technologiesText = technologiesText
  updateProjects()
}

const updateAchievements = (index, event) => {
  const achievementsText = event.target.value
  const achievements = achievementsText
    .split('\n')
    .map(achievement => achievement.replace(/^[•\-*]\s*/, '').trim())
    .filter(achievement => achievement.length > 0)
  
  projects.value[index].achievements = achievements
  projects.value[index].achievementsText = achievementsText
  updateProjects()
}

const formatDateRange = (startDate, endDate) => {
  if (!startDate) return ''
  
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr + '-01')
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  
  const start = formatDate(startDate)
  const end = endDate ? formatDate(endDate) : 'Present'
  
  return start === end ? start : `${start} - ${end}`
}

const improveProject = async (index) => {
  const project = projects.value[index]
  
  if (!project.description?.trim()) {
    alert('Please add a project description first, then I can help improve it!')
    return
  }
  
  // Simulate AI improvement
  alert('AI would analyze your project and suggest improvements like:\n\n• Highlighting technical achievements\n• Adding quantifiable metrics\n• Improving feature descriptions\n• Suggesting relevant technologies to add')
}

const importFromGitHub = () => {
  alert('GitHub import feature would connect to GitHub API to automatically populate your repositories as projects.')
}

// Watch for external data changes
watch(() => props.data.projects, (newProjects) => {
  projects.value = newProjects || []
}, { deep: true })

// Initialize text fields for existing projects
watch(projects, () => {
  projects.value.forEach(project => {
    if (project.features && !project.featuresText) {
      project.featuresText = project.features.map(f => `• ${f}`).join('\n')
    }
    if (project.technologies && !project.technologiesText) {
      project.technologiesText = project.technologies.join(', ')
    }
    if (project.achievements && !project.achievementsText) {
      project.achievementsText = project.achievements.map(a => `• ${a}`).join('\n')
    }
  })
}, { immediate: true, deep: true })
</script>

<style scoped>
.project-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.project-display {
  transition: all 0.2s ease;
}

.project-display:hover {
  background-color: #f9fafb;
  padding: 1rem;
  margin: -1rem;
  border-radius: 0.5rem;
}
</style>
