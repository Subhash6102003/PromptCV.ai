// Free Resume Templates for PromptCV.ai
// Sources: Open-source templates and layouts

export const freeTemplates = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    category: 'Professional',
    preview: '/templates/modern-minimal-preview.jpg',
    description: 'Clean and modern design perfect for tech professionals',
    colors: {
      primary: '#0F172A',
      secondary: '#64748B',
      accent: '#3B82F6'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    layout: 'single-column',
    features: ['ATS-friendly', 'Clean layout', 'Modern typography'],
    source: 'Custom Design',
    free: true
  },
  {
    id: 'classic-professional',
    name: 'Classic Professional',
    category: 'Traditional',
    preview: '/templates/classic-professional-preview.jpg',
    description: 'Traditional layout ideal for corporate environments',
    colors: {
      primary: '#1F2937',
      secondary: '#6B7280',
      accent: '#059669'
    },
    fonts: {
      heading: 'Georgia',
      body: 'Times New Roman'
    },
    layout: 'two-column',
    features: ['Professional', 'Traditional', 'Corporate-friendly'],
    source: 'Inspired by Harvard Business School',
    free: true
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Creative',
    preview: '/templates/creative-designer-preview.jpg',
    description: 'Bold design for creative professionals and designers',
    colors: {
      primary: '#7C3AED',
      secondary: '#A78BFA',
      accent: '#F59E0B'
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Open Sans'
    },
    layout: 'creative-grid',
    features: ['Creative layout', 'Color highlights', 'Portfolio-ready'],
    source: 'Behance Community',
    free: true
  },
  {
    id: 'tech-developer',
    name: 'Tech Developer',
    category: 'Technical',
    preview: '/templates/tech-developer-preview.jpg',
    description: 'Code-inspired design for software developers',
    colors: {
      primary: '#0F172A',
      secondary: '#475569',
      accent: '#06B6D4'
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto'
    },
    layout: 'sidebar-left',
    features: ['Developer-focused', 'Clean code aesthetic', 'GitHub integration'],
    source: 'GitHub Resume Templates',
    free: true
  },
  {
    id: 'executive-leader',
    name: 'Executive Leader',
    category: 'Executive',
    preview: '/templates/executive-leader-preview.jpg',
    description: 'Sophisticated design for senior executives',
    colors: {
      primary: '#1E293B',
      secondary: '#64748B',
      accent: '#DC2626'
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Source Sans Pro'
    },
    layout: 'executive-style',
    features: ['Executive presence', 'Sophisticated', 'Leadership-focused'],
    source: 'McKinsey Resume Guide',
    free: true
  },
  {
    id: 'student-fresh',
    name: 'Student Fresh',
    category: 'Entry-Level',
    preview: '/templates/student-fresh-preview.jpg',
    description: 'Perfect for students and recent graduates',
    colors: {
      primary: '#2563EB',
      secondary: '#64748B',
      accent: '#10B981'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Poppins'
    },
    layout: 'student-friendly',
    features: ['Student-focused', 'Education emphasis', 'Project highlights'],
    source: 'University Career Centers',
    free: true
  },
  {
    id: 'healthcare-medical',
    name: 'Healthcare Medical',
    category: 'Healthcare',
    preview: '/templates/healthcare-medical-preview.jpg',
    description: 'Professional design for healthcare professionals',
    colors: {
      primary: '#0F172A',
      secondary: '#64748B',
      accent: '#0891B2'
    },
    fonts: {
      heading: 'Lato',
      body: 'Lato'
    },
    layout: 'medical-standard',
    features: ['Medical-focused', 'Professional', 'Certification emphasis'],
    source: 'Medical Resume Standards',
    free: true
  },
  {
    id: 'sales-marketing',
    name: 'Sales & Marketing',
    category: 'Sales',
    preview: '/templates/sales-marketing-preview.jpg',
    description: 'Dynamic design for sales and marketing professionals',
    colors: {
      primary: '#DC2626',
      secondary: '#64748B',
      accent: '#F59E0B'
    },
    fonts: {
      heading: 'Nunito',
      body: 'Nunito'
    },
    layout: 'sales-focused',
    features: ['Results-oriented', 'Dynamic', 'Achievement highlights'],
    source: 'Sales Resume Examples',
    free: true
  }
]

// Template Sources and Attribution
export const templateSources = {
  'Harvard Business School': {
    url: 'https://www.hbs.edu/careers/resources/resume-guide',
    attribution: 'Inspired by Harvard Business School Career Services'
  },
  'GitHub Resume Templates': {
    url: 'https://github.com/topics/resume-template',
    attribution: 'Open-source GitHub community templates'
  },
  'Behance Community': {
    url: 'https://www.behance.net/search/projects/resume',
    attribution: 'Inspired by Behance creative community'
  },
  'McKinsey Resume Guide': {
    url: 'https://www.mckinsey.com/careers/how-to-write-a-resume',
    attribution: 'Based on McKinsey resume guidelines'
  },
  'University Career Centers': {
    url: 'https://careers.university.edu/resume-templates',
    attribution: 'Compiled from university career service guidelines'
  },
  'Medical Resume Standards': {
    url: 'https://www.ama-assn.org/residents-students/career-planning/resume-writing-tips',
    attribution: 'Based on medical professional standards'
  },
  'Sales Resume Examples': {
    url: 'https://www.salesforce.com/resources/articles/resume/',
    attribution: 'Industry-standard sales resume practices'
  }
}

