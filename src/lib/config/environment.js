// Load environment variables for server-side use
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

/**
 * Server-side environment configuration
 */
export const serverConfig = {
  // Cloudflare R2 configuration
  r2: {
    endpoint: privateEnv.CLOUDFLARE_R2_ENDPOINT || '',
    accessKeyId: privateEnv.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: privateEnv.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
    bucketName: privateEnv.CLOUDFLARE_R2_BUCKET_NAME || 'marksmanclub',
    publicUrl: privateEnv.CLOUDFLARE_R2_PUBLIC_URL || ''
  },
  
  // Admin configuration
  admin: {
    password: privateEnv.ADMIN_PASSWORD || 'marksman2024'
  }
};

/**
 * Client-side safe environment configuration
 */
export const clientConfig = {
  // Public Cloudflare R2 URL (safe to expose to client)
  r2PublicUrl: publicEnv.PUBLIC_R2_URL || ''
};

/**
 * Helper to check if R2 is properly configured
 */
export function isR2Configured() {
  return Boolean(
    serverConfig.r2.endpoint && 
    serverConfig.r2.accessKeyId && 
    serverConfig.r2.secretAccessKey &&
    serverConfig.r2.publicUrl
  );
}
