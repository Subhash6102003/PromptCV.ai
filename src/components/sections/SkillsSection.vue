<template>
  <div class="resume-section-skills p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ data.name || 'Skills' }}</h2>
      <div v-if="editable" class="flex items-center space-x-2">
        <button 
          @click="addSkillCategory"
          class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
        >
          + Add Category
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
      <div v-if="!editable && (!skillCategories || skillCategories.length === 0)" class="text-gray-500 text-center py-8">
        No skills added yet.
      </div>
      
      <!-- Skills Display Mode -->
      <div v-if="!editable" class="space-y-4">
        <div v-for="category in skillCategories" :key="category.id" class="skill-category">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ category.name }}</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in category.skills" 
              :key="skill.name"
              :class="getSkillBadgeClass(skill.level)"
              class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            >
              {{ skill.name }}
              <span v-if="skill.level && showLevels" class="ml-1 text-xs opacity-75">
                {{ getSkillLevelText(skill.level) }}
              </span>
            </span>
          </div>
        </div>
      </div>
      
      <!-- Skills Edit Mode -->
      <div v-else class="space-y-6">
        <div v-for="(category, index) in skillCategories" :key="category.id" class="skill-category-edit border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Category {{ index + 1 }}</h3>
            <button 
              @click="removeSkillCategory(index)"
              class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <select
              v-model="category.name"
              @change="updateSkills"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Programming Languages">Programming Languages</option>
              <option value="Frameworks & Libraries">Frameworks & Libraries</option>
              <option value="Databases">Databases</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
              <option value="Tools & Technologies">Tools & Technologies</option>
              <option value="Design & Creative">Design & Creative</option>
              <option value="Business & Analytics">Business & Analytics</option>
              <option value="Languages">Languages</option>
              <option value="Certifications">Certifications</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Other">Other</option>
            </select>
            <input
              v-if="category.name === 'Other'"
              v-model="category.customName"
              @input="updateCustomCategoryName(index, $event)"
              type="text"
              placeholder="Enter custom category name"
              class="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <div class="space-y-2">
              <div v-for="(skill, skillIndex) in category.skills" :key="skillIndex" class="flex items-center space-x-2">
                <input
                  v-model="skill.name"
                  @input="updateSkills"
                  type="text"
                  placeholder="Enter skill name"
                  class="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <select
                  v-model="skill.level"
                  @change="updateSkills"
                  class="w-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button 
                  @click="removeSkill(index, skillIndex)"
                  class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
              <button 
                @click="addSkill(index)"
                class="w-full py-2 border border-dashed border-gray-300 rounded text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
              >
                + Add Skill
              </button>
            </div>
          </div>
          
          <!-- Quick Add Suggestions -->
          <div v-if="getSkillSuggestions(category.name).length > 0" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Quick Add:</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="suggestion in getSkillSuggestions(category.name)" 
                :key="suggestion"
                @click="addSuggestedSkill(index, suggestion)"
                class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors"
              >
                + {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Display Options -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 class="text-sm font-semibold text-blue-800 mb-2">Display Options</h4>
          <div class="flex items-center space-x-4">
            <label class="flex items-center text-sm text-blue-700">
              <input
                v-model="showLevels"
                @change="updateSkills"
                type="checkbox"
                class="mr-2"
              >
              Show skill levels
            </label>
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

const skillCategories = ref(props.data.skillCategories || [])
const showLevels = ref(props.data.showLevels || false)

const skillSuggestions = {
  'Programming Languages': ['JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'],
  'Frameworks & Libraries': ['React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Rails', 'Next.js', 'Nuxt.js'],
  'Databases': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server', 'Cassandra', 'DynamoDB', 'Firebase'],
  'Cloud & DevOps': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'Terraform', 'Ansible', 'Nginx'],
  'Tools & Technologies': ['Git', 'VS Code', 'Figma', 'Photoshop', 'Sketch', 'InVision', 'Slack', 'Jira', 'Confluence', 'Postman'],
  'Design & Creative': ['UI/UX Design', 'Graphic Design', 'Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'Prototyping', 'Wireframing'],
  'Business & Analytics': ['Project Management', 'Agile', 'Scrum', 'Data Analysis', 'Excel', 'PowerBI', 'Tableau', 'Google Analytics', 'SQL'],
  'Languages': ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian'],
  'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity']
}

const addSkillCategory = () => {
  const newCategory = {
    id: Date.now(),
    name: '',
    customName: '',
    skills: [{ name: '', level: '' }]
  }
  skillCategories.value.push(newCategory)
  updateSkills()
}

const removeSkillCategory = (index) => {
  if (confirm('Are you sure you want to remove this skill category?')) {
    skillCategories.value.splice(index, 1)
    updateSkills()
  }
}

const addSkill = (categoryIndex) => {
  skillCategories.value[categoryIndex].skills.push({ name: '', level: '' })
  updateSkills()
}

const removeSkill = (categoryIndex, skillIndex) => {
  skillCategories.value[categoryIndex].skills.splice(skillIndex, 1)
  updateSkills()
}

const addSuggestedSkill = (categoryIndex, skillName) => {
  const category = skillCategories.value[categoryIndex]
  const existingSkill = category.skills.find(skill => skill.name.toLowerCase() === skillName.toLowerCase())
  
  if (!existingSkill) {
    category.skills.push({ name: skillName, level: '' })
    updateSkills()
  }
}

const updateCustomCategoryName = (index, event) => {
  skillCategories.value[index].customName = event.target.value
  updateSkills()
}

const updateSkills = () => {
  emit('update', { 
    skillCategories: skillCategories.value,
    showLevels: showLevels.value
  })
}

const getSkillSuggestions = (categoryName) => {
  return skillSuggestions[categoryName] || []
}

const getSkillBadgeClass = (level) => {
  const baseClass = 'inline-block'
  switch (level) {
    case 'expert':
      return `${baseClass} bg-green-600 text-white`
    case 'advanced':
      return `${baseClass} bg-green-500 text-white`
    case 'intermediate':
      return `${baseClass} skill-level-intermediate text-white`
    case 'beginner':
      return `${baseClass} bg-gray-500 text-white`
    default:
      return `${baseClass} bg-gray-200 text-gray-800`
  }
}

const getSkillLevelText = (level) => {
  const levels = {
    'beginner': '●',
    'intermediate': '●●',
    'advanced': '●●●',
    'expert': '●●●●'
  }
  return levels[level] || ''
}

const importFromGitHub = () => {
  alert('GitHub import feature would analyze your repositories to automatically detect programming languages and technologies used.')
}

// Watch for external data changes
watch(() => props.data, (newData) => {
  skillCategories.value = newData.skillCategories || []
  showLevels.value = newData.showLevels || false
}, { deep: true })
</script>

<style scoped>
.skill-category:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.skill-category-edit {
  transition: all 0.2s ease;
}

.skill-category-edit:hover {
  border-color: #d1d5db;
}

/* Custom styling for skill levels using the #0F172A color */
.skill-level-intermediate {
  background-color: #0F172A !important;
}
</style>
