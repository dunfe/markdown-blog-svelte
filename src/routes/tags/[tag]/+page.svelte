<script lang="ts">
	import { SEO, PostCard, Tag } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="Posts tagged #{data.tag}"
	description="All posts tagged with #{data.tag}"
/>

<section class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
	<header class="mb-12 text-center">
		<div class="mb-4">
			<Tag tag={data.tag} active />
		</div>
		<h1 class="mb-4 text-3xl font-bold text-light-text sm:text-4xl dark:text-text">
			Posts tagged with <span class="text-light-lavender dark:text-lavender">#{data.tag}</span>
		</h1>
		<p class="text-light-subtext dark:text-subtext">
			{data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'} found
		</p>
	</header>

	{#if data.posts.length > 0}
		<div class="grid gap-6 sm:grid-cols-2">
			{#each data.posts as post, i}
				<div
					class="animate-slide-up opacity-0"
					style="animation-delay: {0.1 + i * 0.05}s"
				>
					<PostCard {post} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="rounded-2xl border border-light-overlay/50 bg-light-surface/50 p-12 text-center dark:border-overlay/50 dark:bg-surface/50">
			<p class="text-light-subtext dark:text-subtext">No posts found with this tag.</p>
		</div>
	{/if}

	<div class="mt-12 text-center">
		<a
			href="/tags"
			class="inline-flex items-center gap-2 text-sm font-medium text-light-subtext transition-colors hover:text-light-lavender dark:text-subtext dark:hover:text-lavender"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
			</svg>
			View all tags
		</a>
	</div>
</section>
