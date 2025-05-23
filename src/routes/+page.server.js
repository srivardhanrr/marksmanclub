import { jsonStorage } from '$lib/utils/jsonStorage';

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
