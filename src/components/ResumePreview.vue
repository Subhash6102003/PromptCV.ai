<template>
  <div class="resume-preview" :class="`template-${template}`">
    <!-- Modern Template -->
    <div v-if="template === 'modern'" class="modern-template">
      <!-- Header -->
      <div class="header bg-primary-600 text-white p-6 -m-8 mb-6">
        <h1 class="text-3xl font-bold mb-2">{{ resume.personalInfo.name || 'Your Name' }}</h1>
        <div class="flex flex-wrap gap-4 text-sm">
          <span v-if="resume.personalInfo.email">{{ resume.personalInfo.email }}</span>
          <span v-if="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</span>
          <span v-if="resume.personalInfo.location">{{ resume.personalInfo.location }}</span>
        </div>
        <div class="flex gap-4 mt-2 text-sm">
          <a v-if="resume.personalInfo.linkedin" :href="resume.personalInfo.linkedin" class="underline">
            LinkedIn
          </a>
          <a v-if="resume.personalInfo.github" :href="resume.personalInfo.github" class="underline">
            GitHub
          </a>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="resume.summary" class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          Professional Summary
        </h2>
        <p class="text-gray-700 leading-relaxed">{{ resume.summary }}</p>
      </div>

      <!-- Experience -->
      <div v-if="resume.experience.length > 0" class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          Work Experience
        </h2>
        <div class="space-y-4">
          <div v-for="exp in resume.experience" :key="exp.id" class="mb-4">
            <div class="flex justify-between items-start mb-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ exp.title }}</h3>
              <span class="text-sm text-gray-600">{{ exp.startDate }} - {{ exp.endDate }}</span>
            </div>
            <div class="text-gray-700 font-medium mb-2">{{ exp.company }}</div>
            <p class="text-gray-600 text-sm leading-relaxed">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="resume.skills.length > 0" class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          Skills
        </h2>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="skill in resume.skills" 
            :key="skill"
            class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="resume.projects.length > 0" class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          Projects
        </h2>
        <div class="space-y-3">
          <div v-for="project in resume.projects" :key="project.id">
            <div class="flex justify-between items-start mb-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
              <a v-if="project.url" :href="project.url" class="text-primary-600 text-sm underline">
                View Project
              </a>
            </div>
            <p class="text-gray-600 text-sm mb-2">{{ project.description }}</p>
            <div v-if="project.technologies" class="flex flex-wrap gap-1">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div v-if="resume.education.length > 0">
        <h2 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
          Education
        </h2>
        <div class="space-y-3">
          <div v-for="edu in resume.education" :key="edu.id">
            <div class="flex justify-between items-start mb-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ edu.degree }}</h3>
              <span class="text-sm text-gray-600">{{ edu.year }}</span>
            </div>
            <div class="text-gray-700">{{ edu.school }}</div>
            <div v-if="edu.gpa" class="text-gray-600 text-sm">GPA: {{ edu.gpa }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Classic Template -->
    <div v-else-if="template === 'classic'" class="classic-template">
      <!-- Header -->
      <div class="text-center mb-6 pb-4 border-b-2 border-gray-800">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ resume.personalInfo.name || 'Your Name' }}</h1>
        <div class="text-gray-700">
          <div class="mb-1">
            <span v-if="resume.personalInfo.email">{{ resume.personalInfo.email }}</span>
            <span v-if="resume.personalInfo.email && resume.personalInfo.phone"> | </span>
            <span v-if="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</span>
          </div>
          <div>
            <span v-if="resume.personalInfo.location">{{ resume.personalInfo.location }}</span>
          </div>
        </div>
      </div>

      <!-- Rest of classic template content would go here -->
      <!-- This is a simplified version - you can expand with full classic styling -->
      <div class="text-sm leading-relaxed">
        <p class="text-gray-600">Classic template content...</p>
      </div>
    </div>

    <!-- Minimal Template -->
    <div v-else-if="template === 'minimal'" class="minimal-template">
      <div class="space-y-6">
        <div class="text-left">
          <h1 class="text-2xl font-light text-gray-900 mb-1">{{ resume.personalInfo.name || 'Your Name' }}</h1>
          <div class="text-gray-600 text-sm space-x-2">
            <span v-if="resume.personalInfo.email">{{ resume.personalInfo.email }}</span>
            <span v-if="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</span>
          </div>
        </div>
        
        <!-- Minimal template content -->
        <div class="text-sm leading-relaxed">
          <p class="text-gray-600">Minimal template content...</p>
        </div>
      </div>
    </div>

    <!-- Creative Template -->
    <div v-else-if="template === 'creative'" class="creative-template">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 -m-8 mb-6 rounded-lg">
        <h1 class="text-3xl font-bold mb-2">{{ resume.personalInfo.name || 'Your Name' }}</h1>
        <p class="opacity-90">{{ resume.personalInfo.email }}</p>
      </div>
      
      <!-- Creative template content -->
      <div class="text-sm leading-relaxed">
        <p class="text-gray-600">Creative template content...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  resume: {
    type: Object,
    required: true
  },
  template: {
    type: String,
    default: 'modern'
  }
})
</script>

<style scoped>
.resume-preview {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  color: #374151;
}

.modern-template .header {
  margin-left: -2rem;
  margin-right: -2rem;
  margin-top: -2rem;
  margin-bottom: 1.5rem;
}

@media print {
  .resume-preview {
    font-size: 11px;
  }
  
  .modern-template .header {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}</style>
