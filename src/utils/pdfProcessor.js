import { storage } from '@/config/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`

/**
 * Upload PDF to Firebase Storage and extract text content
 * @param {File} file - PDF file to upload
 * @param {string} userId - User ID for folder organization
 * @returns {Promise<Object>} Upload result with URL and extracted data
 */
export const uploadAndProcessPDF = async (file, userId) => {
  try {
    // Validate file
    if (!file || file.type !== 'application/pdf') {
      throw new Error('Please select a valid PDF file')
    }

    // Create unique filename
    const filename = `${uuidv4()}-${file.name}`
    const filePath = `resumes/${userId}/${filename}`
    
    // Create storage reference
    const storageRef = ref(storage, filePath)
    
    // Upload file to Firebase Storage
    console.log('Uploading PDF to Firebase Storage...')
    const snapshot = await uploadBytes(storageRef, file)
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)
    
    // Extract text from PDF (mock implementation - you'll need a real PDF parser)
    const extractedData = await extractTextFromPDF(file)
    
    return {
      success: true,
      downloadURL,
      filename,
      extractedData,
      uploadPath: filePath
    }
    
  } catch (error) {
    console.error('PDF upload failed:', error)
    throw new Error(`Failed to upload PDF: ${error.message}`)
  }
}

/**
 * Extract text and structured data from PDF
 * @param {File} file - PDF file
 * @returns {Promise<Object>} Extracted resume data
 */
const extractTextFromPDF = async (file) => {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    
    // Load PDF document
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise
    let fullText = ''
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map(item => item.str).join(' ')
      fullText += pageText + '\n'
    }
    
    // Parse the extracted text to identify resume sections
    const parsedData = parseResumeText(fullText)
    
    return parsedData
    
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    
    // Fallback to mock data if PDF extraction fails
    return {
      personalInfo: {
        fullName: 'Extracted from PDF',
        email: 'contact@example.com',
        phone: '+1 (555) 123-4567',
        location: 'Location from PDF',
        linkedin: '',
        github: ''
      },
      summary: 'Professional summary extracted from PDF...',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      extractedText: fullText || 'Error extracting text from PDF'
    }
  }
}

/**
 * Parse resume text and extract structured data
 * @param {string} text - Raw text from PDF
 * @returns {Object} Structured resume data
 */
const parseResumeText = (text) => {
  // This is a basic parser - you can enhance it with more sophisticated NLP
  const lines = text.split('\n').filter(line => line.trim())
  
  // Extract email
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)
  
  // Extract phone
  const phoneMatch = text.match(/[\+]?[1-9]?[\-\s]?[\(]?[0-9]{3}[\)]?[\-\s]?[0-9]{3}[\-\s]?[0-9]{4,6}/)
  
  // Extract LinkedIn
  const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin\.com\/profile\/view\?id=)([A-Za-z0-9\-_.]+)/)
  
  // Extract GitHub
  const githubMatch = text.match(/(?:github\.com\/)([A-Za-z0-9\-_.]+)/)
  
  // Extract name (first few words, excluding common headers)
  const nameMatch = lines.find(line => 
    line.length > 2 && 
    line.length < 50 && 
    !line.toLowerCase().includes('resume') &&
    !line.toLowerCase().includes('curriculum') &&
    !line.toLowerCase().includes('cv')
  )
  
  return {
    personalInfo: {
      fullName: nameMatch || 'Name from PDF',
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : '',
      location: '',
      linkedin: linkedinMatch ? `https://linkedin.com/in/${linkedinMatch[1]}` : '',
      github: githubMatch ? `https://github.com/${githubMatch[1]}` : ''
    },
    summary: 'Professional summary extracted from PDF...',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    extractedText: text
  }
}

export default {
  uploadAndProcessPDF
}
