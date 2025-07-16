<template>
  <div class="resume-section-education p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ data.name || 'Education' }}</h2>
      <div v-if="editable" class="flex items-center space-x-2">
        <button 
          @click="addEducation"
          class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
        >
          + Add Education
        </button>
      </div>
    </div>
    
    <div class="space-y-4">
      <div v-if="!editable && (!educations || educations.length === 0)" class="text-gray-500 text-center py-8">
        No education added yet.
      </div>
      
      <div v-for="(education, index) in educations" :key="education.id" class="education-item">
        <div v-if="!editable" class="education-display">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ education.degree }}</h3>
              <p class="text-base text-blue-600 font-medium">{{ education.institution }}</p>
              <p class="text-sm text-gray-600">{{ education.location }}</p>
              <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span v-if="education.fieldOfStudy">{{ education.fieldOfStudy }}</span>
                <span v-if="education.gpa" class="font-medium">GPA: {{ education.gpa }}</span>
              </div>
            </div>
            <div class="text-sm text-gray-600">
              {{ formatDateRange(education.startDate, education.endDate, education.current) }}
            </div>
          </div>
          
          <div v-if="education.description" class="mt-3 text-gray-700">
            <ul class="space-y-1">
              <li v-for="(bullet, idx) in education.description.split('\n').filter(b => b.trim())" :key="idx" class="flex items-start">
                <span class="text-blue-600 mr-2 mt-1.5 text-xs">•</span>
                <span>{{ bullet.trim() }}</span>
              </li>
            </ul>
          </div>
          
          <div v-if="education.coursework && education.coursework.length > 0" class="mt-3">
            <p class="text-sm font-medium text-gray-700 mb-2">Relevant Coursework:</p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="course in education.coursework" 
                :key="course"
                class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {{ course }}
              </span>
            </div>
          </div>
          
          <div v-if="education.honors && education.honors.length > 0" class="mt-3">
            <p class="text-sm font-medium text-gray-700 mb-1">Honors & Awards:</p>
            <ul class="text-sm text-gray-600">
              <li v-for="honor in education.honors" :key="honor" class="flex items-start">
                <span class="text-yellow-600 mr-2 mt-0.5 text-xs">★</span>
                <span>{{ honor }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div v-else class="education-edit border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Education {{ index + 1 }}</h3>
            <button 
              @click="removeEducation(index)"
              class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <select
                v-model="education.degree"
                @change="updateEducation"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Degree</option>
                <option value="Bachelor of Science">Bachelor of Science</option>
                <option value="Bachelor of Arts">Bachelor of Arts</option>
                <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                <option value="Master of Science">Master of Science</option>
                <option value="Master of Arts">Master of Arts</option>
                <option value="Master of Business Administration">MBA</option>
                <option value="Master of Engineering">Master of Engineering</option>
                <option value="Doctor of Philosophy">PhD</option>
                <option value="Juris Doctor">Juris Doctor</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Certificate">Certificate</option>
                <option value="Diploma">Diploma</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
              <input
                v-model="education.fieldOfStudy"
                @input="updateEducation"
                type="text"
                placeholder="e.g., Computer Science"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                v-model="education.institution"
                @input="updateEducation"
                type="text"
                placeholder="e.g., University of California, Berkeley"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                v-model="education.location"
                @input="updateEducation"
                type="text"
                placeholder="e.g., Berkeley, CA"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                v-model="education.startDate"
                @input="updateEducation"
                type="month"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    v-model="education.current"
                    @change="updateEducation"
                    type="checkbox"
                    class="mr-2"
                  >
                  <label class="text-sm text-gray-600">Currently studying</label>
                </div>
                <input
                  v-if="!education.current"
                  v-model="education.endDate"
                  @input="updateEducation"
                  type="month"
                  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
              <input
                v-model="education.gpa"
                @input="updateEducation"
                type="text"
                placeholder="e.g., 3.85/4.0"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              v-model="education.description"
              @input="updateEducation"
              placeholder="• Relevant projects, thesis, or academic achievements&#10;• Leadership roles in student organizations&#10;• Research experience or publications"
              rows="4"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Relevant Coursework (Optional)</label>
            <input
              v-model="education.courseworkText"
              @input="updateCoursework(index, $event)"
              type="text"
              placeholder="e.g., Data Structures, Algorithms, Machine Learning, Database Systems"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="text-xs text-gray-500 mt-1">Separate courses with commas</p>
            <div v-if="education.coursework && education.coursework.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="course in education.coursework" 
                :key="course"
                class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {{ course }}
              </span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Honors & Awards (Optional)</label>
            <input
              v-model="education.honorsText"
              @input="updateHonors(index, $event)"
              type="text"
              placeholder="e.g., Dean's List, Magna Cum Laude, Phi Beta Kappa"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="text-xs text-gray-500 mt-1">Separate honors with commas</p>
            <div v-if="education.honors && education.honors.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="honor in education.honors" 
                :key="honor"
                class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded"
              >
                {{ honor }}
              </span>
            </div>
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

const educations = ref(props.data.educations || [])

const addEducation = () => {
  const newEducation = {
    id: Date.now(),
    degree: '',
    fieldOfStudy: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: '',
    coursework: [],
    courseworkText: '',
    honors: [],
    honorsText: ''
  }
  educations.value.push(newEducation)
  updateData()
}

const removeEducation = (index) => {
  if (confirm('Are you sure you want to remove this education?')) {
    educations.value.splice(index, 1)
    updateData()
  }
}

const updateEducation = () => {
  updateData()
}

const updateCoursework = (index, event) => {
  const courseworkText = event.target.value
  const coursework = courseworkText
    .split(',')
    .map(course => course.trim())
    .filter(course => course.length > 0)
  
  educations.value[index].coursework = coursework
  educations.value[index].courseworkText = courseworkText
  updateData()
}

const updateHonors = (index, event) => {
  const honorsText = event.target.value
  const honors = honorsText
    .split(',')
    .map(honor => honor.trim())
    .filter(honor => honor.length > 0)
  
  educations.value[index].honors = honors
  educations.value[index].honorsText = honorsText
  updateData()
}

const updateData = () => {
  emit('update', { educations: educations.value })
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

// Watch for external data changes
watch(() => props.data.educations, (newEducations) => {
  educations.value = newEducations || []
}, { deep: true })

// Initialize text fields for existing educations
watch(educations, () => {
  educations.value.forEach(edu => {
    if (edu.coursework && !edu.courseworkText) {
      edu.courseworkText = edu.coursework.join(', ')
    }
    if (edu.honors && !edu.honorsText) {
      edu.honorsText = edu.honors.join(', ')
    }
  })
}, { immediate: true, deep: true })
</script>

<style scoped>
.education-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.education-display {
  transition: all 0.2s ease;
}

.education-display:hover {
  background-color: #f9fafb;
  padding: 1rem;
  margin: -1rem;
  border-radius: 0.5rem;
}
</style>
