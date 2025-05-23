<script>
	import { onMount } from 'svelte';
	
	// Access the data loaded from the server
	/** @type {import('./$types').PageData} */
	export let data;
	
	// Gallery carousel
	let carouselImages = data.galleryImages || [];
	
	// Load images from the server or fallback to localStorage
	onMount(() => {
		// Only start autoplay if there are images
		if (carouselImages.length > 0) {
			// Start autoplay
			autoplayInterval = setInterval(() => {
				nextImage();
			}, 3000); // Change image every 3 seconds
			
			// Clean up interval when component unmounts
			return () => {
				clearInterval(autoplayInterval);
			};
		}
	});
	
	let currentImageIndex = 0;
	let autoplayInterval;
	let isPlaying = true;
	
	function nextImage() {
		if (carouselImages.length === 0) return;
		currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
	}
	
	function prevImage() {
		if (carouselImages.length === 0) return;
		currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
	}
	
	function togglePlayPause() {
		if (carouselImages.length === 0) return;
		
		isPlaying = !isPlaying;
		
		if (isPlaying) {
			autoplayInterval = setInterval(() => {
				nextImage();
			}, 3000);
		} else {
			clearInterval(autoplayInterval);
		}
	}
	
	// onMount function defined above
	
	// Services section data
	const facilities = [
		{
			title: 'Professional Training',
			description: 'Expert coaching from experienced trainers for shooters of all skill levels.',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
		},
		{
			title: 'Competition Training',
			description: 'Specialized training for District, State & National level competitions.',
			icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
		},
		{
			title: 'Modern Ranges',
			description: 'State-of-the-art shooting ranges with professional equipment.',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			title: 'Mental Training',
			description: 'Comprehensive mental discipline and focus training for precision shooting.',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z'
		}
	];

	// Locations/Centers section data
	const locations = [
		{
			name: 'Jhunjunu Center',
			address: '4th Floor, Mukund Tower, Near Indian Bank',
			area: 'Churu Road, Jhunjunu',
			state: 'Rajasthan, 333001',
			phone: '+91 7877 393 777',
			features: ['10m Air Rifle Range', 'Professional Training', 'Competition Practice']
		},
		{
			name: 'Bagar Center',
			address: 'Krishna Complex, BL Chowk Rd',
			area: 'Bagar',
			state: 'Rajasthan, 333023',
			phone: '+91 7877 393 777',
			features: ['Junior Training Programs', 'Beginner Courses', 'Weekend Classes']
		},
		{
			name: 'Pilani Center',
			address: 'Smt. Indramani, Mandelia',
			area: 'Sports Complex, Pilani',
			state: 'Rajasthan, 333031',
			phone: '+91 7877 393 777',
			features: ['Advanced Training', 'Elite Shooter Programs', 'Competition Preparation']
		}
	];

	// Heroes/Shooters section
	const heroes = [
		{
			name: 'Dinesh',
			title: 'SHOOTER',
			achievements: ['National Level Competitor', 'State Gold Medalist']
		},
		{
			name: 'Kapil Nunia',
			title: 'SHOOTER',
			achievements: ['National Medal Winner', 'State Champion']
		}
	];

	// Achievements section data
	const achievements = [
		{
			title: 'DISTRICT SCHOOL GAME',
			icon: 'D',
			points: [
				'02 Gold Medals',
				'02 Silver Medal',
				'02 Bronze Medal',
				'07 student selected for state championship'
			]
		},
		{
			title: 'RAJASTHAN SHOOTING CHAMPIONSHIP',
			icon: 'R',
			points: [
				'02 Shooter Qualify For Pre-National'
			]
		},
		{
			title: 'PRE-NATIONAL',
			icon: 'P',
			points: [
				'02 Shooter Qualify for National'
			]
		},
		{
			title: 'NATIONAL CHAMPIONSHIP',
			icon: 'N',
			points: [
				'03 Shooter Qualify In Rifle Event',
				'02 Shooter qualify in Pistol Event'
			]
		},
		{
			title: 'INDIA TEAM TRIAL',
			icon: 'I',
			points: [
				'01 Shooter Qualify for India Team Trial'
			]
		},
		{
			title: 'INTERNATIONAL',
			icon: 'IN',
			points: [
				'Preparing champions for international competitions'
			]
		}
	];
