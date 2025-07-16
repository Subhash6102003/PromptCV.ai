// MongoDB PDF Processor
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const API_BASE_URL = 'http://localhost:3000';

export const extractTextFromPDF = async (pdfBuffer) => {
  try {
    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: pdfBuffer,
      verbosity: 0
    });
    
    const pdf = await loadingTask.promise;
    let extractedText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');
      
      extractedText += pageText + '\n';
    }
    
    return extractedText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

export const uploadPDFToMongoDB = async (file, userId) => {
  try {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('userId', userId);

    const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

export const getUserPDFs = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/user/${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDFs: ${response.statusText}`);
    }

    const result = await response.json();
    return result.pdfs || [];
  } catch (error) {
    console.error('Error fetching user PDFs:', error);
    throw error;
  }
};

export const deletePDFFromMongoDB = async (fileId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/delete/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting PDF:', error);
    throw error;
  }
};

export const getPDFContent = async (fileId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/content/${fileId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF content: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error fetching PDF content:', error);
    throw error;
  }
};

export const downloadPDF = (fileId, filename) => {
  const downloadUrl = `${API_BASE_URL}/api/files/download/${fileId}`;
  
  // Create download link
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const processPDFFile = async (file, userId) => {
  try {
    // Upload to MongoDB
    const uploadResult = await uploadPDFToMongoDB(file, userId);
    
    // Get PDF content for text extraction
    const pdfContent = await getPDFContent(uploadResult.fileId);
    
    // Extract text from PDF
    const extractedText = await extractTextFromPDF(pdfContent);
    
    return {
      fileId: uploadResult.fileId,
      filename: uploadResult.filename,
      size: uploadResult.size,
      text: extractedText,
      uploadDate: new Date()
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
};
