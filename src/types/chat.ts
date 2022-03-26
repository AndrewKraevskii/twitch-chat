import type { PrivateMessageTags } from 'twitch-js';

export type ChatMessage = {
	id: number;
	user: PrivateMessageTags;
	message: string;
	badgeNames: string[];
};
