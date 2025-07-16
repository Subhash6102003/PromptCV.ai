import express from 'express';
import multer from 'multer';
import { GridFSBucket, ObjectId } from 'mongodb';
import { getDB, getBucket } from '../config/mongodb.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Upload PDF file
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const bucket = getBucket();
    const db = getDB();

    // Create upload stream
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: {
        userId: userId,
        uploadDate: new Date(),
        contentType: req.file.mimetype,
        size: req.file.size
      }
    });

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
        );

        res.json({
          success: true,
          fileId: uploadStream.id,
          filename: req.file.originalname,
          size: req.file.size
        });
      } catch (error) {
        console.error('Error saving file reference:', error);
        res.status(500).json({ error: 'Failed to save file reference' });
      }
    });

    // Handle upload errors
    uploadStream.on('error', (error) => {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    });

    // Write file data to GridFS
    uploadStream.end(req.file.buffer);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Get user's uploaded PDFs
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const db = getDB();

    const user = await db.collection('users').findOne({ userId: userId });
    
    if (!user || !user.uploadedPdfs) {
      return res.json({ pdfs: [] });
    }

    res.json({ pdfs: user.uploadedPdfs });
  } catch (error) {
    console.error('Error fetching user PDFs:', error);
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
});

// Download PDF file
router.get('/download/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const bucket = getBucket();

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));

    downloadStream.on('error', (error) => {
      console.error('Download error:', error);
      res.status(404).json({ error: 'File not found' });
    });

    downloadStream.on('file', (file) => {
      res.set({
        'Content-Type': file.metadata.contentType,
        'Content-Length': file.length,
        'Content-Disposition': `attachment; filename="${file.filename}"`
      });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// Delete PDF file
router.delete('/delete/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const bucket = getBucket();
    const db = getDB();

    // Delete file from GridFS
    await bucket.delete(new ObjectId(fileId));

    // Remove file reference from user's documents
    await db.collection('users').updateOne(
      { userId: userId },
      { 
        $pull: { 
          uploadedPdfs: { fileId: new ObjectId(fileId) }
        }
      }
    );

    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Get PDF content for processing
router.get('/content/:fileId', async (req, res) => {
  try {
    const { fileId } = req.params;
    const bucket = getBucket();

    const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
    let chunks = [];

    downloadStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      res.set('Content-Type', 'application/pdf');
      res.send(buffer);
    });

    downloadStream.on('error', (error) => {
      console.error('Content fetch error:', error);
      res.status(404).json({ error: 'File not found' });
    });

  } catch (error) {
    console.error('Content fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch file content' });
  }
});

export default router;
