<template>
  <div class="resume-section-certifications p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ data.name || 'Certifications' }}</h2>
      <div v-if="editable" class="flex items-center space-x-2">
        <button 
          @click="addCertification"
          class="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
        >
          + Add Certification
        </button>
        <button 
          @click="browseCertifications"
          class="px-3 py-1 text-white text-xs rounded hover:opacity-90 transition-colors"
          style="background-color: #0F172A;"
        >
          Browse Popular
        </button>
      </div>
    </div>
    
    <div class="space-y-4">
      <div v-if="!editable && (!certifications || certifications.length === 0)" class="text-gray-500 text-center py-8">
        No certifications added yet.
      </div>
      
      <div v-for="(certification, index) in certifications" :key="certification.id" class="certification-item">
        <div v-if="!editable" class="certification-display">
          <div class="flex justify-between items-start mb-2">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-1">
                <h3 class="text-lg font-semibold text-gray-900">{{ certification.name }}</h3>
                <div class="flex items-center space-x-2">
                  <span 
                    v-if="certification.status === 'active'"
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium"
                  >
                    Active
                  </span>
                  <span 
                    v-else-if="certification.status === 'expired'"
                    class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium"
                  >
                    Expired
                  </span>
                  <span 
                    v-else-if="certification.status === 'in-progress'"
                    class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                  >
                    In Progress
                  </span>
                  <a 
                    v-if="certification.credentialUrl" 
                    :href="certification.credentialUrl" 
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    View Credential
                  </a>
                </div>
              </div>
              <p class="text-base text-blue-600 font-medium">{{ certification.issuer }}</p>
              <div class="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span v-if="certification.issueDate">
                  Issued: {{ formatDate(certification.issueDate) }}
                </span>
                <span v-if="certification.expiryDate">
                  {{ certification.status === 'expired' ? 'Expired:' : 'Expires:' }} {{ formatDate(certification.expiryDate) }}
                </span>
                <span v-if="!certification.expiryDate && certification.status === 'active'">
                  No Expiration
                </span>
                <span v-if="certification.credentialId" class="font-mono text-xs">
                  ID: {{ certification.credentialId }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-if="certification.description" class="mt-3 text-gray-700">
            <p class="leading-relaxed">{{ certification.description }}</p>
          </div>
          
          <div v-if="certification.skills && certification.skills.length > 0" class="mt-3">
            <p class="text-sm font-medium text-gray-700 mb-2">Skills Validated:</p>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in certification.skills" 
                :key="skill"
                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
        
        <div v-else class="certification-edit border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Certification {{ index + 1 }}</h3>
            <button 
              @click="removeCertification(index)"
              class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
              <input
                v-model="certification.name"
                @input="updateCertifications"
                type="text"
                placeholder="e.g., AWS Certified Solutions Architect"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
              <input
                v-model="certification.issuer"
                @input="updateCertifications"
                type="text"
                placeholder="e.g., Amazon Web Services"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="certification.status"
                @change="updateCertifications"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
              <input
                v-model="certification.issueDate"
                @input="updateCertifications"
                type="month"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
              <input
                v-model="certification.expiryDate"
                @input="updateCertifications"
                type="month"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <p class="text-xs text-gray-500 mt-1">Leave empty if certification doesn't expire</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
              <input
                v-model="certification.credentialId"
                @input="updateCertifications"
                type="text"
                placeholder="e.g., ABC123XYZ789"
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Credential URL (Optional)</label>
              <input
                v-model="certification.credentialUrl"
                @input="updateCertifications"
                type="url"
                placeholder="https://www.credly.com/badges/..."
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              v-model="certification.description"
              @input="updateCertifications"
              placeholder="Brief description of what this certification validates..."
              rows="3"
              class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Skills Validated (Optional)</label>
            <input
              v-model="certification.skillsText"
              @input="updateSkills(index, $event)"
              type="text"
              placeholder="e.g., Cloud Architecture, AWS Services, Security, Scalability"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <p class="text-xs text-gray-500 mt-1">Separate skills with commas</p>
            <div v-if="certification.skills && certification.skills.length > 0" class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="skill in certification.skills" 
                :key="skill"
                class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Popular Certifications Modal/Suggestions -->
      <div v-if="showPopularCertifications && editable" class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-lg font-semibold text-blue-800">Popular Certifications by Category</h4>
          <button 
            @click="showPopularCertifications = false"
            class="text-blue-600 hover:text-blue-800"
          >
            ×
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="category in popularCertifications" :key="category.name" class="bg-white rounded-lg p-3">
            <h5 class="font-semibold text-gray-800 mb-2">{{ category.name }}</h5>
            <div class="space-y-2">
              <button
                v-for="cert in category.certifications"
                :key="cert.name"
                @click="addPopularCertification(cert)"
                class="w-full text-left p-2 text-sm bg-gray-50 hover:bg-blue-100 rounded transition-colors"
              >
                <div class="font-medium">{{ cert.name }}</div>
                <div class="text-xs text-gray-600">{{ cert.issuer }}</div>
              </button>
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

const certifications = ref(props.data.certifications || [])
const showPopularCertifications = ref(false)

const popularCertifications = [
  {
    name: 'Cloud & DevOps',
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services' },
      { name: 'Microsoft Azure Fundamentals', issuer: 'Microsoft' },
      { name: 'Google Cloud Professional', issuer: 'Google Cloud' },
      { name: 'Certified Kubernetes Administrator', issuer: 'Cloud Native Computing Foundation' },
      { name: 'Docker Certified Associate', issuer: 'Docker' }
    ]
  },
  {
    name: 'Project Management',
    certifications: [
      { name: 'Project Management Professional (PMP)', issuer: 'Project Management Institute' },
      { name: 'Certified ScrumMaster', issuer: 'Scrum Alliance' },
      { name: 'Agile Certified Practitioner', issuer: 'Project Management Institute' },
      { name: 'PRINCE2 Foundation', issuer: 'AXELOS' }
    ]
  },
  {
    name: 'Data & Analytics',
    certifications: [
      { name: 'Google Analytics Certified', issuer: 'Google' },
      { name: 'Tableau Desktop Specialist', issuer: 'Tableau' },
      { name: 'Microsoft Power BI Data Analyst', issuer: 'Microsoft' },
      { name: 'Certified Data Professional', issuer: 'DAMA International' }
    ]
  },
  {
    name: 'Security',
    certifications: [
      { name: 'CompTIA Security+', issuer: 'CompTIA' },
      { name: 'Certified Information Systems Security Professional', issuer: 'ISC2' },
      { name: 'Certified Ethical Hacker', issuer: 'EC-Council' },
      { name: 'AWS Certified Security - Specialty', issuer: 'Amazon Web Services' }
    ]
  },
  {
    name: 'Development',
    certifications: [
      { name: 'Oracle Certified Professional Java', issuer: 'Oracle' },
      { name: 'Microsoft Certified: Azure Developer Associate', issuer: 'Microsoft' },
      { name: 'Google Associate Android Developer', issuer: 'Google' },
      { name: 'Salesforce Certified Platform Developer', issuer: 'Salesforce' }
    ]
  },
  {
    name: 'Design & UX',
    certifications: [
      { name: 'Google UX Design Certificate', issuer: 'Google' },
      { name: 'Adobe Certified Expert', issuer: 'Adobe' },
      { name: 'Certified User Experience Professional', issuer: 'UXPA' },
      { name: 'HFI Certified Usability Analyst', issuer: 'Human Factors International' }
    ]
  }
]

