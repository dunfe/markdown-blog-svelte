<script lang="ts">
	import { SEO, PostCard } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Blog" description="All blog posts, tutorials, and articles" />

<section class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
	<header class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-light-text sm:text-5xl dark:text-text">
			Blog
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-light-subtext dark:text-subtext">
			Thoughts, tutorials, and insights about web development and technology.
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
			<div class="mb-4 text-6xl">📝</div>
			<h2 class="mb-2 text-xl font-semibold text-light-text dark:text-text">No posts yet</h2>
			<p class="text-light-subtext dark:text-subtext">Check back soon for new content!</p>
		</div>
	{/if}
</section>
