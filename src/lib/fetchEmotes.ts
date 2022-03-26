import type { BTTVEmote } from '$types/bttv';
import type { FFZEmote } from '$types/ffz';
import type { STVEmote } from '$types/stv';
import bttvemotes from './stores/bttvemotes';
import ffzemotes from './stores/ffzemotes';
import stvemotes from './stores/stvemotes';

const fetchAllEmotes = async (channel: string, broadcasterId: string) => {
	const stvGlobalEmotes: STVEmote[] = await fetch('https://api.7tv.app/v2/emotes/global', {
		method: 'GET'
	})
		.then((res) => res.json())
		.catch(console.error);
	stvemotes.add(stvGlobalEmotes);

	try {
		const stvChatEmotes: STVEmote[] = await fetch(
			'https://api.7tv.app/v2/users/' + channel + '/emotes',
			{
				method: 'GET'
			}
		)
			.then((res) => res.json())
			.catch(console.error);

		stvemotes.add(stvChatEmotes);
	} catch (e) {}

	const bttvGlobalEmotes: BTTVEmote[] = await fetch(
		'https://api.betterttv.net/3/cached/emotes/global',
		{
			method: 'GET'
		}
	)
		.then((res) => res.json())
		.catch(console.error);
	bttvemotes.add(bttvGlobalEmotes);

	try {
		const bttvChatEmotes: {
			id: string;
			bots: any[];
			avatar: string;
			channelEmotes: BTTVEmote[];
			sharedEmotes: BTTVEmote[];
		} = await fetch('https://api.betterttv.net/3/cached/users/twitch/' + broadcasterId, {
			method: 'GET'
		})
			.then((res) => res.json())
			.catch(console.error);

		bttvemotes.add(bttvChatEmotes.sharedEmotes);
		bttvemotes.add(bttvChatEmotes.channelEmotes);
	} catch (e) {}

	try {
		const ffzChatEmotes: {
			sets: {
				[key: string]: {
					emoticons: FFZEmote[];
				};
			};
		} = await fetch('https://api.frankerfacez.com/v1/room/id/' + broadcasterId, {
			method: 'GET'
		})
			.then((res) => res.json())
			.catch(console.error);

		ffzemotes.add(ffzChatEmotes.sets[Object.keys(ffzChatEmotes.sets)[0]].emoticons);
	} catch (e) {}
};

export default fetchAllEmotes;
