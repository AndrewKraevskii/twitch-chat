import type { TwitchBadge } from '$types/badge';

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

	let mergedBadges = chatBadges.data;

	globalBadges.data.forEach((twitchBadge) => {
		const sameBadge = mergedBadges.find((m) => m.set_id === twitchBadge.set_id);
		if (!sameBadge) return mergedBadges.push(sameBadge);
		const resultVersions = [
			...sameBadge.versions,
			...twitchBadge.versions.filter((tb) => !sameBadge.versions.map((v) => v.id).includes(tb.id))
		];
		console.log('Same: ', sameBadge);
		console.log('Twitch: ', twitchBadge);
		console.log('Result: ', { set_id: sameBadge.set_id, versions: resultVersions });
		mergedBadges = [
			...mergedBadges.filter((b) => b.set_id !== sameBadge.set_id),
			{ set_id: sameBadge.set_id, versions: resultVersions }
		];
	});

	return mergedBadges;
};

export default fetchAllBadges;
