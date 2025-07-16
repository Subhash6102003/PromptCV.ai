<template>
  <div class="min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold p-8">Testing Resume Sections</h1>
    
    <!-- Test Header Section -->
    <div class="max-w-4xl mx-auto p-4">
      <HeaderSection 
        :data="headerData"
        :editable="true"
        @update="updateSection('header', $event)"
      />
      
      <hr class="my-8">
      
      <!-- Test Summary Section -->
      <SummarySection 
        :data="summaryData"
        :editable="true"
        @update="updateSection('summary', $event)"
      />
      
      <hr class="my-8">
      
      <!-- Test Experience Section -->
      <ExperienceSection 
        :data="experienceData"
        :editable="true"
        @update="updateSection('experience', $event)"
      />
      
      <hr class="my-8">
      
      <!-- Test Skills Section -->
      <SkillsSection 
        :data="skillsData"
        :editable="true"
        @update="updateSection('skills', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderSection from '@/components/sections/HeaderSection.vue'
import SummarySection from '@/components/sections/SummarySection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'

const headerData = ref({
  name: 'Header',
  fullName: 'John Doe',
  title: 'Software Engineer',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA'
})

const summaryData = ref({
  name: 'Professional Summary',
  content: 'Experienced software engineer with 5+ years developing web applications.'
})

const experienceData = ref({
  name: 'Professional Experience',
  experiences: [
    {
      id: 1,
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '2024-12',
      current: true,
      description: '• Led development of microservices architecture\n• Mentored junior developers\n• Improved system performance by 40%'
    }
  ]
})

const skillsData = ref({
  name: 'Skills',
  skillCategories: [
    {
      id: 1,
      name: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 'expert' },
        { name: 'Python', level: 'advanced' },
        { name: 'TypeScript', level: 'advanced' }
      ]
    }
  ]
})

const updateSection = (sectionType, data) => {
  console.log(`Updated ${sectionType}:`, data)
}
</script>
