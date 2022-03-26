import type { ChatMessage } from '$types/chat';
import { writable } from 'svelte/store';
import type { PrivateMessageTags } from 'twitch-js';

const initialState: ChatMessage[] = [];

const createChat = () => {
	const { set, update, subscribe } = writable(initialState);

	return {
		subscribe,
		add: (user: PrivateMessageTags, message: string, badgeNames: string[]) => {
			update((v) => {
				const newArr = [...v, { id: new Date().getTime(), user, message, badgeNames }];
				return newArr.sort((a, b) => b.id - a.id).slice(0, 20);
			});
		},
		removeByTimeId: (id: number) => {
			update((v) => v.filter((i) => i.id !== id));
		},
		remove: (messageId: string) => {
			update((v) => v.filter((i) => i.user.id !== messageId));
		},
		clear: () => set(initialState)
	};
};

const chat = createChat();

export default chat;