</script>

<!-- Admin Panel Link - Floating at top right -->
<div class="fixed top-4 right-4 z-50">
	<a href="/admin" class="bg-dark/80 hover:bg-dark text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 text-sm flex items-center gap-2" title="Admin Login">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
		</svg>
		Admin
	</a>
</div>

<!-- Hero Section -->
<section class="relative bg-dark text-white min-h-[90vh] flex items-center">
	<!-- Hero Background -->
	<div class="absolute inset-0 overflow-hidden">
		<!-- Target pattern background -->
		<div class="absolute inset-0 bg-gradient-to-r from-dark to-dark/80 opacity-95"></div>
		<div class="absolute inset-0 opacity-10" style="background-image: url('/images/target-pattern.svg'); background-size: 200px; background-repeat: repeat;"></div>
		<div class="absolute top-0 right-0 w-1/3 h-full opacity-10">
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
				<circle cx="100" cy="0" r="80" fill="#D72638" opacity="0.3"/>
			</svg>
		</div>
	</div>
	
	<div class="container relative z-10">
		<div class="max-w-2xl">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
				<span class="text-primary">Train with Precision</span><br>
				<span class="text-secondary">Shoot with Confidence</span>
			</h1>
			<p class="text-lg md:text-xl text-tertiary mb-8">Discover the rewarding world of target shooting with us. Experience the thrill of hitting your target and the satisfaction of developing your marksmanship skills.</p>
			<div class="flex flex-wrap gap-4">
				<a href="#contact" class="btn-primary">
					Start Now
				</a>
				<a href="tel:+917877393777" class="btn-outline">
					<span class="mr-2">Call Now:</span> 7877 393 777
				</a>
			</div>
			
			<div class="mt-12 grid grid-cols-2 gap-8">
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-primary">100+</div>
					<div class="text-lg text-tertiary">Shooters Trained</div>
				</div>
				<div class="text-center">
					<div class="text-3xl md:text-4xl font-bold text-primary">18+</div>
					<div class="text-lg text-tertiary">Years Of Experience</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- About Section -->
<section id="about" class="section bg-white">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">About <span class="text-primary">Marksman</span></h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">Discover a supportive learning environment.</p>
		</div>
		
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div>
				<p class="mb-6">We are dedicated to helping individuals unlock their potential as shooters. Shooting sports are unique in that they require physical skill, mental discipline, and a strong commitment to continuous improvement.</p>
				<p class="mb-6">With the right training and guidance, every person can experience the rewarding feeling of reaching new levels of accuracy and proficiency.</p>
				
				<div class="space-y-6">
					<div class="bg-secondary p-6 rounded-lg">
						<h3 class="text-xl font-bold mb-3 flex items-center">
							<svg class="w-6 h-6 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Focus on Individualized Attention
						</h3>
						<p class="text-gray-700">Every Shooter is individually assisted in every step of the practice including mental and physical Training.</p>
					</div>
					
					<div class="bg-secondary p-6 rounded-lg">
						<h3 class="text-xl font-bold mb-3 flex items-center">
							<svg class="w-6 h-6 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Train For Competition
						</h3>
						<p class="text-gray-700">We take all our students to various shooting competitions and make them compete on District, State & National Level.</p>
					</div>
				</div>
			</div>
			
			<div class="relative">
				<!-- Placeholder image -->
				<div class="w-full h-96 bg-tertiary rounded-lg overflow-hidden">
					<img src="/images/home-image.jpg" alt="About Marksman Shooting Club" class="w-full h-full object-cover">
				</div>
				<!-- Enhanced decorative element with target pattern and shooting theme -->
				<div class="absolute -bottom-6 -left-6 w-48 h-48 bg-primary rounded-lg hidden md:flex flex-col items-center justify-center overflow-hidden shadow-lg">
					<!-- Target pattern background -->
					<div class="absolute inset-0 opacity-20" style="background-image: url('/images/target-pattern.svg'); background-size: 150px; background-repeat: no-repeat; background-position: center;"></div>
					<!-- Content -->
					<div class="relative z-10 text-center p-2">
						<span class="text-white text-lg font-bold">10+</span>
						<p class="text-white text-xs">Years Experience</p>
						<div class="w-12 h-12 mx-auto mt-2 rounded-full border-2 border-white/80 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
							</svg>
						</div>
						<p class="text-white text-xs mt-1">Precision Training</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Locations/Centers Section -->
