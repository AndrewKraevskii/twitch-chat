import type { ChatMessage } from '$types/chat';
import { writable } from 'svelte/store';

const initialState: ChatMessage[] = [];

const createChat = () => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (msg: ChatMessage) => {
			update((v) => {
				const newArr = [...v, msg];
				return newArr
					.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
					.slice(0, 20);
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