const addCertification = () => {
  const newCertification = {
    id: Date.now(),
    name: '',
    issuer: '',
    status: 'active',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    skills: [],
    skillsText: ''
  }
  certifications.value.push(newCertification)
  updateCertifications()
}

const removeCertification = (index) => {
  if (confirm('Are you sure you want to remove this certification?')) {
    certifications.value.splice(index, 1)
    updateCertifications()
  }
}

const updateCertifications = () => {
  // Update expiry status based on dates
  certifications.value.forEach(cert => {
    if (cert.expiryDate && cert.status !== 'in-progress') {
      const expiryDate = new Date(cert.expiryDate + '-01')
      const today = new Date()
      cert.status = expiryDate < today ? 'expired' : 'active'
    }
  })
  
  emit('update', { certifications: certifications.value })
}

const updateSkills = (index, event) => {
  const skillsText = event.target.value
  const skills = skillsText
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0)
  
  certifications.value[index].skills = skills
  certifications.value[index].skillsText = skillsText
  updateCertifications()
}

const browseCertifications = () => {
  showPopularCertifications.value = true
}

const addPopularCertification = (cert) => {
  const newCertification = {
    id: Date.now(),
    name: cert.name,
    issuer: cert.issuer,
    status: 'in-progress',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    description: '',
    skills: [],
    skillsText: ''
  }
  certifications.value.push(newCertification)
  updateCertifications()
  showPopularCertifications.value = false
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Watch for external data changes
watch(() => props.data.certifications, (newCertifications) => {
  certifications.value = newCertifications || []
}, { deep: true })

// Initialize skills text for existing certifications
watch(certifications, () => {
  certifications.value.forEach(cert => {
    if (cert.skills && !cert.skillsText) {
      cert.skillsText = cert.skills.join(', ')
    }
  })
}, { immediate: true, deep: true })
</script>

<style scoped>
.certification-item:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.certification-display {
  transition: all 0.2s ease;
}

.certification-display:hover {
  background-color: #f9fafb;
  padding: 1rem;
  margin: -1rem;
  border-radius: 0.5rem;
}
</style>
