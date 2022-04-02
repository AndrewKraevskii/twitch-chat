import type { STVEmote } from '$types/stv';
import { writable } from 'svelte/store';

const createEmotes = (initialState: STVEmote[]) => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (emotes: STVEmote[]) => update((v) => [...v, ...emotes]),
		clear: () => set(initialState)
	};
};

const stvemotes = createEmotes([]);

export default stvemotes;