// Template Categories
export const templateCategories = [
  { id: 'all', name: 'All Templates', count: freeTemplates.length },
  { id: 'professional', name: 'Professional', count: freeTemplates.filter(t => t.category === 'Professional').length },
  { id: 'creative', name: 'Creative', count: freeTemplates.filter(t => t.category === 'Creative').length },
  { id: 'technical', name: 'Technical', count: freeTemplates.filter(t => t.category === 'Technical').length },
  { id: 'executive', name: 'Executive', count: freeTemplates.filter(t => t.category === 'Executive').length },
  { id: 'entry-level', name: 'Entry Level', count: freeTemplates.filter(t => t.category === 'Entry-Level').length },
  { id: 'healthcare', name: 'Healthcare', count: freeTemplates.filter(t => t.category === 'Healthcare').length },
  { id: 'sales', name: 'Sales', count: freeTemplates.filter(t => t.category === 'Sales').length }
]

// Template Layouts
export const templateLayouts = {
  'single-column': {
    name: 'Single Column',
    description: 'Clean single-column layout',
    structure: ['header', 'summary', 'experience', 'education', 'skills']
  },
  'two-column': {
    name: 'Two Column',
    description: 'Traditional two-column layout',
    structure: {
      left: ['contact', 'skills', 'education'],
      right: ['summary', 'experience', 'projects']
    }
  },
  'sidebar-left': {
    name: 'Left Sidebar',
    description: 'Sidebar with main content area',
    structure: {
      sidebar: ['contact', 'skills', 'education'],
      main: ['header', 'summary', 'experience', 'projects']
    }
  },
  'creative-grid': {
    name: 'Creative Grid',
    description: 'Grid-based creative layout',
    structure: 'flexible-grid'
  },
  'executive-style': {
    name: 'Executive Style',
    description: 'Sophisticated executive layout',
    structure: ['executive-header', 'leadership-summary', 'executive-experience', 'board-positions', 'education']
  },
  'student-friendly': {
    name: 'Student Friendly',
    description: 'Optimized for students and new graduates',
    structure: ['header', 'objective', 'education', 'projects', 'experience', 'skills']
  },
  'medical-standard': {
    name: 'Medical Standard',
    description: 'Healthcare industry standard',
    structure: ['header', 'summary', 'experience', 'education', 'certifications', 'skills']
  },
  'sales-focused': {
    name: 'Sales Focused',
    description: 'Highlights achievements and results',
    structure: ['header', 'summary', 'achievements', 'experience', 'education', 'skills']
  }
}

// Color Schemes
export const colorSchemes = [
  { id: 'professional-blue', name: 'Professional Blue', primary: '#0F172A', secondary: '#64748B', accent: '#3B82F6' },
  { id: 'executive-black', name: 'Executive Black', primary: '#1E293B', secondary: '#64748B', accent: '#DC2626' },
  { id: 'creative-purple', name: 'Creative Purple', primary: '#7C3AED', secondary: '#A78BFA', accent: '#F59E0B' },
  { id: 'tech-cyan', name: 'Tech Cyan', primary: '#0F172A', secondary: '#475569', accent: '#06B6D4' },
  { id: 'healthcare-teal', name: 'Healthcare Teal', primary: '#0F172A', secondary: '#64748B', accent: '#0891B2' },
  { id: 'sales-red', name: 'Sales Red', primary: '#DC2626', secondary: '#64748B', accent: '#F59E0B' },
  { id: 'classic-green', name: 'Classic Green', primary: '#1F2937', secondary: '#6B7280', accent: '#059669' }
]

// Font Combinations
export const fontCombinations = [
  { id: 'modern-inter', name: 'Modern Inter', heading: 'Inter', body: 'Inter' },
  { id: 'classic-georgia', name: 'Classic Georgia', heading: 'Georgia', body: 'Times New Roman' },
  { id: 'creative-montserrat', name: 'Creative Montserrat', heading: 'Montserrat', body: 'Open Sans' },
  { id: 'tech-roboto', name: 'Tech Roboto', heading: 'Roboto', body: 'Roboto' },
  { id: 'executive-playfair', name: 'Executive Playfair', heading: 'Playfair Display', body: 'Source Sans Pro' },
  { id: 'friendly-poppins', name: 'Friendly Poppins', heading: 'Poppins', body: 'Poppins' },
  { id: 'professional-lato', name: 'Professional Lato', heading: 'Lato', body: 'Lato' }
]

export default {
  freeTemplates,
  templateSources,
  templateCategories,
  templateLayouts,
  colorSchemes,
  fontCombinations
}
