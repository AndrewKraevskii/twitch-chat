import type { BTTVEmote } from '$types/bttv';
import { writable } from 'svelte/store';

export type BTTVState = {
	template: string;
	emotes: BTTVEmote[];
};

const createEmotes = (initialState: BTTVState) => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (emotes: BTTVEmote[]) => update((v) => ({ ...v, emotes: [...v.emotes, ...emotes] })),
		clear: () => set(initialState)
	};
};

const bttvemotes = createEmotes({
	template: 'https://cdn.betterttv.net/emote/{id}/3x',
	emotes: []
});

export default bttvemotes;
