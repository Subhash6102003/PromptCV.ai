<template>
  <div class="resume-features-panel" style="background-color: #FFFFFF; border-left: 2px solid #0F172A; height: 100vh; overflow-y: auto;">
    <!-- Header -->
    <div class="features-header p-4" style="background-color: #0F172A; color: #FFFFFF;">
      <h3 class="text-lg font-semibold">PromptCV.ai Features</h3>
      <p class="text-sm opacity-90">All tools in one place</p>
    </div>

    <!-- All Features as Buttons -->
    <div class="features-content p-4 space-y-3">
      
      <!-- LinkedIn Import Button -->
      <button 
        @click="activeFeature = activeFeature === 'linkedin' ? null : 'linkedin'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('linkedin')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'linkedin' ? '#FFFFFF' : '#0F172A' }" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Import LinkedIn</div>
            <div class="text-xs opacity-75">Upload PDF profile</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'linkedin' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- GitHub Import Button -->
      <button 
        @click="activeFeature = activeFeature === 'github' ? null : 'github'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('github')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'github' ? '#FFFFFF' : '#0F172A' }" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Connect GitHub</div>
            <div class="text-xs opacity-75">Import repositories</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'github' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Add Section Button -->
      <button 
        @click="activeFeature = activeFeature === 'addSection' ? null : 'addSection'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('addSection')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'addSection' ? '#FFFFFF' : '#0F172A' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Add Section</div>
            <div class="text-xs opacity-75">Customize your resume</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'addSection' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Rearrange Button -->
      <button 
        @click="activeFeature = activeFeature === 'rearrange' ? null : 'rearrange'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('rearrange')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'rearrange' ? '#FFFFFF' : '#0F172A' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Rearrange</div>
            <div class="text-xs opacity-75">Reorder sections</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'rearrange' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Templates Button -->
      <button 
        @click="activeFeature = activeFeature === 'templates' ? null : 'templates'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('templates')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'templates' ? '#FFFFFF' : '#0F172A' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Templates</div>
            <div class="text-xs opacity-75">Choose design</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'templates' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Design & Font Button -->
      <button 
        @click="activeFeature = activeFeature === 'design' ? null : 'design'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('design')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'design' ? '#FFFFFF' : '#0F172A' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 3v18m-6-6v6" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Design & Font</div>
            <div class="text-xs opacity-75">Styling options</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'design' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- Improve Text Button -->
      <button 
        @click="activeFeature = activeFeature === 'improve' ? null : 'improve'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('improve')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'improve' ? '#FFFFFF' : '#0F172A' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">Improve Text</div>
            <div class="text-xs opacity-75">AI enhancement</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'improve' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <!-- ATS Checker Button -->
      <button 
        @click="activeFeature = activeFeature === 'ats' ? null : 'ats'"
        class="w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 border-2 hover:shadow-lg"
        :style="getButtonStyle('ats')"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background-color: rgba(15, 23, 42, 0.1);">
            <svg class="w-5 h-5" :style="{ color: activeFeature === 'ats' ? '#FFFFFF' : '#0F172A' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-left">
            <div class="font-semibold text-sm">ATS Checker</div>
            <div class="text-xs opacity-75">Compatibility scan</div>
          </div>
        </div>
        <svg class="w-4 h-4 transform transition-transform" :class="{ 'rotate-180': activeFeature === 'ats' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

    </div>

    <!-- Feature Content Area -->
    <div v-if="activeFeature" class="feature-details" style="background-color: #F8FAFC; border-top: 2px solid #0F172A; max-height: 50vh; overflow-y: auto;">
      
      <!-- LinkedIn Import Content -->
      <div v-if="activeFeature === 'linkedin'" class="p-4">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Import from LinkedIn</h4>
        <LinkedInUpload @data-extracted="handleLinkedInData" />
      </div>

      <!-- GitHub Connect Content -->
      <div v-if="activeFeature === 'github'" class="p-4">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Connect GitHub Profile</h4>
        <GitHubConnect @data-extracted="handleGitHubData" />
      </div>

      <!-- Add Section Content -->
      <div v-if="activeFeature === 'addSection'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Available Sections</h4>
        <div v-for="section in availableSections" :key="section.id" 
             @click="addSection(section)" 
             class="p-3 rounded-lg cursor-pointer transition-colors border hover:shadow-md"
             style="border-color: #E2E8F0; background-color: #FFFFFF;"
             @mouseover="$event.target.style.backgroundColor = '#F1F5F9'"
             @mouseleave="$event.target.style.backgroundColor = '#FFFFFF'">
          <div class="font-medium text-sm" style="color: #0F172A;">{{ section.name }}</div>
          <div class="text-xs text-gray-600">{{ section.description }}</div>
        </div>
      </div>

      <!-- Templates Content -->
      <div v-if="activeFeature === 'templates'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Choose Template</h4>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="template in templates" :key="template.id" 
               @click="applyTemplate(template)" 
               class="p-3 rounded-lg cursor-pointer transition-all border hover:shadow-md relative"
               style="border-color: #E2E8F0; background-color: #FFFFFF;">
            <div class="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
              <span class="text-xs text-gray-500">{{ template.name }}</span>
            </div>
            <div class="font-medium text-xs text-center" style="color: #0F172A;">{{ template.name }}</div>
            <div v-if="template.isPremium" class="absolute top-2 right-2">
              <span class="px-1 py-0.5 text-xs rounded text-white" style="background-color: #0F172A;">PRO</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Improve Text Content -->
      <div v-if="activeFeature === 'improve'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">AI Text Enhancement</h4>
        <textarea 
          v-model="textToImprove" 
          placeholder="Paste text to improve..."
          class="w-full p-3 border rounded-lg text-sm"
          style="border-color: #E2E8F0; min-height: 80px;"
        ></textarea>
        <div class="grid grid-cols-2 gap-2">
          <button @click="improveText('professional')" class="p-2 text-xs rounded border hover:opacity-80" style="border-color: #0F172A; color: #0F172A;">Professional</button>
          <button @click="improveText('concise')" class="p-2 text-xs rounded border hover:opacity-80" style="border-color: #0F172A; color: #0F172A;">Concise</button>
          <button @click="improveText('achievements')" class="p-2 text-xs rounded border hover:opacity-80" style="border-color: #0F172A; color: #0F172A;">Achievements</button>
          <button @click="improveText('keywords')" class="p-2 text-xs rounded border hover:opacity-80" style="border-color: #0F172A; color: #0F172A;">Keywords</button>
        </div>
        <div v-if="improvedText" class="mt-3 p-3 rounded-lg" style="background-color: #F1F5F9; border: 1px solid #E2E8F0;">
          <div class="text-xs font-medium mb-2" style="color: #0F172A;">Improved Text:</div>
          <div class="text-xs text-gray-700">{{ improvedText }}</div>
          <button @click="copyImprovedText" class="mt-2 px-3 py-1 text-xs rounded hover:opacity-80" style="background-color: #0F172A; color: #FFFFFF;">Copy</button>
        </div>
      </div>

      <!-- ATS Checker Content -->
      <div v-if="activeFeature === 'ats'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">ATS Compatibility</h4>
        <button @click="runATSCheck" class="w-full p-3 rounded-lg font-medium hover:opacity-80" style="background-color: #0F172A; color: #FFFFFF;">
          Scan Resume
        </button>
        <div v-if="atsScore !== null" class="space-y-3">
          <div class="text-center p-4 rounded-lg" style="background-color: #F1F5F9;">
            <div class="text-2xl font-bold" style="color: #0F172A;">{{ atsScore }}%</div>
            <div class="text-xs text-gray-600">ATS Score</div>
          </div>
        </div>
      </div>

      <!-- Download Content -->
      <div v-if="activeFeature === 'download'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Export Formats</h4>
        <div v-for="format in downloadFormats" :key="format.id" 
             @click="downloadResume(format)" 
             class="p-3 rounded-lg cursor-pointer transition-colors border hover:shadow-md flex items-center justify-between"
             style="border-color: #E2E8F0; background-color: #FFFFFF;">
          <div>
            <div class="font-medium text-sm" style="color: #0F172A;">{{ format.name }}</div>
            <div class="text-xs text-gray-600">{{ format.description }}</div>
          </div>
          <div v-if="format.recommended" class="px-2 py-1 text-xs rounded text-white" style="background-color: #0F172A;">
            Best
          </div>
        </div>
      </div>

      <!-- Share Content -->
      <div v-if="activeFeature === 'share'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Share Resume</h4>
        <button @click="createShareLink" class="w-full p-3 rounded-lg font-medium hover:opacity-80" style="background-color: #0F172A; color: #FFFFFF;">
          Generate Link
        </button>
        <div v-if="shareLink" class="p-3 rounded-lg" style="background-color: #F1F5F9; border: 1px solid #E2E8F0;">
          <div class="text-xs font-medium mb-2" style="color: #0F172A;">Share URL:</div>
          <div class="flex items-center space-x-2">
            <input v-model="shareLink" readonly class="flex-1 p-2 text-xs border rounded" style="border-color: #E2E8F0;">
            <button @click="copyShareLink" class="px-3 py-2 text-xs rounded hover:opacity-80" style="background-color: #0F172A; color: #FFFFFF;">Copy</button>
          </div>
        </div>
      </div>

      <!-- History Content -->
      <div v-if="activeFeature === 'history'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Version History</h4>
        <div v-for="version in versionHistory.slice(0, 3)" :key="version.id" 
             class="p-3 rounded-lg border cursor-pointer hover:shadow-md"
             style="border-color: #E2E8F0; background-color: #FFFFFF;"
             @click="restoreVersion(version)">
          <div class="flex items-center justify-between">
            <div class="font-medium text-xs" style="color: #0F172A;">{{ version.title }}</div>
            <div class="text-xs text-gray-500">{{ formatDate(version.createdAt) }}</div>
          </div>
          <div v-if="version.isCurrent" class="mt-2">
            <span class="px-2 py-1 text-xs rounded text-white" style="background-color: #0F172A;">Current</span>
          </div>
        </div>
      </div>

      <!-- Branding Content -->
      <div v-if="activeFeature === 'branding'" class="p-4 space-y-3">
        <h4 class="font-semibold text-sm mb-3" style="color: #0F172A;">Custom Branding</h4>
        <div class="text-xs text-gray-600 mb-3">Customize your resume appearance</div>
        <button class="w-full p-3 rounded-lg font-medium border hover:opacity-80" style="border-color: #0F172A; color: #0F172A; background-color: #FFFFFF;">
          Upgrade to Pro
        </button>
        <div class="text-xs text-gray-500">Pro: Custom logo, colors, remove watermark</div>
      </div>

    </div>

    <!-- Template Selector Modal -->
    <TemplateSelector v-if="showTemplateModal" 
                      @close="showTemplateModal = false" 
                      @template-applied="handleTemplateApplied" 
                      :selected-template="selectedTemplate"
                      :selected-color="selectedColor"
                      :selected-font="selectedFont"
    />

    <!-- Import Features Component -->
    <ImportFeatures v-if="activeFeature === 'import'" @data-imported="handleDataImported" />
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import LinkedInUpload from './LinkedInUpload.vue'
import GitHubConnect from './GitHubConnect.vue'
import ImportFeatures from './ImportFeatures.vue'
import TemplateSelector from './TemplateSelector.vue'
import { freeTemplates, colorSchemes, fontCombinations } from '@/data/templates'

