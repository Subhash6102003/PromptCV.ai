import express from 'express'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'

const router = express.Router()

// Configure GitHub Strategy (only if credentials are provided)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  }, (accessToken, refreshToken, profile, done) => {
    // Save GitHub profile and token to database
    const githubData = {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      accessToken: accessToken,
      profile: profile._json
    }
    
    // Store in session for now (replace with database storage)
    return done(null, githubData)
  }))
}

// Configure LinkedIn Strategy (only if credentials are provided)
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: "/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile']
}, (accessToken, refreshToken, profile, done) => {
  // Save LinkedIn profile and token to database
  const linkedinData = {
    id: profile.id,
    displayName: profile.displayName,
    accessToken: accessToken,
    profile: profile._json
  }
  
  return done(null, linkedinData)
}))
}

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// GitHub OAuth routes
router.get('/github', 
  passport.authenticate('github', { scope: ['user:email', 'repo'] })
)

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Store GitHub connection status
    req.session.githubConnected = true
    req.session.githubData = req.user
    
    // Redirect back to frontend
    res.redirect('http://localhost:5173/dashboard?github=connected')
  }
)

// LinkedIn OAuth routes
router.get('/linkedin',
  passport.authenticate('linkedin', { 
    scope: ['r_emailaddress', 'r_liteprofile'] 
  })
)

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // Store LinkedIn connection status
    req.session.linkedinConnected = true
    req.session.linkedinData = req.user
    
    // Redirect back to frontend
    res.redirect('http://localhost:5173/dashboard?linkedin=connected')
  }
)

// Check connection status
router.get('/status', (req, res) => {
  res.json({
    githubConnected: !!req.session.githubConnected,
    linkedinConnected: !!req.session.linkedinConnected
  })
})

// Disconnect GitHub
router.post('/disconnect/github', (req, res) => {
  req.session.githubConnected = false
  req.session.githubData = null
  res.json({ success: true })
})

// Disconnect LinkedIn
router.post('/disconnect/linkedin', (req, res) => {
  req.session.linkedinConnected = false
  req.session.linkedinData = null
  res.json({ success: true })
})

// OAuth Token Exchange Endpoints
router.post('/linkedin/token', async (req, res) => {
  try {
    const { code, clientId, clientSecret, redirectUri } = req.body
    
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
      })
    })
    
    const tokenData = await tokenResponse.json()
    
    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Token exchange failed')
    }
    
    res.json(tokenData)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/github/token', async (req, res) => {
  try {
    const { code, clientId, clientSecret, redirectUri } = req.body
    
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri
      })
    })
    
    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'Token exchange failed')
    }
    
    res.json(tokenData)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
