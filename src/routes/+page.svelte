<script lang="ts">
	import { SEO, PostCard, Tag } from '$lib/components';
	import { siteConfig } from '$lib/config';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO />

<!-- Hero Section -->
<section class="relative overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-br from-light-lavender/10 via-transparent to-light-blue/10 dark:from-lavender/5 dark:to-blue/5"></div>
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(180,190,254,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(180,190,254,0.08),transparent_50%)]"></div>
	
	<div class="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
		<div class="text-center">
			<h1
				class="animate-fade-in mb-6 bg-gradient-to-r from-light-text via-light-lavender to-light-blue bg-clip-text text-5xl font-bold tracking-tight text-transparent opacity-0 sm:text-6xl lg:text-7xl dark:from-text dark:via-lavender dark:to-blue"
			>
				{siteConfig.title}
			</h1>
			<p
				class="animate-fade-in stagger-1 mx-auto max-w-2xl text-lg text-light-subtext opacity-0 sm:text-xl dark:text-subtext"
			>
				{siteConfig.description}
			</p>
			<div class="animate-fade-in stagger-2 mt-8 flex justify-center gap-4 opacity-0">
				<a
					href="/blog"
					class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-light-lavender to-light-blue px-6 py-3 font-medium !text-light-base no-underline transition-all hover:scale-105 hover:shadow-lg hover:shadow-light-lavender/25 dark:from-lavender dark:to-blue dark:!text-base dark:hover:shadow-lavender/25"
				>
					Read the Blog
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="/rss.xml"
					class="inline-flex items-center gap-2 rounded-xl border border-light-overlay px-6 py-3 font-medium !text-light-text no-underline transition-all hover:border-light-lavender hover:bg-light-surface dark:border-overlay dark:!text-text dark:hover:border-lavender dark:hover:bg-surface"
				>
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
					</svg>
					RSS
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Latest Posts -->
<section class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
	<div class="mb-8 flex items-center justify-between">
		<h2 class="text-2xl font-bold text-light-text dark:text-text">Latest Posts</h2>
		<a
			href="/blog"
			class="text-sm font-medium text-light-text transition-colors hover:text-light-lavender dark:text-text dark:hover:text-lavender"
		>
			View all →
		</a>
	</div>

	{#if data.posts.length > 0}
		<div class="grid gap-6 sm:grid-cols-2">
			{#each data.posts as post, i}
				<div
					class="animate-slide-up opacity-0"
					style="animation-delay: {0.1 + i * 0.1}s"
				>
					<PostCard {post} featured={i === 0} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="rounded-2xl border border-light-overlay/50 bg-light-surface/50 p-12 text-center dark:border-overlay/50 dark:bg-surface/50">
			<p class="text-light-subtext dark:text-subtext">No posts yet. Check back soon!</p>
		</div>
	{/if}
</section>

<!-- Tags Section -->
{#if data.tags.length > 0}
	<section class="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
		<h2 class="mb-6 text-2xl font-bold text-light-text dark:text-text">Explore by Tag</h2>
		<div class="flex flex-wrap gap-3">
			{#each data.tags as tagInfo}
				<Tag tag={tagInfo.name} count={tagInfo.count} />
			{/each}
		</div>
	</section>
{/if}
