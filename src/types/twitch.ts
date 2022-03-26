import type { PrivateMessageTags } from 'twitch-js';

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
	tags: PrivateMessageTags;
};

/*
const client = new tmi.Client({
	channels: ["bruhabruh"],
});

fetchAllBadges();
fetchAllEmotes();

client.connect().catch(console.error);

client.on("message", (channel, userstate, message, self) => {
	if (
		message.startsWith("!") ||
		hideNicknames.includes(userstate.username) ||
		userstate["message-type"] !== "chat"
	)
		return;

	chat.add(userstate, message);
});

client.on("messagedeleted", (channel, username, deletedMessage, state) => {
	chat.remove(state["target-msg-id"]);
});

client.on("connected", () => {
	console.log("connected");
});
*/
