<script lang="ts">
	import type { PostSummary } from '$lib/types';
	import { formatDate } from '$lib/utils';
	import Tag from './Tag.svelte';

	interface Props {
		post: PostSummary;
		featured?: boolean;
	}

	let { post, featured = false }: Props = $props();

	const cardClasses = $derived(
		featured
			? 'lg:col-span-2'
			: ''
	);

	const imageClasses = $derived(
		featured
			? 'aspect-[21/9] w-full overflow-hidden bg-light-overlay dark:bg-overlay'
			: 'aspect-video w-full overflow-hidden bg-light-overlay dark:bg-overlay'
	);

	const placeholderClasses = $derived(
		featured
			? 'flex aspect-[21/9] w-full items-center justify-center bg-gradient-to-br from-light-lavender/20 to-light-blue/20 dark:from-lavender/20 dark:to-blue/20'
			: 'flex aspect-video w-full items-center justify-center bg-gradient-to-br from-light-lavender/20 to-light-blue/20 dark:from-lavender/20 dark:to-blue/20'
	);
</script>

<article
	class="group relative overflow-hidden rounded-2xl border border-light-overlay/50 bg-light-surface/50 transition-all duration-300 hover:border-light-lavender/50 hover:shadow-lg hover:shadow-light-lavender/10 dark:border-overlay/50 dark:bg-surface/50 dark:hover:border-lavender/50 dark:hover:shadow-lavender/10 {cardClasses}"
>
	{#if post.coverImage}
		<div class={imageClasses}>
			<img
				src={post.coverImage}
				alt={post.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				loading="lazy"
			/>
		</div>
	{:else}
		<div class={placeholderClasses}>
			<span
				class="text-light-lavender/50 transition-transform duration-300 group-hover:scale-110 dark:text-lavender/50"
				class:text-8xl={featured}
				class:text-6xl={!featured}
			>
				✦
			</span>
		</div>
	{/if}

	<div class="p-6" class:p-8={featured}>
		<!-- Tags -->
		{#if post.tags.length > 0}
			<div class="mb-3 flex flex-wrap gap-2">
				{#each post.tags.slice(0, 3) as tag}
					<Tag {tag} small />
				{/each}
			</div>
		{/if}

		<!-- Title -->
		<h2
			class="mb-2 font-bold leading-tight text-light-text transition-colors group-hover:text-light-lavender dark:text-text dark:group-hover:text-lavender"
			class:text-2xl={featured}
			class:text-xl={!featured}
		>
			<a href="/blog/{post.slug}" class="no-underline after:absolute after:inset-0">
				{post.title}
			</a>
		</h2>

		<!-- Description -->
		<p
			class="mb-4 text-light-subtext dark:text-subtext"
			class:line-clamp-3={featured}
			class:line-clamp-2={!featured}
		>
			{post.description}
		</p>

		<!-- Meta -->
		<div class="flex items-center gap-4 text-sm text-light-subtext/80 dark:text-subtext/80">
			<time datetime={post.date} class="flex items-center gap-1.5">
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				{formatDate(post.date)}
			</time>

			{#if post.readingTime}
				<span class="flex items-center gap-1.5">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					{post.readingTime}
				</span>
			{/if}
		</div>
	</div>
</article>
