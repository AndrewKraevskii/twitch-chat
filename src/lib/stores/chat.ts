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
		},
		remove: (messageId: string) => {
			update((v) => v.filter((i) => i.id !== messageId));
		},
		clear: () => set(initialState)
	};
};

const chat = createChat();

export default chat;
