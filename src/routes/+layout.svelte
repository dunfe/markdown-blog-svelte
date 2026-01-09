<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Header, Footer } from '$lib/components';
	import { themeState } from '$lib/theme.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<a
	href="#main-content"
	class="skip-link"
	tabindex="0"
>
	Skip to content
</a>

<div class="flex min-h-screen flex-col">
	<Header />
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
