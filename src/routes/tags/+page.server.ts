import { getAllTags, getPostSummaries } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const tags = await getAllTags();
	const posts = await getPostSummaries();

	return {
		tags,
		totalPosts: posts.length
	};
};