<section id="locations" class="section bg-secondary">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Our <span class="text-primary">Locations</span></h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">Visit one of our three training centers in Jhunjunu, Rajasthan.</p>
		</div>
		
		<div class="grid md:grid-cols-3 gap-8">
			{#each locations as location, index}
				<div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
					<!-- Center image -->
					<div class="w-full h-48 bg-tertiary rounded-md mb-4 overflow-hidden">
						{#if index === 0}
							<img src="/images/centers/jhunjunu.jpg" alt="Jhunjunu Center" class="w-full h-full object-cover">
						{:else if index === 1}
							<img src="/images/centers/bagar.jpg" alt="Bagar Center" class="w-full h-full object-cover">
						{:else if index === 2}
							<img src="/images/centers/pilani.png" alt="Pilani Center" class="w-full h-full object-cover">
						{:else}
							<div class="w-full h-full bg-primary/10 flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
								</svg>
							</div>
						{/if}
					</div>
					<h3 class="text-xl font-bold mb-3 text-primary">{location.name}</h3>
					<address class="not-italic mb-4 text-gray-700">
						<p>{location.address}</p>
						<p>{location.area}</p>
						<p>{location.state}</p>
						<p class="mt-2 font-semibold">Phone: {location.phone}</p>
					</address>
					
					<div class="border-t pt-4 mt-4">
						<h4 class="font-semibold mb-2">Features:</h4>
						<ul class="space-y-1">
							{#each location.features as feature}
								<li class="flex items-center">
									<svg class="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
									{feature}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Facilities Section -->
<section id="facilities" class="section bg-white">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Our <span class="text-primary">Facilities</span></h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive training and world-class shooting ranges.</p>
		</div>
		
		<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each facilities as facility}
				<div class="bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
					<div class="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={facility.icon} />
						</svg>
					</div>
					<h3 class="text-xl font-bold mb-2">{facility.title}</h3>
					<p class="text-gray-600">{facility.description}</p>
				</div>
			{/each}
		</div>
		
		<div class="mt-12 text-center">
			<a href="#contact" class="btn-primary">
				Book your Range Today
			</a>
		</div>
	</div>
</section>

<!-- Gallery Section -->
<section id="gallery" class="section bg-tertiary">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Our <span class="text-primary">Gallery</span></h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">Take a look at our training facilities and shooting ranges.</p>
		</div>
		
		{#if carouselImages.length > 0}
		<!-- Carousel Component -->
		<div class="relative max-w-4xl mx-auto mb-16 overflow-hidden rounded-lg shadow-lg bg-white">
			<!-- Main carousel image -->
			<div class="relative w-full h-[500px] overflow-hidden">
				{#each carouselImages as image, index}
					<!-- Only show current image -->
					<div class="absolute inset-0 transition-opacity duration-500 ease-in-out"
					style="opacity: {index === currentImageIndex ? '1' : '0'}">
					{#if image.src.startsWith('/images/')}
					 <!-- Actual image when available -->
					<img 
					src={image.src} 
					alt={image.alt} 
					 class="w-full h-full object-cover"
					 />
					{:else}
					 <!-- Placeholder with icon -->
							<div class="w-full h-full bg-primary/10 flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
							</div>
						{/if}
						
						<!-- Caption overlay -->
						<div class="absolute bottom-0 left-0 right-0 bg-dark/70 text-white p-4">
							<p class="text-lg font-semibold">{image.caption}</p>
						</div>
					</div>
				{/each}
			</div>
			
			<!-- Navigation buttons -->
			<button 
				class="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white rounded-full p-2 focus:outline-none z-10"
				on:click={prevImage}
				aria-label="Previous image"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			
			<!-- Indicators -->
			<div class="absolute bottom-24 left-0 right-0 flex justify-center space-x-2 pb-4">
				{#each carouselImages as _, index}
					<button 
						class="w-3 h-3 rounded-full focus:outline-none transition-colors duration-200 ease-in-out {index === currentImageIndex ? 'bg-primary' : 'bg-white/50'}"
						on:click={() => currentImageIndex = index}
						aria-label="Go to slide {index + 1}"
					></button>
				{/each}
			</div>
			
			<button 
				class="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white rounded-full p-2 focus:outline-none z-10"
				on:click={nextImage}
				aria-label="Next image"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
			
			<!-- Play/Pause Button -->
			<button 
				class="absolute left-1/2 transform -translate-x-1/2 bottom-4 bg-primary/80 hover:bg-primary text-white rounded-full p-2 focus:outline-none z-10"
				on:click={togglePlayPause}
				aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
			>
				{#if isPlaying}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" />
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
					</svg>
				{/if}
			</button>
		</div>
		
		<!-- Thumbnail Grid -->
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
			{#each carouselImages as image, index}
				<button
					class="overflow-hidden rounded-lg bg-white h-24 relative border-2 {index === currentImageIndex ? 'border-primary' : 'border-transparent'} transition-colors duration-200"
					on:click={() => currentImageIndex = index}
				>
					{#if image.src.startsWith('/images/')}
						<!-- Actual image when available -->
						<img 
							src={image.src} 
							alt={image.alt} 
							class="w-full h-full object-cover"
						/>
					{:else}
						<!-- Placeholder with icon -->
						<div class="absolute inset-0 bg-primary/10 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
		{:else}
		<!-- Empty gallery state -->
		<div class="bg-white p-8 rounded-lg text-center max-w-4xl mx-auto">
			<div class="mb-4 text-primary/50">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-xl font-semibold mb-2">Gallery is Empty</h3>
			<p class="text-gray-600">Please log into the admin panel to add images to the gallery.</p>
		</div>
		{/if}
	</div>
</section>

<!-- Heroes Section -->
<section id="heroes" class="section bg-dark text-white">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Our <span class="text-primary">Heroes</span></h2>
			<p class="text-lg text-tertiary mb-6">Champions who started their journey with us</p>
			<div class="max-w-3xl mx-auto">
				<p class="mb-8">The Marksman Shooting Academy has produced numerous champions at district, state, and national levels. Our training methodology and world-class facilities help shooters achieve their potential and excel in competitions.</p>
			</div>
		</div>
		
		<div class="grid md:grid-cols-2 gap-8">
			{#each heroes as hero}
				<div class="bg-accent/30 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center md:items-start gap-6">
					<!-- Placeholder image -->
					<div class="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-primary/50">
						<div class="w-full h-full bg-primary/20 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
					</div>
					
					<div class="flex-1 text-center md:text-left">
						<h3 class="text-2xl font-bold mb-1 text-white">{hero.name}</h3>
						<p class="text-primary font-semibold mb-3 inline-block px-3 py-1 bg-primary/20 rounded-full text-sm">{hero.title}</p>
						
						<div class="space-y-2 mb-4">
							{#each hero.achievements as achievement}
								<p class="flex items-start md:items-center gap-2">
									<svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5 md:mt-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
									</svg>
									<span class="text-tertiary">{achievement}</span>
								</p>
							{/each}
						</div>
						
						<a href="#contact" class="inline-flex items-center text-primary hover:text-white transition-colors duration-200">
							<span>Train with us</span>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
							</svg>
						</a>
					</div>
				</div>
			{/each}
			
			<div class="md:col-span-2 mt-8 py-8 px-6 bg-primary/20 rounded-lg text-center">
				<h3 class="text-2xl font-bold mb-4">You Could Be <span class="text-primary">Next</span></h3>
				<p class="text-lg mb-6 max-w-2xl mx-auto">Join our academy and train to become our next champion shooter! Our expert coaches are ready to help you achieve excellence.</p>
				<a href="#contact" class="btn-primary">
					Start Your Journey
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Achievements Section -->
<section id="achievements" class="section bg-secondary">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Our <span class="text-primary">Achievements</span></h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">The remarkable success story of our shooters at various levels.</p>
		</div>
		
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each achievements as achievement}
				<div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
					<div class="flex items-center gap-4 mb-4">
						<div class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
							{achievement.icon}
						</div>
						<h3 class="text-xl font-bold">{achievement.title}</h3>
					</div>
					
					{#if achievement.points.length > 0}
						<ul class="space-y-2">
							{#each achievement.points as point}
								<li class="flex items-start gap-2">
									<svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
									</svg>
									<span>{point}</span>
								</li>
							{/each}
						</ul>
					{:else}
						<p class="text-gray-600 italic">Coming soon</p>
					{/if}
				</div>
			{/each}
		</div>
		
		<div class="mt-12 text-center">
			<p class="text-lg mb-6 max-w-3xl mx-auto">Join Marksman Shooting Club and become part of our ever-growing list of champions!</p>
			<a href="#contact" class="btn-primary">
				Start Your Journey to Success
			</a>
		</div>
	</div>
</section>

<!-- Contact Section -->
<section id="contact" class="section bg-secondary">
	<div class="container">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Contact <span class="text-primary">Us</span></h2>
			<p class="text-lg text-gray-600 max-w-3xl mx-auto">Book your Range Today and begin your shooting journey.</p>
		</div>
		
		<div class="grid md:grid-cols-2 gap-12">
			<div>
				<form class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
						<input 
							type="text" 
							id="name" 
							name="name" 
							placeholder="Your full name" 
							class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
						<input 
							type="email" 
							id="email" 
							name="email" 
							placeholder="Your email address" 
							class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
						<input 
							type="tel" 
							id="phone" 
							name="phone" 
							placeholder="Your phone number" 
							class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
						<textarea 
							id="message" 
							name="message" 
							rows="4" 
							placeholder="Your message" 
							class="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							required
						></textarea>
					</div>
					<div>
						<button type="submit" class="btn-primary w-full">
							Send Message
						</button>
					</div>
				</form>
			</div>
			
			<div>
				<div class="bg-white p-6 rounded-lg shadow-md mb-8">
					<h3 class="text-xl font-bold mb-4">Visit Us</h3>
					<address class="not-italic text-gray-600 space-y-3 mb-6">
						<p class="flex items-start gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-primary flex-shrink-0">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span>
								4th Floor, Mukund Tower, Near Indian Bank<br>
								Churu Road, Jhunjunu, Rajasthan, 333001
							</span>
						</p>
						<p class="flex items-center gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-primary flex-shrink-0">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
							</svg>
							<span>+91 7877 393 777</span>
						</p>
						<p class="flex items-center gap-3">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-primary flex-shrink-0">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							<span>shooterdeep777@gmail.com</span>
						</p>
					</address>
					
					<h3 class="text-xl font-bold mb-4">Opening Hours</h3>
					<div class="space-y-2 text-gray-600">
						<div class="flex justify-between">
							<span>Monday - Saturday</span>
							<span>8:00 AM - 9:00 PM</span>
						</div>
						<div class="flex justify-between">
							<span>Sunday</span>
							<span>Closed</span>
						</div>
					</div>
				</div>
				
				<div class="bg-dark text-white p-6 rounded-lg">
					<h3 class="text-xl font-bold mb-4 text-primary">Subscribe for updates</h3>
					<p class="text-tertiary mb-4">Stay updated with our latest news, events, and offers.</p>
					<form class="flex gap-2">
						<input 
							type="email" 
							placeholder="Your email address" 
							class="flex-1 px-4 py-3 rounded-md border border-gray-700 bg-accent/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
							required
						/>
						<button type="submit" class="btn-primary whitespace-nowrap">
							Subscribe
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
