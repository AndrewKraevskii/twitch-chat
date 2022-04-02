import type { TwitchBadge } from '$types/badge';
import { writable } from 'svelte/store';

const createBadges = (initialState: TwitchBadge[]) => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		set: (badges: TwitchBadge[]) => set(badges),
		clear: () => set(initialState)
	};
};

const badges = createBadges([]);

export default badges;