// Emits
const emit = defineEmits(['data-extracted', 'section-added', 'template-changed'])

// Reactive state
const activeFeature = ref(null)
const textToImprove = ref('')
const improvedText = ref('')
const atsScore = ref(null)
const shareLink = ref('')
const showTemplateModal = ref(false)
const selectedTemplate = ref('modern-minimal')
const selectedColor = ref('professional-blue')
const selectedFont = ref('modern-inter')

// Mock data for sections
const availableSections = [
  { id: 'projects', name: 'Projects', description: 'Showcase your work', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'certifications', name: 'Certifications', description: 'Professional credentials', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { id: 'languages', name: 'Languages', description: 'Language proficiency', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
  { id: 'awards', name: 'Awards', description: 'Recognition and honors', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' }
]

// Mock data for templates
const templates = ref([
  { id: 'professional', name: 'Professional', isPremium: false },
  { id: 'modern', name: 'Modern', isPremium: false },
  { id: 'creative', name: 'Creative', isPremium: true },
  { id: 'minimal', name: 'Minimal', isPremium: false },
  { id: 'executive', name: 'Executive', isPremium: true },
  { id: 'academic', name: 'Academic', isPremium: true }
])

// Mock data for download formats
const downloadFormats = ref([
  { id: 'pdf', name: 'PDF', description: 'Standard PDF format', recommended: true },
  { id: 'docx', name: 'Word Document', description: 'Microsoft Word format', recommended: false },
  { id: 'html', name: 'HTML', description: 'Web-ready format', recommended: false },
  { id: 'png', name: 'Image', description: 'High-quality image', recommended: false }
])

// Mock data for version history
const versionHistory = ref([
  { id: 1, title: 'Current Version', createdAt: new Date(), isCurrent: true },
  { id: 2, title: 'Before ATS optimization', createdAt: new Date(Date.now() - 86400000), isCurrent: false },
  { id: 3, title: 'Original draft', createdAt: new Date(Date.now() - 172800000), isCurrent: false }
])

// Methods
const getButtonStyle = (featureName) => {
  if (activeFeature.value === featureName) {
    return {
      backgroundColor: '#0F172A',
      color: '#FFFFFF',
      borderColor: '#0F172A'
    }
  }
  return {
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    borderColor: '#E2E8F0'
  }
}

const addSection = (section) => {
  emit('section-added', section.id)
}

const applyTemplate = async (template) => {
  try {
    const response = await fetch('/api/templates/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ templateId: template.id })
    })
    const result = await response.json()
    console.log('Template applied:', result)
  } catch (error) {
    console.error('Error applying template:', error)
  }
}

const improveText = async (type) => {
  if (!textToImprove.value.trim()) return
  
  try {
    const response = await fetch('/api/improve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: textToImprove.value,
        type: type
      })
    })
    const result = await response.json()
    improvedText.value = result.improvedText
  } catch (error) {
    console.error('Error improving text:', error)
  }
}

