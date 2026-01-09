<script lang="ts">
	import { slugify } from '$lib/utils';

	interface Props {
		tag: string;
		small?: boolean;
		count?: number;
		active?: boolean;
	}

	let { tag, small = false, count, active = false }: Props = $props();

	const baseClasses = 'inline-flex items-center gap-1.5 rounded-full font-medium no-underline transition-all duration-200';
	
	const sizeClasses = $derived(
		small ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-sm'
	);
	
	const colorClasses = $derived(
		active
			? 'bg-light-lavender text-light-base dark:bg-lavender dark:text-base'
			: 'bg-light-overlay/50 text-light-text hover:bg-light-lavender/20 hover:text-light-lavender dark:bg-overlay/50 dark:text-text dark:hover:bg-lavender/20 dark:hover:text-lavender'
	);

	const countClasses = $derived(
		active
			? 'bg-light-base/50 text-light-lavender dark:bg-base/50 dark:text-lavender'
			: 'bg-light-surface dark:bg-surface'
	);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			// Allow default navigation
		}
	};
</script>

<a
	href="/tags/{slugify(tag)}"
	class="{baseClasses} {sizeClasses} {colorClasses}"
	onkeydown={handleKeyDown}
	tabindex="0"
	aria-label="View posts tagged with {tag}"
>
	<span>#</span>
	<span>{tag}</span>
	{#if count !== undefined}
		<span class="ml-1 rounded-full px-1.5 text-xs {countClasses}">
			{count}
		</span>
	{/if}
</a>
