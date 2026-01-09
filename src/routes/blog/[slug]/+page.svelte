<script lang="ts">
	import { SEO, Tag } from '$lib/components';
	import { formatDate } from '$lib/utils';
	import { siteConfig } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const post = $derived(data.post);
	const Content = $derived(data.post.content);
</script>

<SEO
	title={post.metadata.title}
	description={post.metadata.description}
	image={post.metadata.coverImage}
	type="article"
	publishedTime={post.metadata.date}
	tags={post.metadata.tags}
/>

<article class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
	<!-- Header -->
	<header class="mb-12 text-center">
		{#if post.metadata.tags?.length > 0}
			<div class="mb-4 flex flex-wrap justify-center gap-2">
				{#each post.metadata.tags as tag}
					<Tag {tag} small />
				{/each}
			</div>
		{/if}

		<h1
			class="mb-6 text-4xl font-bold leading-tight text-light-text sm:text-5xl dark:text-text"
		>
			{post.metadata.title}
		</h1>

		<p class="mb-6 text-lg text-light-subtext dark:text-subtext">
			{post.metadata.description}
		</p>

		<div class="flex flex-wrap items-center justify-center gap-4 text-sm text-light-subtext dark:text-subtext">
			<div class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-light-lavender to-light-blue text-xs font-bold text-light-base dark:from-lavender dark:to-blue dark:text-base">
					{siteConfig.author.name.charAt(0)}
				</div>
				<span>{post.metadata.author ?? siteConfig.author.name}</span>
			</div>
			<span class="text-light-overlay dark:text-overlay">•</span>
			<time datetime={post.metadata.date} class="flex items-center gap-1.5">
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				{formatDate(post.metadata.date)}
			</time>
			{#if post.metadata.readingTime}
				<span class="text-light-overlay dark:text-overlay">•</span>
				<span class="flex items-center gap-1.5">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{post.metadata.readingTime}
				</span>
			{/if}
		</div>
	</header>

	<!-- Cover Image -->
	{#if post.metadata.coverImage}
		<figure class="mb-12">
			<img
				src={post.metadata.coverImage}
				alt={post.metadata.title}
				class="aspect-video w-full rounded-2xl object-cover shadow-lg"
				loading="eager"
			/>
		</figure>
	{/if}

	<!-- Content -->
	<div class="prose">
		<Content />
	</div>

	<!-- Footer -->
	<footer class="mt-16 border-t border-light-overlay/50 pt-8 dark:border-overlay/50">
		<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-sm font-medium text-light-text transition-colors hover:text-light-lavender dark:text-text dark:hover:text-lavender"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
				</svg>
				Back to all posts
			</a>

			<div class="flex gap-3">
				<a
					href="https://twitter.com/intent/tweet?text={encodeURIComponent(post.metadata.title)}&url={encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-light-subtext transition-colors hover:bg-light-surface hover:text-light-text dark:text-subtext dark:hover:bg-surface dark:hover:text-text"
					aria-label="Share on Twitter"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
					</svg>
				</a>
				<a
					href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent(`${siteConfig.url}/blog/${post.slug}`)}&title={encodeURIComponent(post.metadata.title)}"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-light-subtext transition-colors hover:bg-light-surface hover:text-light-text dark:text-subtext dark:hover:bg-surface dark:hover:text-text"
					aria-label="Share on LinkedIn"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
					</svg>
				</a>
			</div>
		</div>
	</footer>
</article>
