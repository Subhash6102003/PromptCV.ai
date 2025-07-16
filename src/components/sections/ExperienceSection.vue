<template>
  <div class="resume-section-experience p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ data.name || 'Professional Experience' }}</h2>
      <div v-if="editable" class="flex items-center space-x-2">
        <button 
          @click="addExperience"
          class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
        >
          + Add Experience
        </button>
        <button 
          @click="importFromLinkedIn"
          class="px-3 py-1 text-white text-xs rounded hover:opacity-90 transition-colors"
          style="background-color: #0F172A;"
        >
          Import LinkedIn
        </button>
      </div>
    </div>
    
    <div class="space-y-6">
      <div v-if="!editable && (!experiences || experiences.length === 0)" class="text-gray-500 text-center py-8">
        No experience added yet.
      </div>
      
      <div v-for="(experience, index) in experiences" :key="experience.id" class="experience-item">
        <div v-if="!editable" class="experience-display">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ experience.position }}</h3>
              <p class="text-base text-blue-600 font-medium">{{ experience.company }}</p>
              <p class="text-sm text-gray-600">{{ experience.location }}</p>
            </div>
            <div class="text-sm text-gray-600">
              {{ formatDateRange(experience.startDate, experience.endDate, experience.current) }}
            </div>
          </div>
          
          <div v-if="experience.description" class="mt-3 text-gray-700">
            <ul class="space-y-1">
              <li v-for="(bullet, idx) in experience.description.split('\n').filter(b => b.trim())" :key="idx" class="flex items-start">
                <span class="text-blue-600 mr-2 mt-1.5 text-xs">•</span>
                <span>{{ bullet.trim() }}</span>
              </li>
            </ul>
          </div>
          
          <div v-if="experience.technologies && experience.technologies.length > 0" class="mt-3">
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in experience.technologies" 
                :key="tech"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="experience-edit border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Experience {{ index + 1 }}</h3>
            <div class="flex space-x-2">
              <button 
                @click="improveExperience(index)"
                class="px-2 py-1 text-white text-xs rounded hover:opacity-90 transition-colors"
                style="background-color: #0F172A;"
              >
                AI Improve
              </button>
              <button 
                @click="removeExperience(index)"
                class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
              <input
                v-model="experience.position"
                @input="updateExperience"
                type="text"
                placeholder="e.g., Senior Software Engineer"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                v-model="experience.company"
                @input="updateExperience"
                type="text"
                placeholder="e.g., Microsoft"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                v-model="experience.location"
                @input="updateExperience"
                type="text"
                placeholder="e.g., Seattle, WA"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
              <select
                v-model="experience.type"
                @change="updateExperience"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                v-model="experience.startDate"
                @input="updateExperience"
                type="month"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    v-model="experience.current"
                    @change="updateExperience"
                    type="checkbox"
                    class="mr-2"
                  >
                  <label class="text-sm text-gray-600">Currently working here</label>
                </div>
                <input
                  v-if="!experience.current"
                  v-model="experience.endDate"
                  @input="updateExperience"
                  type="month"
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description & Achievements</label>
            <textarea
              v-model="experience.description"
              @input="updateExperience"
              placeholder="• Increased sales revenue by 25% through strategic client relationship management&#10;• Led a team of 5 developers in delivering critical product features&#10;• Implemented automated testing processes, reducing bugs by 40%"
              rows="6"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Use bullet points (•) to list your key achievements and responsibilities</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Technologies & Skills</label>
            <input
              v-model="experience.technologiesText"
              @input="updateTechnologies(index, $event)"
              type="text"
              placeholder="e.g., JavaScript, React, Node.js, AWS, Agile"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
            <div v-if="experience.technologies && experience.technologies.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="tech in experience.technologies" 
                :key="tech"
                class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, defineProps, defineEmits } from 'vue'

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

const experiences = ref(props.data.experiences || [])

const addExperience = () => {
  const newExperience = {
    id: Date.now(),
    position: '',
    company: '',
    location: '',
    type: 'full-time',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: [],
    technologiesText: ''
  }
  experiences.value.push(newExperience)
  updateData()
}

const removeExperience = (index) => {
  if (confirm('Are you sure you want to remove this experience?')) {
    experiences.value.splice(index, 1)
    updateData()
  }
}

const updateExperience = () => {
  updateData()
}

const updateTechnologies = (index, event) => {
  const technologiesText = event.target.value
  const technologies = technologiesText
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
  
  experiences.value[index].technologies = technologies
  experiences.value[index].technologiesText = technologiesText
  updateData()
}

const updateData = () => {
  emit('update', { experiences: experiences.value })
}

const formatDateRange = (startDate, endDate, current) => {
  if (!startDate) return ''
  
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr + '-01')
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  
  const start = formatDate(startDate)
  const end = current ? 'Present' : formatDate(endDate)
  
  return `${start} - ${end}`
}

const improveExperience = async (index) => {
  const experience = experiences.value[index]
  
  if (!experience.description?.trim()) {
    alert('Please add some description first, then I can help improve it!')
    return
  }
  
  // Simulate AI improvement
  alert('AI would analyze your experience and suggest improvements like:\n\n• Adding quantifiable achievements\n• Using stronger action verbs\n• Highlighting relevant skills\n• Optimizing for ATS keywords')
}

const importFromLinkedIn = () => {
  alert('LinkedIn import feature would connect to LinkedIn API to automatically populate your work experience.')
}

// Watch for external data changes
watch(() => props.data.experiences, (newExperiences) => {
  experiences.value = newExperiences || []
}, { deep: true })

// Initialize technologies text for existing experiences
watch(experiences, () => {
  experiences.value.forEach(exp => {
    if (exp.technologies && !exp.technologiesText) {
      exp.technologiesText = exp.technologies.join(', ')
    }
  })
}, { immediate: true, deep: true })
</script>

<style scoped>
.experience-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.experience-display {
  transition: all 0.2s ease;
}

.experience-display:hover {
  background-color: #f9fafb;
  padding: 1rem;
  margin: -1rem;
  border-radius: 0.5rem;
}
</style>
