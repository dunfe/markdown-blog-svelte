<script lang="ts">
	import { SEO, Tag } from '$lib/components';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO title="Tags" description="Browse all tags and topics covered in the blog" />

<section class="mx-auto max-w-4xl px-4 py-16 sm:px-6">
	<header class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-light-text sm:text-5xl dark:text-text">
			Tags
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-light-subtext dark:text-subtext">
			Explore posts by topic. Click on a tag to see all related articles.
		</p>
	</header>

	{#if data.tags.length > 0}
		<div class="flex flex-wrap justify-center gap-4">
			{#each data.tags as tagInfo, i}
				<div
					class="animate-fade-in opacity-0"
					style="animation-delay: {0.05 + i * 0.03}s"
				>
					<Tag tag={tagInfo.name} count={tagInfo.count} />
				</div>
			{/each}
		</div>

		<div class="mt-16 text-center">
			<p class="text-sm text-light-subtext dark:text-subtext">
				{data.tags.length} tags across {data.totalPosts} posts
			</p>
		</div>
	{:else}
		<div class="rounded-2xl border border-light-overlay/50 bg-light-surface/50 p-12 text-center dark:border-overlay/50 dark:bg-surface/50">
			<div class="mb-4 text-6xl">🏷️</div>
			<h2 class="mb-2 text-xl font-semibold text-light-text dark:text-text">No tags yet</h2>
			<p class="text-light-subtext dark:text-subtext">Tags will appear as posts are published.</p>
		</div>
	{/if}
</section>
