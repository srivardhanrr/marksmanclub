import { jsonStorage } from '$lib/utils/jsonStorage';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    // Read gallery images from JSON file
    const galleryImages = jsonStorage.read('galleryImages', []);
    
    // Process images to ensure they have proper URLs
    const processedImages = galleryImages.map(image => {
      // If the image has a valid URL (starts with http or /), use it as is
      if (!image.src || (image.src.startsWith('http') || image.src.startsWith('/'))) {
        return image;
      }
      
      // Otherwise, assume it's a local path and prepend with /images/
      return {
        ...image,
        src: `/images/${image.src}`
      };
    });
    
    // Return the data to the page
    return {
      galleryImages: processedImages
    };
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return {
      galleryImages: [],
      error: 'Failed to load gallery images'
    };
  }
}
