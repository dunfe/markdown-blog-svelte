import { getPostSummaries, getAllTags } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const posts = await getPostSummaries();
	const tags = await getAllTags();

	return {
		posts: posts.slice(0, 6), // Show latest 6 posts on home
		tags
	};
};
