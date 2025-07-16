import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import authRoutes from './routes/auth.js'
import resumeRoutes from './routes/resume.js'
import syncRoutes from './routes/sync.js'
import aiRoutes from './routes/ai.js'
import sectionsRoutes from './routes/sections.js'
import templatesRoutes from './routes/templates.js'
import improveRoutes from './routes/improve.js'
import atsRoutes from './routes/ats.js'
import downloadRoutes from './routes/download.js'
import shareRoutes from './routes/share.js'
import historyRoutes from './routes/history.js'
import brandingRoutes from './routes/branding.js'
import linkedinRoutes from './routes/linkedin.js'
import githubRoutes from './routes/github.js/index.js'
import filesRoutes from './routes/files.js'
import { connectToMongoDB } from './config/mongodb.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'ai-resume-builder-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

// Passport configuration
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/auth', authRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/sync', syncRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/sections', sectionsRoutes)
app.use('/api/templates', templatesRoutes)
app.use('/api/improve', improveRoutes)
app.use('/api/ats', atsRoutes)
app.use('/api/download', downloadRoutes)
app.use('/api/share', shareRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/branding', brandingRoutes)
app.use('/api/linkedin', linkedinRoutes)
app.use('/api/github', githubRoutes)
app.use('/api/files', filesRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Resume Builder API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, async () => {
  // Initialize MongoDB connection
  try {
    await connectToMongoDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
  
  console.log(`Server running on port ${PORT}`)
  console.log(`Frontend URL: http://localhost:5173`)
  console.log(`Backend URL: http://localhost:${PORT}`)
})
