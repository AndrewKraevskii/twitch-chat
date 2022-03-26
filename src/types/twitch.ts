import type { UserState } from './chat';

export type TwitchEmote = {
	id: string;
	format: string[];
	images: {
		url_1x: string;
		url_2x: string;
		url_4x: string;
	};
	name: string;
	scale: string[];
	theme_mode: string[];
};

export type NewMessageResponse = {
	_raw: string;
	timestamp: string;
	command: string;
	event: string;
	channel: string;
	username: string;
	isSelf: boolean;
	message: string;
	tags: UserState;
};
