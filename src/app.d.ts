// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// MDsvex module declarations
declare module '*.md' {
	import type { Component } from 'svelte';

	export const metadata: {
		title: string;
		description: string;
		date: string;
		tags: string[];
		published: boolean;
		coverImage?: string;
		author?: string;
		readingTime?: string;
	};

	const component: Component;
	export default component;
}

declare module '*.svx' {
	import type { Component } from 'svelte';

	export const metadata: Record<string, unknown>;
	const component: Component;
	export default component;
}

export {};
