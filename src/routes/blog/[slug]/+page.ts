import { error } from '@sveltejs/kit';
import { getPostBySlug, getPosts } from '$lib/utils';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

export const load: PageLoad = async ({ params }) => {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	return { post };
};
