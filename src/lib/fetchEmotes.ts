import type { BTTVEmote } from '$types/bttv';
import type { FFZEmote } from '$types/ffz';
import type { STVEmote } from '$types/stv';
import bttvemotes from './stores/bttvemotes';
import ffzemotes from './stores/ffzemotes';
import stvemotes from './stores/stvemotes';

const fetchAllEmotes = async () => {
	const stvGlobalEmotes: STVEmote[] = await fetch('https://api.7tv.app/v2/emotes/global', {
		method: 'GET'
	})
		.then((res) => res.json())
		.catch(console.error);

	const stvChatEmotes: STVEmote[] = await fetch('https://api.7tv.app/v2/users/bruhabruh/emotes', {
		method: 'GET'
	})
		.then((res) => res.json())
		.catch(console.error);

	stvemotes.add(stvGlobalEmotes);
	stvemotes.add(stvChatEmotes);

	const bttvGlobalEmotes: BTTVEmote[] = await fetch(
		'https://api.betterttv.net/3/cached/emotes/global',
		{
			method: 'GET'
		}
	)
		.then((res) => res.json())
		.catch(console.error);

	const bttvChatEmotes: {
		id: string;
		bots: any[];
		avatar: string;
		channelEmotes: BTTVEmote[];
		sharedEmotes: BTTVEmote[];
	} = await fetch('https://api.betterttv.net/3/cached/users/twitch/635252103', {
		method: 'GET'
	})
		.then((res) => res.json())
		.catch(console.error);

	bttvemotes.add(bttvGlobalEmotes);
	bttvemotes.add(bttvChatEmotes.sharedEmotes);
	bttvemotes.add(bttvChatEmotes.channelEmotes);

	const ffzChatEmotes: {
		sets: {
			[key: string]: {
				emoticons: FFZEmote[];
			};
		};
	} = await fetch('https://api.frankerfacez.com/v1/room/id/635252103', {
		method: 'GET'
	})
		.then((res) => res.json())
		.catch(console.error);

	ffzemotes.add(ffzChatEmotes.sets[Object.keys(ffzChatEmotes.sets)[0]].emoticons);
};

export default fetchAllEmotes;
