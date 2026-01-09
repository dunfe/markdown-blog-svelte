<script lang="ts">
	import { page } from '$app/state';
	import { siteConfig } from '$lib/config';

	interface Props {
		title?: string;
		description?: string;
		image?: string;
		type?: 'website' | 'article';
		publishedTime?: string;
		tags?: string[];
		noindex?: boolean;
	}

	let {
		title,
		description = siteConfig.description,
		image = siteConfig.defaultOgImage,
		type = 'website',
		publishedTime,
		tags = [],
		noindex = false
	}: Props = $props();

	const pageTitle = $derived(title ? `${title} | ${siteConfig.title}` : siteConfig.title);
	const canonicalUrl = $derived(`${siteConfig.url}${page.url.pathname}`);
	const ogImage = $derived(image?.startsWith('http') ? image : `${siteConfig.url}${image}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={siteConfig.title} />

	{#if type === 'article' && publishedTime}
		<meta property="article:published_time" content={publishedTime} />
		<meta property="article:author" content={siteConfig.author.name} />
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:site" content={siteConfig.author.twitter} />
	<meta name="twitter:creator" content={siteConfig.author.twitter} />

	<!-- Additional meta -->
	<meta name="author" content={siteConfig.author.name} />
	{#if tags.length > 0}
		<meta name="keywords" content={tags.join(', ')} />
	{/if}
</svelte:head>
