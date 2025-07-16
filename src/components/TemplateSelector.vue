<template>
  <div class="space-y-6">
    <!-- Template Categories -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="category in templateCategories"
        :key="category.id"
        @click="selectedCategory = category.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
          selectedCategory === category.id
            ? 'text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
        :style="selectedCategory === category.id ? 'background-color: #0F172A;' : ''"
      >
        {{ category.name }} ({{ category.count }})
      </button>
    </div>

    <!-- Template Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="template in filteredTemplates"
        :key="template.id"
        class="bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        :class="selectedTemplate?.id === template.id ? 'border-blue-500' : 'border-gray-200'"
        @click="selectTemplate(template)"
      >
        <!-- Template Preview -->
        <div class="h-48 bg-gray-100 flex items-center justify-center relative">
          <div class="text-center">
            <div 
              class="w-16 h-20 rounded shadow-md mx-auto mb-2"
              :style="{ backgroundColor: template.colors.primary }"
            ></div>
            <p class="text-sm text-gray-600">{{ template.name }}</p>
          </div>
          
          <!-- Free Badge -->
          <div class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            FREE
          </div>
        </div>

        <!-- Template Info -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-semibold text-gray-900">{{ template.name }}</h3>
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {{ template.category }}
            </span>
          </div>
          
          <p class="text-sm text-gray-600 mb-3">{{ template.description }}</p>
          
          <!-- Features -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="feature in template.features"
              :key="feature"
              class="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
            >
              {{ feature }}
            </span>
          </div>
          
          <!-- Color Scheme -->
          <div class="flex items-center justify-between">
            <div class="flex space-x-1">
              <div
                class="w-4 h-4 rounded-full border border-gray-300"
                :style="{ backgroundColor: template.colors.primary }"
              ></div>
              <div
                class="w-4 h-4 rounded-full border border-gray-300"
                :style="{ backgroundColor: template.colors.secondary }"
              ></div>
              <div
                class="w-4 h-4 rounded-full border border-gray-300"
                :style="{ backgroundColor: template.colors.accent }"
              ></div>
            </div>
            
            <button
              v-if="selectedTemplate?.id === template.id"
              @click.stop="useTemplate"
              class="px-3 py-1 text-white text-xs font-medium rounded hover:opacity-90 transition-colors"
              style="background-color: #0F172A;"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Template Customization -->
    <div v-if="selectedTemplate" class="bg-white border border-gray-200 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Customize Template</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Color Scheme -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Color Scheme</label>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="scheme in colorSchemes"
              :key="scheme.id"
              @click="selectedColorScheme = scheme"
              class="p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
              :class="selectedColorScheme?.id === scheme.id ? 'border-blue-500' : 'border-gray-200'"
            >
              <div class="flex items-center space-x-2">
                <div class="flex space-x-1">
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: scheme.primary }"></div>
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: scheme.secondary }"></div>
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: scheme.accent }"></div>
                </div>
                <span class="text-sm font-medium">{{ scheme.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Font Combination -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
          <div class="space-y-2">
            <div
              v-for="font in fontCombinations"
              :key="font.id"
              @click="selectedFont = font"
              class="p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
              :class="selectedFont?.id === font.id ? 'border-blue-500' : 'border-gray-200'"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">{{ font.name }}</span>
                <span class="text-xs text-gray-500">{{ font.heading }}/{{ font.body }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="applyCustomization"
          class="px-6 py-2 text-white font-medium rounded-lg hover:opacity-90 transition-colors"
          style="background-color: #0F172A;"
        >
          Apply Customization
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  freeTemplates, 
  templateCategories, 
  colorSchemes, 
  fontCombinations 
} from '@/data/templates'

const selectedCategory = ref('all')
const selectedTemplate = ref(null)
const selectedColorScheme = ref(null)
const selectedFont = ref(null)

const emit = defineEmits(['template-selected', 'template-applied'])

const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') {
    return freeTemplates
  }
  return freeTemplates.filter(template => 
    template.category.toLowerCase() === selectedCategory.value.replace('-', ' ')
  )
})

const selectTemplate = (template) => {
  selectedTemplate.value = template
  selectedColorScheme.value = colorSchemes.find(scheme => 
    scheme.primary === template.colors.primary
  ) || colorSchemes[0]
  selectedFont.value = fontCombinations.find(font => 
    font.heading === template.fonts.heading
  ) || fontCombinations[0]
  
  emit('template-selected', template)
}

const useTemplate = () => {
  if (selectedTemplate.value) {
    emit('template-applied', {
      template: selectedTemplate.value,
      colorScheme: selectedColorScheme.value,
      font: selectedFont.value
    })
  }
}

const applyCustomization = () => {
  if (selectedTemplate.value) {
    const customizedTemplate = {
      ...selectedTemplate.value,
      colors: {
        primary: selectedColorScheme.value.primary,
        secondary: selectedColorScheme.value.secondary,
        accent: selectedColorScheme.value.accent
      },
      fonts: {
        heading: selectedFont.value.heading,
        body: selectedFont.value.body
      }
    }
    
    emit('template-applied', {
      template: customizedTemplate,
      colorScheme: selectedColorScheme.value,
      font: selectedFont.value
    })
  }
}

onMounted(() => {
  // Auto-select first template
  if (freeTemplates.length > 0) {
    selectTemplate(freeTemplates[0])
  }
})
</script>

<style scoped>
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
