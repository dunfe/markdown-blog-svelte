import type { Post, PostSummary, TagInfo, PostFrontmatter } from './types';

type GlobModule = {
	metadata: PostFrontmatter;
	default: Post['content'];
};

/**
 * Load all markdown posts from the posts directory
 */
export const getPosts = async (): Promise<Post[]> => {
	const modules = import.meta.glob<GlobModule>('/src/posts/*.md', { eager: true });

	const posts: Post[] = [];

	for (const path in modules) {
		const module = modules[path];
		const slug = path.split('/').pop()?.replace('.md', '') ?? '';

		if (module.metadata?.published !== false) {
			posts.push({
				slug,
				metadata: module.metadata,
				content: module.default
			});
		}
	}

	// Sort by date descending
	return posts.sort((a, b) => {
		const dateA = new Date(a.metadata.date);
		const dateB = new Date(b.metadata.date);
		return dateB.getTime() - dateA.getTime();
	});
};

/**
 * Get post summaries for listing pages (without full content)
 */
export const getPostSummaries = async (): Promise<PostSummary[]> => {
	const posts = await getPosts();

	return posts.map((post) => ({
		slug: post.slug,
		title: post.metadata.title,
		description: post.metadata.description,
		date: post.metadata.date,
		tags: post.metadata.tags ?? [],
		coverImage: post.metadata.coverImage,
		readingTime: post.metadata.readingTime
	}));
};

/**
 * Get a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
	const posts = await getPosts();
	return posts.find((post) => post.slug === slug);
};

/**
 * Get all unique tags with their counts
 */
export const getAllTags = async (): Promise<TagInfo[]> => {
	const posts = await getPosts();
	const tagCounts = new Map<string, number>();

	for (const post of posts) {
		const tags = post.metadata.tags ?? [];
		for (const tag of tags) {
			tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
		}
	}

	return Array.from(tagCounts.entries())
		.map(([name, count]) => ({
			name,
			count,
			slug: slugify(name)
		}))
		.sort((a, b) => b.count - a.count);
};

/**
 * Get posts by tag
 */
export const getPostsByTag = async (tag: string): Promise<PostSummary[]> => {
	const posts = await getPostSummaries();
	const tagLower = tag.toLowerCase();

	return posts.filter((post) => post.tags.some((t) => t.toLowerCase() === tagLower));
};

/**
 * Convert a string to URL-friendly slug
 */
export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
};

/**
 * Format a date string to a human-readable format
 */
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

/**
 * Calculate estimated reading time for text content
 */
export const calculateReadingTime = (content: string): string => {
	const wordsPerMinute = 200;
	const wordCount = content.trim().split(/\s+/).length;
	const minutes = Math.ceil(wordCount / wordsPerMinute);
	return `${minutes} min read`;
};
