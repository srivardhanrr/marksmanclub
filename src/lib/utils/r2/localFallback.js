import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Fallback implementation for local file storage when R2 is not configured
 * This handles file uploads to the local filesystem instead of R2
 */
export async function uploadToLocalStorage(filename, fileBuffer, contentType) {
  try {
    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'static', 'images', 'gallery');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    
    // Save the file
    const filePath = join(uploadDir, filename);
    writeFileSync(filePath, fileBuffer);
    
    // Return the URL to the new file
    const fileUrl = `/images/gallery/${filename}`;
    
    // Log the upload
    console.log(`${new Date().toISOString()} - Uploaded to local storage: ${filename}`);
    
    return fileUrl;
  } catch (error) {
    console.error('Error uploading to local storage:', error);
    throw error;
  }
}
