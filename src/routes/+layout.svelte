<script lang="ts">
	import '../app.css';
	let { children } = $props();



	// Navigation links
	const navLinks = [
		{ text: 'Home', href: '/' },
		{ text: 'About', href: '#about' },
		{ text: 'Locations', href: '#locations' },
		{ text: 'Association', href: '#association' },
		{ text: 'Facilities', href: '#facilities' },
		{ text: 'Gallery', href: '#gallery' },
		{ text: 'Achievements', href: '#achievements' },
		{ text: 'Contact', href: '#contact' }
	];

	// Mobile menu state
	let mobileMenuOpen = $state(false);
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<header class="bg-white text-dark shadow-lg z-50 sticky top-0 w-full overflow-hidden">
	<div class="bg-primary text-white py-1 px-4">
		<div class="container mx-auto flex justify-between items-center text-sm">
			<div class="flex items-center gap-6">
				<div class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span class="hidden sm:inline">Monday - Saturday:</span>
					<span>8 am - 9 pm</span>
				</div>
				<div class="hidden md:flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					<span>Jhunjhunu, Rajasthan</span>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
				</svg>
				<a href="tel:+917877393777" class="hover:text-secondary transition-colors">7877 393 777</a>
			</div>
		</div>
	</div>

	<div class="container mx-auto py-4 px-4">
		<nav class="flex items-center justify-between">
			<!-- Logo -->
			<a href="/" class="flex items-center">
				<img src="/images/logo.png" alt="The Marksman Shooting Academy Logo" class="h-16 object-contain">
			</a>

			<!-- Desktop Navigation -->
			<ul class="hidden lg:flex items-center gap-8">
				{#each navLinks as link}
					<li>
						<a href={link.href} class="font-medium text-black hover:text-primary transition-colors">
							{link.text}
						</a>
					</li>
				{/each}
				<li>
					<a href="https://wa.me/917877393777?text=Hi,%20I'd%20like%20to%20know%20more." target="_blank" rel="noopener noreferrer" class="btn-primary">
						Apply Now
					</a>
				</li>
			</ul>

			<!-- Mobile Menu Button -->
			<button 
				class="lg:hidden text-black hover:text-primary p-2 transition-colors" 
				aria-label="Toggle menu"
				on:click={toggleMobileMenu}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</nav>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
				<ul class="flex flex-col gap-4">
					{#each navLinks as link}
						<li>
							<a 
								href={link.href} 
								class="block font-medium text-black hover:text-primary transition-colors"
								on:click={toggleMobileMenu}
							>
								{link.text}
							</a>
						</li>
					{/each}
					<li>
						<a href="https://wa.me/917877393777?text=Hi,%20I'd%20like%20to%20know%20more." target="_blank" rel="noopener noreferrer" class="btn-primary inline-block" on:click={toggleMobileMenu}>
							Book Now
						</a>
					</li>
				</ul>
			</div>
		{/if}
	</div>
</header>

<main class="overflow-x-hidden w-full">
	{@render children()}
</main>

<footer class="bg-dark text-white py-12 w-full overflow-hidden">
	<div class="container">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Company Info -->
			<div>
				<h3 class="text-xl font-bold mb-4 text-primary">The Marksman Shooting Academy</h3>
				<p class="mb-4 text-tertiary">Begin your Shooting journey with us Today.</p>
				<div class="flex gap-4">
					<!-- Social Media Icons -->
					<a href="#" aria-label="Facebook" class="text-tertiary hover:text-primary transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
							<path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
						</svg>
					</a>
					<a href="#" aria-label="Instagram" class="text-tertiary hover:text-primary transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
							<path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.064A5.139 5.139 0 0 0 6.862 12 5.139 5.139 0 0 0 12 17.138 5.139 5.139 0 0 0 17.138 12 5.139 5.139 0 0 0 12 6.862zm0 8.475A3.338 3.338 0 0 1 8.663 12 3.338 3.338 0 0 1 12 8.663 3.338 3.338 0 0 1 15.338 12 3.338 3.338 0 0 1 12 15.337zm6.538-8.684a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-xl font-bold mb-4 text-primary">Company</h3>
				<ul class="space-y-2">
					<li>
						<a href="#about" class="text-tertiary hover:text-primary transition-colors">About</a>
					</li>
					<li>
						<a href="#contact" class="text-tertiary hover:text-primary transition-colors">Contact Us</a>
					</li>
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h3 class="text-xl font-bold mb-4 text-primary">Contact</h3>
				<address class="not-italic text-tertiary space-y-2">
					<p class="flex items-start gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 flex-shrink-0 text-primary">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span>
							4th Floor, Mukund Tower, Near Indian Bank<br>
							Churu Road, Jhunjhunu, Rajasthan, 333001
						</span>
					</p>
					<p class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 flex-shrink-0 text-primary">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
						<span>7877 393 777</span>
					</p>
					<p class="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 flex-shrink-0 text-primary">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<span>shooterdeep777@gmail.com</span>
					</p>
				</address>
			</div>
		</div>
		
		<!-- Copyright -->
		<div class="border-t border-gray-700 mt-8 pt-8 text-center text-tertiary">
			<p>&copy; {new Date().getFullYear()} The Marksman Shooting Academy | All Rights Reserved</p>
		</div>
	</div>
</footer>
