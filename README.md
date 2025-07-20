# Marksman Shooting Club Website

This is the official website for Marksman Shooting Club based in Jhunjunu, Rajasthan.

## Features

- Responsive landing page showcasing the club's facilities, locations, achievements, and services
- Image gallery with carousel
- Contact form for inquiries
- Static site with hardcoded content for easy deployment

## Color Palette

The website uses the following color palette:
- Primary: #D72638 (Crimson)
- Secondary: #E5E7E6 (Light Gray)
- Tertiary: #B7B5B3 (Gray)
- Dark: #141301 (Almost Black)
- Accent: #211A1D (Dark Gray)

## Gallery Images

Gallery images are hardcoded in the main page component (`src/routes/+page.svelte`). To update gallery images:

1. Add your images to the `static/images/gallery/` directory
2. Update the `carouselImages` array in `src/routes/+page.svelte` with your image paths and captions

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

## Technical Details

- Built with SvelteKit
- Uses Tailwind CSS for styling
- Static site with no backend dependencies
- Gallery images stored in `static/images/gallery/`
- Responsive design optimized for all devices

## Deployment

This is a static site that can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Any web server

No server-side functionality or databases required.
