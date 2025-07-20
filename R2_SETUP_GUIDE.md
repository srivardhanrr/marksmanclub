# R2 Setup Guide

This file is no longer needed since the website has been simplified to use static gallery images.

Gallery images are now hardcoded in the main page component and served from the `static/images/gallery/` directory.

## Migration Note

If you want to update gallery images:
1. Add images to `static/images/gallery/`
2. Update the `carouselImages` array in `src/routes/+page.svelte`
