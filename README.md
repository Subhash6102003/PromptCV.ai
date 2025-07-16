# AI Resume Builder

An AI-powered resume builder that automatically syncs with LinkedIn and GitHub profiles to create professional resumes with intelligent content generation.

## Features

- 🔐 **Multi-Authentication**: Google/Apple primary auth + GitHub/LinkedIn OAuth
- 🤖 **AI-Powered Content**: Generate compelling summaries and job descriptions
- 🔄 **Auto-Sync**: Automatically import data from LinkedIn and GitHub
- 📄 **Multiple Templates**: Professional, modern, and creative resume templates
- 👀 **Live Preview**: Real-time preview as you build your resume
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 📥 **PDF Export**: High-quality PDF downloads
- ⚡ **ATS Optimized**: Templates designed to pass Applicant Tracking Systems

## Tech Stack

### Frontend
- **Vue.js 3** with Composition API
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Vue Router** for navigation
- **Pinia** for state management
- **Firebase Auth** for authentication
- **html2pdf.js** for PDF generation

### Backend
- **Node.js** with Express
- **Passport.js** for OAuth (GitHub/LinkedIn)
- **OpenAI API** for AI content generation
- **MongoDB** for data storage
- **Firebase Admin** for user verification

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)
- Firebase project
- GitHub OAuth App
- LinkedIn OAuth App
- OpenAI API key

### Installation

1. **Install frontend dependencies**
   ```bash
   npm install
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   
   **Frontend** (`.env`):
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:3000
   ```

   **Backend** (`server/.env`):
   ```env
   PORT=3000
   SESSION_SECRET=your-secret-key
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
   ```

4. **Start the development servers**
   
   **Backend** (in `server/` directory):
   ```bash
   npm run dev
   ```

   **Frontend** (in root directory):
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Development

To run the project in development mode:

```bash
# Start frontend
npm run dev

# Start backend (in another terminal)
cd server
npm run dev
```

The application will be available at http://localhost:5173

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
