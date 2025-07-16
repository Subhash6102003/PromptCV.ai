const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Create a simple Express server for testing
const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock file storage (in-memory for testing)
let mockFiles = [];
let mockUsers = {};

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PromptCV.ai API is running' });
});

// Mock file upload endpoint
app.post('/api/files/upload', (req, res) => {
  try {
    // For testing, we'll just return a mock response
    const fileId = Date.now().toString();
    const mockFile = {
      fileId: fileId,
      filename: 'test-resume.pdf',
      size: 1024 * 100, // 100KB
      uploadDate: new Date()
    };
    
    mockFiles.push(mockFile);
    
    res.json({
      success: true,
      fileId: fileId,
      filename: mockFile.filename,
      size: mockFile.size
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Mock get user files
app.get('/api/files/user/:userId', (req, res) => {
  const { userId } = req.params;
  
  // Return mock files for testing
  const userFiles = mockFiles.map(file => ({
    fileId: file.fileId,
    filename: file.filename,
    uploadDate: file.uploadDate,
    size: file.size
  }));
  
  res.json({ pdfs: userFiles });
});

// Mock delete file
app.delete('/api/files/delete/:fileId', (req, res) => {
  const { fileId } = req.params;
  
  mockFiles = mockFiles.filter(file => file.fileId !== fileId);
  
  res.json({ success: true, message: 'File deleted successfully' });
});

// LinkedIn connect
app.get('/api/linkedin/connect', (req, res) => {
  const clientId = '77z4j3yhfkexn8';
  const redirectUri = encodeURIComponent('http://localhost:3000/api/linkedin/callback');
  const scope = encodeURIComponent('r_liteprofile r_emailaddress');
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  
  res.redirect(authUrl);
});

// LinkedIn callback
app.get('/api/linkedin/callback', (req, res) => {
  const { code } = req.query;
  
  if (code) {
    res.redirect('http://localhost:5173/profile?linkedin_connected=true');
  } else {
    res.redirect('http://localhost:5173/profile?linkedin_error=true');
  }
});

// GitHub connect
app.get('/api/github/connect', (req, res) => {
  // For testing, just redirect with success
  res.redirect('http://localhost:5173/profile?github_connected=true');
});

// GitHub callback
app.get('/api/github/callback', (req, res) => {
  res.redirect('http://localhost:5173/profile?github_connected=true');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test Server running on port ${PORT}`);
  console.log(`🎯 Frontend URL: http://localhost:5173`);
  console.log(`🔗 Backend URL: http://localhost:${PORT}`);
});
