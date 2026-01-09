import { error } from '@sveltejs/kit';
import { getAllTags, getPostsByTag } from '$lib/utils';
import type { PageServerLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const tags = await getAllTags();
	return tags.map((tagInfo) => ({ tag: tagInfo.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const posts = await getPostsByTag(params.tag);
	const allTags = await getAllTags();

	// Find the original tag name (with proper casing)
	const tagInfo = allTags.find(
		(t) => t.slug === params.tag || t.name.toLowerCase() === params.tag.toLowerCase()
	);

	if (!tagInfo && posts.length === 0) {
		error(404, 'Tag not found');
	}

	return {
		tag: tagInfo?.name ?? params.tag,
		posts
	};
};
