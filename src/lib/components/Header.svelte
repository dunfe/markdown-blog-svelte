<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$lib/config';
	import ThemeToggle from './ThemeToggle.svelte';

	let isMenuOpen = $state(false);

	const handleToggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const handleCloseMenu = () => {
		isMenuOpen = false;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleToggleMenu();
		}
	};
</script>

<header
	class="sticky top-0 z-40 w-full border-b border-light-overlay/50 bg-light-base/80 backdrop-blur-xl dark:border-overlay/50 dark:bg-base/80"
>
	<div class="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
		<!-- Logo -->
		<a
			href="/"
			class="group flex items-center gap-2 text-xl font-bold tracking-tight text-light-text no-underline transition-colors hover:text-light-mauve dark:text-text dark:hover:text-mauve"
			aria-label="Home"
		>
			<span
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-light-lavender to-light-blue text-light-base transition-transform group-hover:scale-110 dark:from-lavender dark:to-blue dark:text-base"
			>
				M
			</span>
			<span class="hidden sm:inline">{siteConfig.title}</span>
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden items-center gap-1 md:flex" aria-label="Main navigation">
			{#each siteConfig.navigation as item}
				<a
					href={item.href}
					class="rounded-lg px-3 py-2 text-sm font-medium text-light-text no-underline transition-colors hover:bg-light-surface hover:text-light-mauve dark:text-text dark:hover:bg-surface dark:hover:text-mauve"
					class:bg-light-surface={page.url.pathname === item.href}
					class:text-light-text={page.url.pathname === item.href}
					class:dark:bg-surface={page.url.pathname === item.href}
					class:dark:text-text={page.url.pathname === item.href}
					aria-current={page.url.pathname === item.href ? 'page' : undefined}
				>
					{item.title}
				</a>
			{/each}
		</nav>

		<!-- Right section -->
		<div class="flex items-center gap-2">
			<!-- Mobile menu button -->
			<button
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-light-subtext transition-colors hover:bg-light-surface hover:text-light-text md:hidden dark:text-subtext dark:hover:bg-surface dark:hover:text-text"
				onclick={handleToggleMenu}
				onkeydown={handleKeyDown}
				aria-expanded={isMenuOpen}
				aria-controls="mobile-menu"
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Navigation -->
	{#if isMenuOpen}
		<nav
			id="mobile-menu"
			class="border-t border-light-overlay/50 bg-light-base px-4 py-4 md:hidden dark:border-overlay/50 dark:bg-base"
			aria-label="Mobile navigation"
		>
			<div class="flex flex-col gap-1">
				{#each siteConfig.navigation as item}
					<a
						href={item.href}
						class="rounded-lg px-3 py-2 text-sm font-medium text-light-text no-underline transition-colors hover:bg-light-surface hover:text-light-mauve dark:text-text dark:hover:bg-surface dark:hover:text-mauve"
						class:bg-light-surface={page.url.pathname === item.href}
						class:text-light-text={page.url.pathname === item.href}
						class:dark:bg-surface={page.url.pathname === item.href}
						class:dark:text-text={page.url.pathname === item.href}
						onclick={handleCloseMenu}
						aria-current={page.url.pathname === item.href ? 'page' : undefined}
					>
						{item.title}
					</a>
				{/each}
			</div>
		</nav>
	{/if}
</header>
