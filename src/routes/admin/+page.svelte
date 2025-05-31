<script>
	// Import dependencies
	import { onMount } from 'svelte';
	import { isR2Url, getFilenameFromR2Url } from '$lib/utils/r2/adminHelpers';
	
	// SvelteKit data props (from +page.server.js)
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Authentication State
	let isAuthenticated = false;
	let password = '';
	let errorMessage = '';
	let loading = false;
	
	// Admin Password - In a real app, this would be stored securely and validated on the server
	const ADMIN_PASSWORD = 'marksman2024';
	
	// Gallery Management
	let galleryImages = data.galleryImages || [];
	let newImageUrl = '';
	let newImageAlt = '';
	let newImageCaption = '';
	
	// Upload and storage status
	let uploadedImage = null;
	let uploadProgress = 0;
	let isUploading = false;
	let storageType = ''; // Will be 'R2' or 'local'
	
	onMount(() => {
		// Check if there's a stored authentication token in sessionStorage
		const authToken = sessionStorage.getItem('adminAuthToken');
		if (authToken === 'marksman-admin-authenticated') {
			isAuthenticated = true;
		}
	});
	
	function authenticate() {
		loading = true;
		errorMessage = '';
		
		// Simulate server authentication (would be an API call in production)
		setTimeout(() => {
			if (password === ADMIN_PASSWORD) {
				isAuthenticated = true;
				sessionStorage.setItem('adminAuthToken', 'marksman-admin-authenticated');
			} else {
				errorMessage = 'Invalid password. Please try again.';
			}
			loading = false;
			password = '';
		}, 800);
	}
	
	function logout() {
		isAuthenticated = false;
		sessionStorage.removeItem('adminAuthToken');
	}
	
	// Refresh gallery data from the server
	async function refreshGalleryImages() {
		try {
			// Fetch fresh data from the server
			const response = await fetch('/api/gallery');
			const data = await response.json();
			
			if (data.success) {
				galleryImages = data.images || [];
				// Also store in localStorage as a backup/cache
				localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
			} else {
				console.error('Failed to load gallery images:', data.message);
			}
		} catch (error) {
			console.error('Error refreshing gallery images:', error);
		}
	}
	
	// Update images on the server using form action
	function updateGalleryImages() {
		// Store in localStorage as a backup/cache
		localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
		
		// Use the hidden form to submit the data
		const galleryForm = document.getElementById('galleryForm');
		const galleryInput = document.getElementById('galleryInput');
		
		if (galleryForm && galleryInput) {
			galleryInput.value = JSON.stringify(galleryImages);
			galleryForm.requestSubmit();
		}
	}
	
	async function handleFileUpload(event) {
		const file = event.target.files[0];
		if (!file) return;
		
		if (!file.type.startsWith('image/')) {
			errorMessage = 'Please select an image file';
			return;
		}
		
		// Read the file as Data URL
		const reader = new FileReader();
		reader.onload = (e) => {
			uploadedImage = {
				file,
				preview: e.target.result,
				name: file.name
			};
		};
		reader.readAsDataURL(file);
	}
	
	async function uploadImage() {
		if (!uploadedImage) {
			errorMessage = 'Please select an image to upload';
			return;
		}
		
		isUploading = true;
		uploadProgress = 10;
		errorMessage = '';
		
		try {
			// Generate a unique filename
			const timestamp = new Date().getTime();
			const fileExtension = uploadedImage.name.split('.').pop();
			const filename = `gallery-${timestamp}.${fileExtension}`;
			
			uploadProgress = 30;
			
			// Send image to server
			const response = await fetch('/admin/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					image: uploadedImage.preview,
					filename
				})
			});
			
			uploadProgress = 70;
			
			const result = await response.json();
			
			if (result.success) {
				// Set the URL in the form
				newImageUrl = result.url;
				storageType = result.storageType || 'local';
				uploadProgress = 100;
				setTimeout(() => {
					uploadProgress = 0;
					isUploading = false;
				}, 500);
			} else {
				errorMessage = result.message || 'Failed to upload image';
				isUploading = false;
				uploadProgress = 0;
			}
		} catch (error) {
			console.error('Upload error:', error);
			errorMessage = 'Failed to upload image: ' + error.message;
			isUploading = false;
			uploadProgress = 0;
		}
	}
	
	function addImage() {
		// If no URL is entered and no image is uploaded, show error
		if (newImageUrl.trim() === '' && !uploadedImage) {
			errorMessage = 'Please upload an image or provide an image URL';
			return;
		}
		
		// Add the image to gallery
		galleryImages = [
			...galleryImages,
			{
				src: newImageUrl || (uploadedImage ? uploadedImage.preview : ''),
				alt: newImageAlt || 'Marksman Shooting Club',
				caption: newImageCaption || 'Marksman Shooting Club'
			}
		];
		
		updateGalleryImages();
		
		// Reset form
		newImageUrl = '';
		newImageAlt = '';
		newImageCaption = '';
		uploadedImage = null;
		errorMessage = '';
	}
	
	function removeImage(index) {
		galleryImages = galleryImages.filter((_, i) => i !== index);
		updateGalleryImages();
	}
	
	function moveImageUp(index) {
		if (index <= 0) return;
		const newImages = [...galleryImages];
		[newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
		galleryImages = newImages;
		updateGalleryImages();
	}
	
	function moveImageDown(index) {
		if (index >= galleryImages.length - 1) return;
		const newImages = [...galleryImages];
		[newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
		galleryImages = newImages;
		updateGalleryImages();
	}
</script>

<svelte:head>
	<title>Admin Panel - Marksman Shooting Club</title>
</svelte:head>

<main class="min-h-screen bg-gray-100">
	{#if !isAuthenticated}
		<!-- Login Screen -->
		<div class="min-h-screen flex items-center justify-center bg-tertiary">
			<div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
				<div class="text-center mb-8">
					<h1 class="text-2xl font-bold text-dark">Admin Login</h1>
					<p class="text-gray-600 mt-2">Marksman Shooting Club</p>
				</div>
				
				<form on:submit|preventDefault={authenticate} class="space-y-6">
					{#if errorMessage}
						<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{errorMessage}
						</div>
					{/if}
					
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700 mb-1">Admin Password</label>
						<input 
							type="password" 
							id="password" 
							bind:value={password}
							class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							required
						/>
					</div>
					
					<div>
						<button 
							type="submit" 
							class="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition duration-200 flex items-center justify-center"
							disabled={loading}
						>
							{#if loading}
								<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Authenticating...
							{:else}
								Login
							{/if}
						</button>
					</div>
				</form>
				
				<div class="mt-8 text-center">
					<a href="/" class="text-primary hover:underline">Back to Website</a>
				</div>
			</div>
		</div>
	{:else}
		<!-- Admin Dashboard -->
		<div class="bg-gray-100 min-h-screen">
			<!-- Admin Header -->
			<header class="bg-dark text-white py-4 shadow-md">
				<div class="container mx-auto px-4 flex justify-between items-center">
					<h1 class="text-xl font-bold">Marksman Admin Panel</h1>
					<div class="flex items-center gap-4">
						<a 
							href="/" 
							target="_blank"
							class="text-tertiary hover:text-white transition-colors"
						>
							View Website
						</a>
						<button 
							on:click={logout}
							class="bg-primary px-4 py-2 rounded hover:bg-primary/90 transition-colors"
						>
							Logout
						</button>
					</div>
				</div>
			</header>
			
			<!-- Admin Content -->
			<div class="container mx-auto p-4 mt-8">
				<!-- Hidden form for saving gallery images -->
				<form method="POST" action="?/saveGallery" id="galleryForm" class="hidden">
					<input type="hidden" name="galleryImages" id="galleryInput" value="" />
				</form>
				<div class="bg-white rounded-lg shadow-md p-6 mb-8">
					<h2 class="text-2xl font-bold mb-4">Gallery Management</h2>
					<p class="text-gray-600 mb-6">Add, remove, or reorder images displayed in the gallery carousel.</p>
					
					<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<svg class="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
								</svg>
							</div>
							<div class="ml-3">
								<p class="text-sm text-blue-700">
									Images are now stored in Cloudflare R2 for better performance and reliability.
								</p>
							</div>
						</div>
					</div>
					
					<!-- Add New Image Form -->
					<div class="bg-tertiary/20 p-6 rounded-lg mb-8">
						<h3 class="text-xl font-bold mb-4">Add New Image</h3>
						
						{#if errorMessage}
							<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
								{errorMessage}
							</div>
						{/if}
						
						<!-- Image Upload -->
						<div class="mb-6 p-4 border border-dashed border-gray-300 rounded-lg">
							<h4 class="font-semibold mb-2">Upload Image <span class="text-primary text-sm">(Cloudflare R2 Storage)</span></h4>
							
							<div class="flex flex-col sm:flex-row gap-4 items-start mb-4">
								<div class="flex-1">
									<label class="block mb-2 text-sm font-medium text-gray-700" for="file_input">Choose Image File</label>
									<input 
										class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
										id="file_input" 
										type="file" 
										accept="image/*"
										on:change={handleFileUpload}
										disabled={isUploading}
									/>
									<p class="mt-1 text-xs text-gray-500">PNG, JPG, or GIF.</p>
								</div>
								
								{#if uploadedImage}
									<div class="w-24 h-24 relative flex-shrink-0">
										<img 
											src={uploadedImage.preview} 
											alt="Upload preview" 
											class="w-full h-full object-cover rounded-lg border border-gray-300" 
										/>
										<button 
											type="button" 
											class="absolute -top-2 -right-2 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center"
											on:click={() => uploadedImage = null}
											disabled={isUploading}
										>
											✕
										</button>
									</div>
								{/if}
							</div>
							
							{#if isUploading}
								<div class="w-full bg-gray-200 rounded-full h-2.5 mb-4">
									<div 
										class="bg-primary h-2.5 rounded-full transition-all duration-300" 
										style="width: {uploadProgress}%"
									></div>
								</div>
							{/if}
							
							<button 
								type="button" 
								class="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
								on:click={uploadImage}
								disabled={!uploadedImage || isUploading}
							>
								{#if isUploading}
									Uploading...
								{:else}
									Upload Image
								{/if}
							</button>
							
							{#if uploadedImage && newImageUrl}
								<div class="mt-2 bg-green-50 border border-green-200 rounded p-3">
									<div class="flex items-center gap-2 text-green-700">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
										</svg>
										<span class="text-sm">Upload successful!</span>
										{#if storageType === 'R2'}
											<span class="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">Cloudflare R2</span>
										{:else}
											<span class="text-xs bg-gray-100 text-gray-800 px-1 py-0.5 rounded">Local Storage</span>
										{/if}
									</div>
									<p class="text-xs text-gray-600 mt-1 break-all">{newImageUrl}</p>
								</div>
							{/if}
						</div>
						
						<form on:submit|preventDefault={addImage} class="space-y-4">
							<div>
								<label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-1">Image URL {uploadedImage ? '(optional when using upload)' : '*'}</label>
								<input 
									type="text" 
									id="imageUrl" 
									bind:value={newImageUrl}
									placeholder="https://example.com/image.jpg"
									class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									{...(uploadedImage ? {} : {required: true})}
								/>
								<p class="text-xs text-gray-500 mt-1">Enter the full URL of the image or upload an image above.</p>
							</div>
							
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label for="imageAlt" class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
									<input 
										type="text" 
										id="imageAlt" 
										bind:value={newImageAlt}
										placeholder="Indoor shooting range"
										class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									/>
								</div>
								
								<div>
									<label for="imageCaption" class="block text-sm font-medium text-gray-700 mb-1">Caption</label>
									<input 
										type="text" 
										id="imageCaption" 
										bind:value={newImageCaption}
										placeholder="Our state-of-the-art indoor range"
										class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
									/>
								</div>
							</div>
							
							<div>
								<button 
									type="submit" 
									class="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors"
								>
									Add to Gallery
								</button>
							</div>
						</form>
					</div>
					
					<!-- Current Images List -->
					<div>
						<h3 class="text-xl font-bold mb-4">Current Gallery Images <button 
									on:click={refreshGalleryImages}
									class="ml-2 text-sm font-normal bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
									title="Refresh from server"
								>Refresh</button></h3>
						
						{#if galleryImages.length === 0}
							<p class="text-gray-600 italic">No images in gallery. Add your first image above.</p>
						{:else}
							<div class="overflow-x-auto w-full">
								<table class="min-w-full bg-white border border-gray-200">
									<thead>
										<tr>
											<th class="p-3 border-b border-gray-200 text-left">#</th>
											<th class="p-3 border-b border-gray-200 text-left">Preview</th>
											<th class="p-3 border-b border-gray-200 text-left">Details</th>
											<th class="p-3 border-b border-gray-200 text-center">Actions</th>
										</tr>
									</thead>
									<tbody>
										{#each galleryImages as image, index}
											<tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
												<td class="p-3 border-b border-gray-200">{index + 1}</td>
												<td class="p-3 border-b border-gray-200">
													<div class="w-24 h-16 bg-gray-200 relative overflow-hidden rounded">
														{#if image.src.startsWith('/images/') || isR2Url(image.src)}
															<!-- Actual image preview -->
															<img 
																src={image.src} 
																alt={image.alt} 
																class="w-full h-full object-cover"
															/>
														{:else}
															<!-- Placeholder icon -->
															<div class="absolute inset-0 flex items-center justify-center bg-primary/10 text-primary">
																<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
																	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
																</svg>
															</div>
														{/if}
													</div>
												</td>
												<td class="p-3 border-b border-gray-200">
													<div class="space-y-1">
														<div class="font-medium truncate max-w-xs">
															{#if isR2Url(image.src)}
																<span class="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">R2</span>
																{getFilenameFromR2Url(image.src)}
															{:else}
																{image.src}
															{/if}
														</div>
														<div class="text-sm text-gray-600 truncate max-w-xs">Alt: {image.alt}</div>
														<div class="text-sm text-gray-600 truncate max-w-xs">Caption: {image.caption}</div>
													</div>
												</td>
												<td class="p-3 border-b border-gray-200 flex gap-2 justify-center">
													<button 
														on:click={() => moveImageUp(index)}
														class="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
														disabled={index === 0}
														title="Move Up"
													>
														<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
														</svg>
													</button>
													
													<button 
														on:click={() => moveImageDown(index)}
														class="p-2 text-gray-600 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
														disabled={index === galleryImages.length - 1}
														title="Move Down"
													>
														<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
														</svg>
													</button>
													
													<button 
														on:click={() => removeImage(index)}
														class="p-2 text-red-600 hover:text-red-800"
														title="Remove"
													>
														<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
														</svg>
													</button>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
							
							<div class="mt-4 text-gray-600 text-sm">
								Images will appear in the order shown above. You can reorder them using the up/down arrows.
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	:global(body) {
		background-color: #E5E7E6;
	}
</style>
