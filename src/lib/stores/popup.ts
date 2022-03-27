import { writable } from 'svelte/store';

const createPopup = () => {
	const { set, subscribe } = writable('');

	return {
		subscribe,
		set: (text: string) => set(text),
		clear: () => set('')
	};
};

const popup = createPopup();

export default popup;
