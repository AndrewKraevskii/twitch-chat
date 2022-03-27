import type { UserNicknameColor } from '$types/nickname';
import { writable } from 'svelte/store';

export type Config = {
	hidden: string[];
	defaultColor: string;
	customColors: UserNicknameColor;
};

const initialState: Config = {
	hidden: [],
	defaultColor: '#8CF2A5',
	customColors: {}
};

const colorRegex = /^#[a-f0-9]{6}$/i;

const createConfig = () => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		setDefaultColor: (defaultColor: string) => {
			if (!colorRegex.test(defaultColor)) return;
			update((v) => ({ ...v, defaultColor }));
		},
		addCustomColor: (
			nickname: string,
			color?: string,
			gradient?: { start: string; end: string }
		) => {
			if (!!color) {
				if (!colorRegex.test(color)) return;
				update((v) => ({
					...v,
					customColors: {
						...v.customColors,
						[nickname]: color
					}
				}));
			} else if (!!gradient) {
				if (!colorRegex.test(gradient.start) || !colorRegex.test(gradient.end)) return;
				update((v) => ({
					...v,
					customColors: {
						...v.customColors,
						[nickname]: gradient
					}
				}));
			}
		},
		setCustomColor: (customColors: UserNicknameColor) => update((v) => ({ ...v, customColors })),
		setHidden: (hidden: string[]) => update((v) => ({ ...v, hidden })),
		reset: () => set(initialState)
	};
};

const config = createConfig();

export default config;
