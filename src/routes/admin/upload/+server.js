import { json } from '@sveltejs/kit';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { jsonStorage } from '$lib/utils/jsonStorage';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const data = await request.json();
    
    if (!data.image || !data.filename) {
      return json({ success: false, message: 'Missing image data or filename' }, { status: 400 });
    }
    
    // Base64 data comes in format "data:image/jpeg;base64,/9j/4AAQSkZJRg..." 
    // We need to extract the actual base64 string
    const matches = data.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      return json({ success: false, message: 'Invalid image format' }, { status: 400 });
    }
    
    const imageType = matches[1];
    const imageData = matches[2];
    const buffer = Buffer.from(imageData, 'base64');

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'static', 'images', 'gallery');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    
    // Save the file
    const filePath = join(uploadDir, data.filename);
    writeFileSync(filePath, buffer);
    
    // Return the URL to the new file
    const fileUrl = `/images/gallery/${data.filename}`;
    
    // Log the upload in a text file for debugging
    try {
      const logDir = join(process.cwd(), 'data', 'logs');
      if (!existsSync(logDir)) {
        mkdirSync(logDir, { recursive: true });
      }
      
      const logEntry = `${new Date().toISOString()} - Uploaded: ${data.filename} to ${filePath}\n`;
      const logPath = join(logDir, 'uploads.log');
      
      // Append to log file or create it if it doesn't exist
      const fs = await import('fs/promises');
      await fs.appendFile(logPath, logEntry);
    } catch (logError) {
      console.error('Error writing to upload log:', logError);
      // Non-critical error, continue with the upload response
    }
    
    return json({ 
      success: true, 
      url: fileUrl,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return json({ 
      success: false, 
      message: 'Error uploading file: ' + error.message 
    }, { status: 500 });
  }
}
