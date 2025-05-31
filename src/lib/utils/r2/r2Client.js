import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { serverConfig, isR2Configured } from '$lib/config/environment';

// Create an S3 client configured for Cloudflare R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: serverConfig.r2.endpoint,
  credentials: {
    accessKeyId: serverConfig.r2.accessKeyId,
    secretAccessKey: serverConfig.r2.secretAccessKey
  }
});

const BUCKET_NAME = serverConfig.r2.bucketName;

/**
 * Upload a file to Cloudflare R2
 * @param {string} key - The key (path) for the file in R2
 * @param {Buffer} fileBuffer - The file data as a Buffer
 * @param {string} contentType - The MIME type of the file
 * @returns {Promise<string>} - The URL of the uploaded file
 */
export async function uploadToR2(key, fileBuffer, contentType) {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType
    });

    await s3Client.send(command);
    
    // Generate a public URL
    const publicUrl = `${serverConfig.r2.publicUrl}/${key}`;
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to R2:', error);
    throw error;
  }
}

/**
 * Generate a signed URL for temporary access to a file
 * @param {string} key - The key (path) of the file in R2
 * @param {number} expiresIn - Expiration time in seconds
 * @returns {Promise<string>} - A signed URL with temporary access
 */
export async function getSignedR2Url(key, expiresIn = 3600) {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
}

/**
 * Delete a file from R2
 * @param {string} key - The key (path) of the file to delete
 * @returns {Promise<void>}
 */
export async function deleteFromR2(key) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting from R2:', error);
    throw error;
  }
}
