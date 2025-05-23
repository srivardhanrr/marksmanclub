import { json } from '@sveltejs/kit';
import { jsonStorage } from '$lib/utils/jsonStorage';

/**
 * GET handler for retrieving gallery images
 */
export async function GET() {
  try {
    // Read gallery images from JSON file
    const images = jsonStorage.read('galleryImages', []);
    
    return json({
      success: true,
      images
    });
  } catch (error) {
    console.error('Error reading gallery images:', error);
    return json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}

/**
 * POST handler for saving gallery images
 */
export async function POST({ request }) {
  try {
    const data = await request.json();
    
    if (!data.images || !Array.isArray(data.images)) {
      return json({
        success: false,
        message: 'Invalid data format - images array is required'
      }, { status: 400 });
    }
    
    // Save gallery images to JSON file
    const result = jsonStorage.write('galleryImages', data.images);
    
    if (!result) {
      return json({
        success: false,
        message: 'Failed to save gallery data'
      }, { status: 500 });
    }
    
    return json({
      success: true,
      message: 'Gallery images saved successfully'
    });
  } catch (error) {
    console.error('Error saving gallery images:', error);
    return json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}
