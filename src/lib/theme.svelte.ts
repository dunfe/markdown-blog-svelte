import { browser } from '$app/environment';
import type { Theme } from './types';

export const themeState = $state({
	current: (browser ? (localStorage.getItem('theme') as Theme) : 'system') || 'system'
});

export const toggleTheme = () => {
	const themes: Theme[] = ['light', 'dark', 'system'];
	const currentIndex = themes.indexOf(themeState.current);
	const nextIndex = (currentIndex + 1) % themes.length;
	themeState.current = themes[nextIndex];

	if (browser) {
		localStorage.setItem('theme', themeState.current);
	}
};
