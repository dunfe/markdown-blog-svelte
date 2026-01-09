import type { Component } from 'svelte';

export type Theme = 'light' | 'dark' | 'system';

export interface PostFrontmatter {
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
	coverImage?: string;
	author?: string;
	readingTime?: string;
}

export interface Post {
	slug: string;
	metadata: PostFrontmatter;
	content: Component;
}

export interface PostSummary {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	coverImage?: string;
	readingTime?: string;
}

export interface TagInfo {
	name: string;
	count: number;
	slug: string;
}
