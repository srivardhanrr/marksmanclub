# Cloudflare R2 Setup Guide for Marksman Club

This guide will walk you through setting up Cloudflare R2 storage for your image uploads in the Marksman Club application.

## Prerequisites

1. A Cloudflare account
2. R2 storage enabled in your Cloudflare account (requires billing setup)

## Step 1: Create an R2 Bucket in Cloudflare

1. Log in to your Cloudflare dashboard
2. Navigate to "R2" in the sidebar
3. Click "Create bucket"
4. Name your bucket `marksmanclub` (or any name you prefer)
5. Click "Create bucket"

## Step 2: Set Up Public Access for Your Bucket

1. In your R2 dashboard, click on your newly created bucket
2. Go to the "Settings" tab
3. Under "Public Access", enable "Public Access"
4. This will generate a URL like `https://pub-xxxxxxxx.r2.dev`
5. Copy this URL for use in your environment variables

## Step 3: Create R2 API Tokens

1. In your Cloudflare dashboard, go to "Account" > "API Tokens"
2. Click "Create Token"
3. Choose "Create Custom Token"
4. Give it a name like "Marksman Club R2 Access"
5. Under "Permissions", add:
   - R2 > Bucket > Edit
   - R2 > Object > Edit
6. Under "Resources", select "Include" > "All resources"
7. Click "Continue to summary" and then "Create Token"
8. Copy the Access Key ID and Secret Access Key

## Step 4: Configure Environment Variables

Create a `.env` file in the root of your project with the following values:

```
CLOUDFLARE_R2_ENDPOINT=https://xxxxxx.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-access-key
CLOUDFLARE_R2_BUCKET_NAME=marksmanclub
CLOUDFLARE_R2_PUBLIC_URL=https://pub-xxxxxx.r2.dev
```

Replace the placeholders with your actual values:
- `xxxxxx` in the endpoint URL should be your Cloudflare account ID
- `your-access-key-id` and `your-secret-access-key` should be the values you copied in Step 3
- `pub-xxxxxx.r2.dev` should be the public URL you copied in Step 2

## Step 5: Restart Your Development Server

After setting up the environment variables, restart your development server to apply the changes:

```
npm run dev
```

## Testing Your Setup

1. Go to the admin panel (http://localhost:5173/admin)
2. Log in with your admin password
3. Upload an image using the image upload feature
4. If the upload is successful, you should see a success message with "Cloudflare R2" indicator
5. The image should be stored in your R2 bucket and accessible via the public URL

## Fallback Mechanism

If R2 is not configured properly, the system will automatically fall back to local storage. You'll see a "Local Storage" indicator instead of "Cloudflare R2" after uploading an image.

## Production Deployment

When deploying to production, make sure to set the environment variables in your hosting platform's environment configuration.
