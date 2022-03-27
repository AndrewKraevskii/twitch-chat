import type { UserNicknameColor } from '$types/nickname';
import type { Settings } from '$types/settings';
import { writable } from 'svelte/store';

export type Config = Omit<Settings, 'channel'>;

const initialState: Config = {
	hiddenNicknames: [],
	defaultColor: '#8CF2A5',
	nicknameColors: {},
	font: ''
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
					nicknameColors: {
						...v.nicknameColors,
						[nickname]: color
					}
				}));
			} else if (!!gradient) {
				if (!colorRegex.test(gradient.start) || !colorRegex.test(gradient.end)) return;
				update((v) => ({
					...v,
					nicknameColors: {
						...v.nicknameColors,
						[nickname]: gradient
					}
				}));
			}
		},
		setCustomColor: (nicknameColors: UserNicknameColor) =>
			update((v) => ({ ...v, nicknameColors })),
		setHidden: (hiddenNicknames: string[]) => update((v) => ({ ...v, hiddenNicknames })),
		setFont: (font: string) => update((v) => ({ ...v, font })),
		reset: () => set(initialState)
	};
};

const config = createConfig();

export default config;
