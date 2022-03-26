import fetchAllBadges from '$lib/fetchBadges';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
	const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
	const secretKey = import.meta.env.VITE_TWITCH_SECRET_KEY;

	const channel = new URL(request.url).searchParams.get('channel');
	if (!channel)
		return {
			status: 403,
			body: {
				message: 'channel is not defined'
			}
		};

	const data: { access_token: string } = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secretKey}&grant_type=client_credentials`,
		{
			method: 'POST'
		}
	).then((r) => r.json());

	const headers = new Headers();

	headers.append('Authorization', `Bearer ${data.access_token}`);
	headers.append('Client-Id', clientId.toString());

	const broadcaster: {
		data: { id: string }[];
	} = await fetch('https://api.twitch.tv/helix/users?login=' + channel, {
		method: 'GET',
		headers
	}).then((r) => r.json());

	if (!broadcaster.data[0])
		return { status: 500, body: { message: 'Error when get broadcaster id' } };

	const badges = await fetchAllBadges(headers, broadcaster.data[0].id);

	return {
		body: {
			badges,
			broadcasterId: broadcaster.data[0].id
		}
	};
};
