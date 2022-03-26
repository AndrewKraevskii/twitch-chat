import type { PrivateMessageTags } from 'twitch-js';

export type UserState = PrivateMessageTags & { id: string };

export type ChatMessage = {
	id: string;
	user: UserState;
	message: string;
	badgeNames: string[];
};
