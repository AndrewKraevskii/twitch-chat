import type { ChatMessage } from '$types/chat';
import { writable } from 'svelte/store';

const initialState: ChatMessage[] = [];

const createChat = () => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (msg: Omit<ChatMessage, 'time'>) => {
			update((v) => {
				const newArr = [...v, { ...msg, time: new Date().getTime() }];
				return newArr.sort((a, b) => b.time - a.time).slice(0, 20);
			});
			// I think, style tags in head needs to transition effect in svelte
			const elements = window.document.querySelectorAll("head style:not([type='text/css'])");
			elements.forEach((v, i) => {
				if (i < 5 && elements.length > 20) {
					v.remove();
				}
			});
		},
		remove: (messageId: string) => {
			update((v) => v.filter((i) => i.id !== messageId));
		},
		clear: () => set(initialState)
	};
};

const chat = createChat();

export default chat;