const copyImprovedText = () => {
  navigator.clipboard.writeText(improvedText.value)
  // Show toast notification
}

const runATSCheck = async () => {
  try {
    const response = await fetch('/api/ats/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    atsScore.value = result.score
  } catch (error) {
    console.error('Error running ATS check:', error)
  }
}

const downloadResume = async (format) => {
  try {
    const response = await fetch(`/api/download/${format.id}`, {
      method: 'POST'
    })
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume.${format.id}`
    a.click()
  } catch (error) {
    console.error('Error downloading resume:', error)
  }
}

const createShareLink = async () => {
  try {
    const response = await fetch('/api/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()
    shareLink.value = result.shareUrl
  } catch (error) {
    console.error('Error creating share link:', error)
  }
}

const copyShareLink = () => {
  navigator.clipboard.writeText(shareLink.value)
  // Show toast notification
}

const restoreVersion = async (version) => {
  try {
    const response = await fetch(`/api/history/restore/${version.id}`, {
      method: 'POST'
    })
    const result = await response.json()
    console.log('Version restored:', result)
  } catch (error) {
    console.error('Error restoring version:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

// LinkedIn and GitHub data handlers
const handleLinkedInData = async (linkedinData) => {
  try {
    console.log('LinkedIn data received:', linkedinData)
    
    // Apply the extracted data to the resume
    const response = await fetch('/api/resume/apply-linkedin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: linkedinData })
    })
    
    if (response.ok) {
      // Close the LinkedIn panel and show success message
      activeFeature.value = null
      // You could emit an event here to update the parent component
      console.log('LinkedIn data applied successfully')
    }
  } catch (error) {
    console.error('Error applying LinkedIn data:', error)
  }
}

const handleGitHubData = async (githubData) => {
  try {
    console.log('GitHub data received:', githubData)
    
    // Apply the GitHub data to the resume
    const response = await fetch('/api/resume/apply-github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: githubData })
    })
    
    if (response.ok) {
      // Close the GitHub panel and show success message
      activeFeature.value = null
      // You could emit an event here to update the parent component
      console.log('GitHub data applied successfully')
    }
  } catch (error) {
    console.error('Error applying GitHub data:', error)
  }
}

// New methods for template selection and import features
const handleDataImported = (data) => {
  console.log('Data imported:', data)
  emit('data-extracted', data)
}

const selectTemplate = (template) => {
  selectedTemplate.value = template.id
  emit('template-changed', template)
}

const showAllTemplates = () => {
  showTemplateModal.value = true
}

const handleTemplateApplied = (templateData) => {
  selectedTemplate.value = templateData.template.id
  selectedColor.value = templateData.colorScheme.id
  selectedFont.value = templateData.font.id
  showTemplateModal.value = false
  
  emit('template-changed', templateData)
}
</script>

<style scoped>
.resume-features-panel {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.features-content button:hover {
  transform: translateY(-1px);
}

.feature-details {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
