# AI Resume Builder - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is an AI-powered Resume Builder SaaS application with the following architecture:

### Tech Stack
- **Frontend**: Vue.js 3 with Vite, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: Firebase Auth (Google/Apple) + OAuth (GitHub/LinkedIn)
- **AI**: OpenAI API for resume generation
- **PDF Export**: html2pdf.js

### Key Features
- Multi-user authentication (Google/Apple primary, GitHub/LinkedIn OAuth)
- Auto-sync with LinkedIn and GitHub profiles
- AI-generated resume sections
- Multiple resume templates
- Live preview and editing
- PDF export functionality

### Code Guidelines
- Use Vue 3 Composition API
- Follow modern JavaScript/ES6+ patterns
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Follow security best practices for OAuth and API keys
- Use environment variables for sensitive data

### API Integration
- Firebase Auth for primary authentication
- GitHub API for repositories and profile data
- LinkedIn API for professional experience
- OpenAI API for AI-generated content

### Component Structure
- Modular Vue components for resume sections
- Reusable UI components
- Proper state management with Pinia or Vuex
