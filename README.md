# Marksman Shooting Club Website

This is the official website for Marksman Shooting Club based in Jhunjunu, Rajasthan.

## Features

- Responsive landing page showcasing the club's facilities, locations, achievements, and services
- Image gallery with carousel
- Admin panel for managing gallery images
- Contact form for inquiries

## Color Palette

The website uses the following color palette:
- Primary: #D72638 (Crimson)
- Secondary: #E5E7E6 (Light Gray)
- Tertiary: #B7B5B3 (Gray)
- Dark: #141301 (Almost Black)
- Accent: #211A1D (Dark Gray)

## Admin Panel

The website includes an admin panel for managing the gallery images. 

### Accessing the Admin Panel

1. Navigate to `/admin` from the website URL
2. Log in with the admin password: `marksman2024`

### Admin Panel Features

- **Image Management**: Add, remove, and reorder images displayed in the gallery
- **Image Upload**: Upload new images directly from your device
- **Manual URL Entry**: Alternatively, provide a URL for images hosted elsewhere

### Image Upload Functionality

The admin panel supports direct image uploads:

1. Click "Choose Image File" to select an image from your device
2. Click "Upload Image" to upload the selected image to the server
3. The image URL will be automatically filled in the form
4. Add alt text and caption as needed
5. Click "Add to Gallery" to add the image to the carousel

## Technical Details

- Built with SvelteKit
- Uses Tailwind CSS for styling
- Images are stored in the `/static/images/gallery` directory
- Gallery data is stored in the browser's localStorage for persistence

## Development

### Prerequisites

- Node.js
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Run the development server: `npm run dev` or `yarn dev`

### Building for Production

1. Run the build command: `npm run build` or `yarn build`
2. Deploy the generated files from the `build` directory
