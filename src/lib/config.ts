import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { UserNicknameColor } from '$types/nickname';
import type { Settings } from '$types/settings';
import * as easing from 'svelte/easing';
import { writable } from 'svelte/store';
import type { EasingFunction } from 'svelte/types/runtime/transition';

export type Config = Omit<Settings, 'channel'>;

const initialState: Config = {
	hiddenNicknames: [],
	defaultColor: '#8CF2A5',
	nicknameColors: {},
	font: '',
	animation: Animation.Slide,
	animationEasing: AnimationEasing.Linear,
	animationParams: { delay: 0, duration: 150 }
};

const colorRegex = /^#[a-f0-9]{6}$/i;

export const isColor = (color: string) => {
	return colorRegex.test(color);
};

export const getEasing = (animationEasing: AnimationEasing): EasingFunction => {
	return easing[animationEasing];
};

const createConfig = () => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		setDefaultColor: (defaultColor: string) => {
			if (!isColor(defaultColor)) return;
			update((v) => ({ ...v, defaultColor }));
		},
		addCustomColor: (
			nickname: string,
			color?: string,
			gradient?: { start: string; end: string }
		) => {
			if (!!color) {
				if (!isColor(color)) return;
				update((v) => ({
					...v,
					nicknameColors: {
						...v.nicknameColors,
						[nickname]: color
					}
				}));
			} else if (!!gradient) {
				if (!isColor(gradient.start) || !isColor(gradient.end)) return;
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
		setAnimation: (animation: Animation) => {
			if (Object.values(Animation).includes(animation)) {
				update((v) => ({ ...v, animation }));
			}
		},
		setAnimationEasing: (animationEasing: AnimationEasing) => {
			if (Object.values(AnimationEasing).includes(animationEasing)) {
				update((v) => ({ ...v, animationEasing }));
			}
		},
		setAnimationParams: (animationParams: AnimationParams) => {
			if (JSON.stringify(animationParams) === JSON.stringify({})) return;
			update((v) => ({ ...v, animationParams }));
		},
		reset: () => set(initialState)
	};
};

const config = createConfig();

export default config;
