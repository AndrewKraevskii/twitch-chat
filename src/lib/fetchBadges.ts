import type { TwitchBadge } from '$types/badge';

type OverwriteMergeFunc<T> = (destinationArray: T, sourceArray: T, option: any) => T;

const fetchAllBadges = async (headers: Headers, broadcasterId: string): Promise<TwitchBadge[]> => {
	const globalBadges: { data: TwitchBadge[] } = await fetch(
		'https://api.twitch.tv/helix/chat/badges/global',
		{
			method: 'GET',
			headers
		}
	)
		.then((res) => res.json())
		.catch(console.error);

	const chatBadges: { data: TwitchBadge[] } = await fetch(
		'https://api.twitch.tv/helix/chat/badges?broadcaster_id=' + broadcasterId,
		{
			method: 'GET',
			headers
		}
	)
		.then((res) => res.json())
		.catch(console.error);

	return [...chatBadges.data, ...globalBadges.data];
};

export default fetchAllBadges;
