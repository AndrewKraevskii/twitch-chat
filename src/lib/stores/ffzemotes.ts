import type { FFZEmote } from '$types/ffz';
import { writable } from 'svelte/store';

const createEmotes = (initialState: FFZEmote[]) => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (emotes: FFZEmote[]) => update((v) => [...v, ...emotes]),
		clear: () => set(initialState)
	};
};

const ffzemotes = createEmotes([]);

export default ffzemotes;
