// Admin utility functions for working with R2 storage

/**
 * Extracts and returns the filename from an R2 URL
 * Example: https://pub-xxxx.r2.dev/gallery/image.jpg → image.jpg
 * 
 * @param {string} url - The R2 URL to parse
 * @returns {string} The extracted filename, or the original URL if parsing fails
 */
export function getFilenameFromR2Url(url) {
  if (!url) return '';
  
  try {
    // Check if it's an R2 URL or a local URL
    if (url.includes('r2.dev') || url.includes('cloudflarestorage.com')) {
      // For R2 URLs, get the last part after the final slash
      const parts = url.split('/');
      return parts[parts.length - 1];
    } else if (url.startsWith('/')) {
      // For local URLs (starting with /), also get the last part
      const parts = url.split('/');
      return parts[parts.length - 1];
    }
    
    // If it doesn't match the expected format, return the original
    return url;
  } catch (error) {
    console.error('Error parsing R2 URL:', error);
    return url;
  }
}

/**
 * Determines if a URL is an R2 URL
 * @param {string} url - The URL to check
 * @returns {boolean} True if it's an R2 URL, false otherwise
 */
export function isR2Url(url) {
  if (!url) return false;
  return url.includes('r2.dev') || url.includes('cloudflarestorage.com');
}

/**
 * Gets the base path of the R2 bucket from a full R2 URL
 * Example: https://pub-xxxx.r2.dev/gallery/image.jpg → https://pub-xxxx.r2.dev
 * 
 * @param {string} url - The R2 URL to parse
 * @returns {string} The base URL without the path
 */
export function getR2BaseUrl(url) {
  if (!url || !isR2Url(url)) return '';
  
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch (error) {
    console.error('Error parsing R2 base URL:', error);
    return '';
  }
}
