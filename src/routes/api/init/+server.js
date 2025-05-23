import { json } from '@sveltejs/kit';
import { jsonStorage } from '$lib/utils/jsonStorage';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * Initialize data files if they don't exist
 */
export async function GET() {
  try {
    // Check if data directory exists
    const dataDir = join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    
    // Check if galleryImages.json exists
    const galleryImagesPath = join(dataDir, 'galleryImages.json');
    
    // If it doesn't exist, create an empty array
    if (!existsSync(galleryImagesPath)) {
      const result = jsonStorage.write('galleryImages', []);
      
      if (!result) {
        return json({
          success: false,
          message: 'Failed to initialize gallery data'
        }, { status: 500 });
      }
    }
    
    return json({
      success: true,
      message: 'Data files initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing data files:', error);
    return json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
