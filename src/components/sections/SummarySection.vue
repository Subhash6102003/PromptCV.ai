<template>
  <div class="resume-section-summary p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ data.name || 'Professional Summary' }}</h2>
      <div v-if="editable" class="flex items-center space-x-2">
        <button 
          @click="improveWithAI"
          :disabled="isImproving"
          class="px-3 py-1 text-white text-xs rounded hover:opacity-90 disabled:opacity-50 transition-colors"
          style="background-color: #0F172A;"
        >
          <svg v-if="isImproving" class="animate-spin -ml-1 mr-2 h-3 w-3 text-white inline" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isImproving ? 'Improving...' : 'AI Improve' }}
        </button>
        <span class="text-sm text-gray-500">{{ charCount }}/500</span>
      </div>
    </div>
    
    <div class="space-y-3">
      <div v-if="!editable" class="text-gray-700 leading-relaxed whitespace-pre-line">
        {{ data.content || 'Professional summary will appear here.' }}
      </div>
      
      <div v-else>
        <textarea
          v-model="localContent"
          @input="updateContent"
          placeholder="Write a compelling professional summary that highlights your key strengths, achievements, and career objectives. Focus on what makes you unique and valuable to potential employers."
          rows="6"
          maxlength="500"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 leading-relaxed"
        ></textarea>
        
        <!-- AI Suggestions -->
        <div v-if="aiSuggestions.length > 0" class="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h4 class="text-sm font-semibold text-blue-800 mb-2">AI Suggestions:</h4>
          <div class="space-y-2">
            <div 
              v-for="(suggestion, index) in aiSuggestions" 
              :key="index"
              class="p-2 bg-white rounded border cursor-pointer hover:bg-blue-50 transition-colors text-sm"
              @click="applySuggestion(suggestion)"
            >
              {{ suggestion }}
            </div>
          </div>
        </div>
        
        <!-- Quick Templates -->
        <div class="mt-3">
          <details class="group">
            <summary class="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
              📝 Quick Templates
            </summary>
            <div class="mt-2 space-y-2 text-sm">
              <div 
                v-for="template in templates" 
                :key="template.name"
                class="p-3 bg-gray-50 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                @click="applyTemplate(template.content)"
              >
                <div class="font-medium text-gray-800">{{ template.name }}</div>
                <div class="text-gray-600 text-xs mt-1">{{ template.description }}</div>
              </div>
            </div>
          </details>
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

const localContent = ref(props.data.content || '')
const isImproving = ref(false)
const aiSuggestions = ref([])

const charCount = computed(() => localContent.value.length)

const templates = [
  {
    name: 'Executive Professional',
    description: 'For senior leadership roles',
    content: 'Results-driven executive with [X] years of experience leading high-performing teams and driving strategic initiatives. Proven track record of [specific achievement] and expertise in [key areas]. Passionate about [industry/mission] and committed to delivering exceptional results through innovative solutions and collaborative leadership.'
  },
  {
    name: 'Technical Professional',
    description: 'For software developers and engineers',
    content: 'Innovative software engineer with [X] years of experience developing scalable applications and solving complex technical challenges. Proficient in [technologies/languages] with a strong foundation in [specific areas]. Committed to writing clean, efficient code and staying current with emerging technologies.'
  },
  {
    name: 'Creative Professional',
    description: 'For designers and creative roles',
    content: 'Creative professional with [X] years of experience bringing innovative ideas to life through compelling design and strategic thinking. Skilled in [tools/mediums] with a passion for [specific area]. Proven ability to collaborate with cross-functional teams to deliver impactful creative solutions.'
  },
  {
    name: 'Recent Graduate',
    description: 'For new graduates and entry-level',
    content: 'Recent [degree] graduate with a strong academic foundation in [field] and hands-on experience through [internships/projects]. Passionate about [industry/area] with demonstrated skills in [relevant skills]. Eager to contribute fresh perspectives and grow within a dynamic organization.'
  }
]

const updateContent = () => {
  emit('update', { content: localContent.value })
}

const improveWithAI = async () => {
  if (!localContent.value.trim()) {
    alert('Please write some content first, then I can help improve it!')
    return
  }
  
  isImproving.value = true
  aiSuggestions.value = []
  
  try {
    // Simulate AI improvement suggestions
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    aiSuggestions.value = [
      'Consider adding specific metrics or achievements to quantify your impact',
      'Include industry-specific keywords that align with your target role',
      'Emphasize your unique value proposition and what sets you apart',
      'Add a brief mention of your career goals or aspirations'
    ]
  } catch (error) {
    console.error('AI improvement error:', error)
    alert('Sorry, AI improvement is temporarily unavailable. Please try again later.')
  } finally {
    isImproving.value = false
  }
}

const applySuggestion = (suggestion) => {
  // This would typically integrate with an AI service to apply the suggestion
  alert(`AI Suggestion: ${suggestion}\n\nThis would apply the suggested improvement to your summary.`)
}

const applyTemplate = (templateContent) => {
  if (localContent.value && !confirm('This will replace your current content. Continue?')) {
    return
  }
  
  localContent.value = templateContent
  updateContent()
}

// Watch for external data changes
watch(() => props.data.content, (newContent) => {
  localContent.value = newContent || ''
})
</script>

<style scoped>
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

details[open] summary {
  margin-bottom: 8px;
}
</style>
