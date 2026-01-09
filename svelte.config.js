import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

// Create a singleton highlighter for better performance
let highlighter;

/**
 * Escape characters that would cause issues in Svelte template literals
 */
const escapeForSvelte = (str) => {
	return str
		.replace(/\\/g, '\\\\')
		.replace(/`/g, '\\`')
		.replace(/\$/g, '\\$')
		.replace(/{/g, '\\{');
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			if (!highlighter) {
				highlighter = await createHighlighter({
					themes: ['github-dark', 'github-light'],
					langs: [
						'javascript',
						'typescript',
						'svelte',
						'html',
						'css',
						'json',
						'bash',
						'shell',
						'markdown',
						'python',
						'rust',
						'go',
						'yaml',
						'toml',
						'sql',
						'graphql',
						'diff',
						'text'
					]
				});
			}

			// Check if language is supported, fallback to text
			const loadedLangs = highlighter.getLoadedLanguages();
			const language = loadedLangs.includes(lang) ? lang : 'text';

			const html = highlighter.codeToHtml(code, {
				lang: language,
				themes: {
					light: 'github-light',
					dark: 'github-dark'
				}
			});

			// Escape the HTML for use in a Svelte template literal
			const escapedHtml = escapeForSvelte(html);

			return `{@html \`${escapedHtml}\`}`;
		}
	},
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [],
	rehypePlugins: []
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		prerender: {
			handleMissingId: 'warn'
		}
	}
};

export default config;
