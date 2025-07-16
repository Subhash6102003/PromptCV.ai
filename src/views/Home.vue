<template>
  <div class="min-h-screen" style="background-color: #FFFFFF;">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div class="text-center">
          <h1 class="text-4xl sm:text-6xl font-bold mb-6" style="color: #0F172A;">
            PromptCV.ai
          </h1>
          <p class="text-2xl font-semibold mb-4" style="color: #0F172A;">
            Your professional story, AI‑optimized.
          </p>
          <p class="text-xl mb-8 max-w-3xl mx-auto" style="color: #0F172A;">
            Weave your perfect CV with intelligence. Streamline your path from skills to success. Forge your future with AI. Apply smarter, not harder.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link 
              to="/login"
              class="text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2"
              style="background-color: #0F172A; border-color: #0F172A;"
            >
              Get Started Free
            </router-link>
            <button 
              @click="scrollToFeatures"
              class="px-8 py-3 rounded-lg font-semibold hover:text-white transition-all duration-300 shadow-md hover:shadow-lg border-2"
              style="color: #0F172A; border-color: #0F172A; background-color: #FFFFFF;"
              @mouseover="$event.target.style.backgroundColor = '#0F172A'"
              @mouseleave="$event.target.style.backgroundColor = '#FFFFFF'"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div ref="featuresSection" class="py-20" style="background-color: #0F172A;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">
            Powerful Features for Modern Job Seekers
          </h2>
          <p class="text-lg text-white">
            Everything you need to create a standout resume
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white rounded-lg hover:opacity-90 transition-opacity">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #0F172A;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" style="color: #0F172A;">AI-Powered Content</h3>
            <p style="color: #0F172A;">
              Generate compelling summaries, job descriptions, and achievements with advanced AI technology.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg hover:opacity-90 transition-opacity">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #0F172A;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" style="color: #0F172A;">Auto-Sync Profiles</h3>
            <p style="color: #0F172A;">
              Automatically import your professional data from LinkedIn and project details from GitHub.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg hover:opacity-90 transition-opacity">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #0F172A;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" style="color: #0F172A;">Professional Templates</h3>
            <p style="color: #0F172A;">
              Choose from beautifully designed templates that are optimized for ATS systems.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg hover:opacity-90 transition-opacity">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #0F172A;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" style="color: #0F172A;">Live Preview</h3>
            <p style="color: #0F172A;">
              See your changes in real-time as you build and edit your resume with instant preview.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg hover:opacity-90 transition-opacity">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #0F172A;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" style="color: #0F172A;">PDF Export</h3>
            <p style="color: #0F172A;">
              Download your resume as a high-quality PDF ready for job applications.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-lg hover:opacity-90 transition-opacity">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #0F172A;">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2" style="color: #0F172A;">ATS Optimized</h3>
            <p style="color: #0F172A;">
              All templates are designed to pass through Applicant Tracking Systems successfully.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20" style="background-color: #FFFFFF;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-5xl font-black mb-6 drop-shadow-lg" style="color: #0F172A;">
          Ready to Build Your AI-Powered Resume?
        </h2>
        <p class="text-xl mb-10 max-w-2xl mx-auto font-medium drop-shadow-md" style="color: #0F172A;">
          Join thousands of job seekers who have successfully landed their dream jobs with our AI-powered resume builder.
        </p>
        <router-link 
          to="/login"
          class="text-white px-12 py-5 rounded-xl font-black text-xl hover:opacity-80 transition-all duration-300 inline-block shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border-4"
          style="background-color: #0F172A; border-color: #0F172A;"
        >
          Start Building Now
        </router-link>
        <div class="mt-8 text-base font-semibold drop-shadow-md" style="color: #0F172A;">
          ✨ No credit card required • Get started in 30 seconds
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const featuresSection = ref(null)

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>
