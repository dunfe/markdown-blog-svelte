export const siteConfig = {
	title: 'Markdown Blog',
	description: 'A developer-centric blog built with SvelteKit and Markdown',
	url: 'https://your-domain.com',
	author: {
		name: 'Dung Nguyen',
		email: 'dienvoshop@gmail.com',
		twitter: '@perfectpixeldev',
		github: 'dunfe'
	},
	postsPerPage: 10,
	defaultOgImage: '/og-image.png',
	socialLinks: {
		twitter: 'https://twitter.com/perfectpixeldev',
		github: 'https://github.com/dunfe',
		linkedin: 'https://linkedin.com/in/dungnq'
	},
	navigation: [
		{ title: 'Home', href: '/' },
		{ title: 'Blog', href: '/blog' },
		{ title: 'Tags', href: '/tags' },
		{ title: 'About', href: '/about' }
	]
} as const;

export type SiteConfig = typeof siteConfig;
