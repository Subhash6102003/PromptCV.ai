import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// MongoDB connection
let db, bucket

const connectToMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
    const dbName = process.env.MONGODB_DB_NAME || 'ai_resume_builder'
    
    const client = new MongoClient(mongoUri)
    await client.connect()
    
    db = client.db(dbName)
    bucket = new GridFSBucket(db, { bucketName: 'uploads' })
    
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
}

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are allowed'), false)
    }
  }
})

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic routes without external dependencies
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PromptCV.ai API is running' })
})

// GitHub profile route (working)
app.get('/api/github/profile/:username', async (req, res) => {
  try {
    const { username } = req.params
    const response = await fetch(`https://api.github.com/users/${username}`)
    
    if (!response.ok) {
      throw new Error('GitHub user not found')
    }
    
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error fetching GitHub profile:', error)
    res.status(404).json({ error: 'GitHub user not found' })
  }
})

// GitHub repositories route (working)
app.get('/api/github/repositories/:username', async (req, res) => {
  try {
    const { username } = req.params
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }
    
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    res.status(500).json({ error: 'Failed to fetch repositories' })
  }
})

// GitHub stats route (working)
app.get('/api/github/stats/:username', async (req, res) => {
  try {
    const { username } = req.params
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
    
    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories')
    }
    
    const repos = await reposResponse.json()
    
    const stats = {
      totalRepos: repos.length,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: [...new Set(repos.map(repo => repo.language).filter(Boolean))]
    }
    
    res.json(stats)
  } catch (error) {
    console.error('Error calculating stats:', error)
    res.status(500).json({ error: 'Failed to calculate stats' })
  }
})

// MongoDB File Upload Routes

// Upload PDF file
app.post('/api/files/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { userId } = req.body
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    if (!bucket) {
      return res.status(500).json({ error: 'Database not connected' })
    }

    // Create upload stream
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: {
        userId: userId,
        uploadDate: new Date(),
        contentType: req.file.mimetype,
        size: req.file.size
      }
    })

    // Handle upload completion
    uploadStream.on('finish', async () => {
      try {
        // Save file reference to user's documents
        await db.collection('users').updateOne(
          { userId: userId },
          { 
            $push: { 
              uploadedPdfs: {
                fileId: uploadStream.id,
                filename: req.file.originalname,
                uploadDate: new Date(),
                size: req.file.size
              }
            }
          },
          { upsert: true }
        )

        res.json({
          success: true,
          fileId: uploadStream.id,
          filename: req.file.originalname,
          size: req.file.size
        })
      } catch (error) {
        console.error('Error saving file reference:', error)
        res.status(500).json({ error: 'Failed to save file reference' })
      }
    })

    // Handle upload errors
    uploadStream.on('error', (error) => {
      console.error('Upload error:', error)
      res.status(500).json({ error: 'Failed to upload file' })
    })

    // Write file data to GridFS
    uploadStream.end(req.file.buffer)

  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Failed to upload file' })
  }
})

// Get user's uploaded PDFs
app.get('/api/files/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' })
    }

    const user = await db.collection('users').findOne({ userId: userId })
    
    if (!user || !user.uploadedPdfs) {
      return res.json({ pdfs: [] })
    }

    res.json({ pdfs: user.uploadedPdfs })
  } catch (error) {
    console.error('Error fetching user PDFs:', error)
    res.status(500).json({ error: 'Failed to fetch PDFs' })
  }
})

// Download PDF file
app.get('/api/files/download/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params
    
    if (!bucket) {
      return res.status(500).json({ error: 'Database not connected' })
    }

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId))

    downloadStream.on('error', (error) => {
      console.error('Download error:', error)
      res.status(404).json({ error: 'File not found' })
    })

    downloadStream.on('file', (file) => {
      res.set({
        'Content-Type': file.metadata.contentType,
        'Content-Length': file.length,
        'Content-Disposition': `attachment; filename="${file.filename}"`
      })
    })

    downloadStream.pipe(res)
  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
})

// Delete PDF file
app.delete('/api/files/delete/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    if (!bucket || !db) {
      return res.status(500).json({ error: 'Database not connected' })
    }

    // Delete file from GridFS
    await bucket.delete(new ObjectId(fileId))

    // Remove file reference from user's documents
    await db.collection('users').updateOne(
      { userId: userId },
      { 
        $pull: { 
          uploadedPdfs: { fileId: new ObjectId(fileId) }
        }
      }
    )

    res.json({ success: true, message: 'File deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'Failed to delete file' })
  }
})

// Get PDF content for processing
app.get('/api/files/content/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params
    
    if (!bucket) {
      return res.status(500).json({ error: 'Database not connected' })
    }

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId))
    let chunks = []

    downloadStream.on('data', (chunk) => {
      chunks.push(chunk)
    })

    downloadStream.on('end', () => {
      const buffer = Buffer.concat(chunks)
      res.set('Content-Type', 'application/pdf')
      res.send(buffer)
    })

    downloadStream.on('error', (error) => {
      console.error('Content fetch error:', error)
      res.status(404).json({ error: 'File not found' })
    })

  } catch (error) {
    console.error('Content fetch error:', error)
    res.status(500).json({ error: 'Failed to fetch file content' })
  }
})

// LinkedIn OAuth routes
app.get('/api/linkedin/connect', (req, res) => {
  const clientId = process.env.LINKEDIN_CLIENT_ID || '77z4j3yhfkexn8'
  const redirectUri = encodeURIComponent('http://localhost:3000/api/linkedin/callback')
  const scope = encodeURIComponent('r_liteprofile r_emailaddress')
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  
  res.redirect(authUrl)
})

app.get('/api/linkedin/callback', async (req, res) => {
  try {
    const { code } = req.query
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' })
    }

    const clientId = process.env.LINKEDIN_CLIENT_ID || '77z4j3yhfkexn8'
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || 'XSLQZPvjxLzj3oQH'
    const redirectUri = 'http://localhost:3000/api/linkedin/callback'

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret
      })
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token')
    }

    const tokenData = await tokenResponse.json()
    
    // Get user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    if (!profileResponse.ok) {
      throw new Error('Failed to get user profile')
    }

    const profileData = await profileResponse.json()
    
    // Redirect to frontend with success
    res.redirect(`http://localhost:5173/profile?linkedin_connected=true&name=${encodeURIComponent(profileData.firstName?.localized?.en_US || 'User')}`)
    
  } catch (error) {
    console.error('LinkedIn OAuth error:', error)
    res.redirect('http://localhost:5173/profile?linkedin_error=true')
  }
})

// GitHub OAuth routes
app.get('/api/github/connect', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID || 'your-github-client-id'
  const redirectUri = encodeURIComponent('http://localhost:3000/api/github/callback')
  const scope = encodeURIComponent('user:email')
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
  
  res.redirect(authUrl)
})

app.get('/api/github/callback', async (req, res) => {
  try {
    const { code } = req.query
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' })
    }

    // For now, just redirect with a success message
    res.redirect('http://localhost:5173/profile?github_connected=true')
    
  } catch (error) {
    console.error('GitHub OAuth error:', error)
    res.redirect('http://localhost:5173/profile?github_error=true')
  }
})

app.listen(PORT, async () => {
  // Initialize MongoDB connection
  await connectToMongoDB()
  
  console.log(`🚀 PromptCV.ai Server running on port ${PORT}`)
  console.log(`🎯 Frontend URL: http://localhost:5173`)
  console.log(`🔗 Backend URL: http://localhost:${PORT}`)
  console.log(`📊 Health Check: http://localhost:${PORT}/health`)
})
