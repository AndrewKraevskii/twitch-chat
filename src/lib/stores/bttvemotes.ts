import type { BTTVEmote } from '$types/bttv';
import { writable } from 'svelte/store';

export type BTTVState = {
	template: string;
	emotes: BTTVEmote[];
};

const initialState: BTTVState = {
	template: 'https://cdn.betterttv.net/emote/{id}/3x',
	emotes: []
};

const createEmotes = () => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (emotes: BTTVEmote[]) => update((v) => ({ ...v, emotes: [...v.emotes, ...emotes] })),
		clear: () => set(initialState)
	};
};

const bttvemotes = createEmotes();

export default bttvemotes;
