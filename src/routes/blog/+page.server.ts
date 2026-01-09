import { getPostSummaries } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async () => {
	const posts = await getPostSummaries();

	return { posts };
};
