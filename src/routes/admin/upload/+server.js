import { json } from '@sveltejs/kit';
import { uploadToR2 } from '$lib/utils/r2/r2Client';
import { uploadToLocalStorage } from '$lib/utils/r2/localFallback';
import { isR2Configured } from '$lib/config/environment';

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

    let publicUrl;
    let storageType;

    // Check if R2 is configured, otherwise use local storage
    if (isR2Configured()) {
      // Upload to Cloudflare R2
      const key = `gallery/${data.filename}`;
      publicUrl = await uploadToR2(key, buffer, imageType);
      storageType = 'R2';
    } else {
      // Fallback to local storage
      publicUrl = await uploadToLocalStorage(data.filename, buffer, imageType);
      storageType = 'local';
    }
    
    // Log the upload
    console.log(`${new Date().toISOString()} - Uploaded: ${data.filename} to ${storageType}`);
    
    return json({ 
      success: true, 
      url: publicUrl,
      storageType,
      message: `File uploaded successfully to ${storageType} storage` 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return json({ 
      success: false, 
      message: 'Error uploading file: ' + error.message 
    }, { status: 500 });
  }
}
