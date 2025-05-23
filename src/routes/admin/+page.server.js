import { jsonStorage } from '$lib/utils/jsonStorage';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    // Read gallery images from JSON file
    const galleryImages = jsonStorage.read('galleryImages', []);
    
    // Return the data to the page
    return {
      galleryImages
    };
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return {
      galleryImages: [],
      error: 'Failed to load gallery images'
    };
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  saveGallery: async ({ request }) => {
    try {
      const formData = await request.formData();
      const imagesJson = formData.get('galleryImages');
      
      if (!imagesJson) {
        return { success: false, message: 'No gallery data provided' };
      }
      
      const galleryImages = JSON.parse(imagesJson);
      
      // Save to JSON file
      const result = jsonStorage.write('galleryImages', galleryImages);
      
      if (!result) {
        return { success: false, message: 'Failed to save gallery data' };
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error saving gallery images:', error);
      return { 
        success: false, 
        message: `Error saving gallery: ${error.message}` 
      };
    }
  }
};
