import type { PrivateMessageTags } from 'twitch-js';
import type { ChatTwitchBadge } from './badge';

export type UserState = PrivateMessageTags & { id: string };

export type ChatMessage = {
	id: string;
	time: number;
	user: UserState;
	message: string;
	badgeNames: ChatTwitchBadge[];
};
