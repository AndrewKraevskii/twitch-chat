<script lang="ts" context="module">
	import { browser } from '$app/env';
	import fetchAllEmotes from '$lib/fetchEmotes';
	import nicknameConfig from '$lib/nicknameConfig';
	import { replaceBetween } from '$lib/replaceBetween';
	import badges from '$lib/stores/badges';
	import chat from '$lib/stores/chat';
	import UrlParser from '$lib/urlParser';
	import type { TwitchBadge } from '$types/badge';
	import type { NewMessageResponse } from '$types/twitch';
	import Message from '@components/Message.svelte';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Events } from 'twitch-js';

	export const prerender = true;

	export const load: Load = async ({ params, fetch }) => {
		const { channel } = params;

		if (!channel) {
			return {
				status: 403,
				error: new Error('channel is not defined')
			};
		}

		const { badges, broadcasterId }: { badges: TwitchBadge[]; broadcasterId: string } = await fetch(
			'/badges?channel=' + channel
		).then((r) => r.json());

		return {
			props: {
				channel,
				tbadges: badges,
				broadcasterId
			}
		};
	};
</script>

<script lang="ts">
	export let channel: string;
	export let broadcasterId: string;
	export let tbadges: TwitchBadge[];

	const handleNewMessage: (state: NewMessageResponse) => void = ({
		tags,
		_raw,
		message,
		isSelf
	}) => {
		if (
			message.startsWith('!') ||
			$nicknameConfig.hidden.map((n) => n.toLowerCase()).includes(tags.username.toLowerCase()) ||
			isSelf
		)
			return;

		let newMessage = message;
		tags.emotes
			.sort((a, b) => b.start - a.start)
			.forEach((emote) => {
				newMessage = replaceBetween(newMessage, emote.start, emote.end + 1, `<!${emote.id}!>`);
			});

		const badgeNames = _raw
			.split(';')
			.filter((v) => v.includes('badges='))[0]
			.split('=')[1]
			.split(',')
			.map((v) => v.split('/')[0]);

		chat.add({ id: tags.id, user: tags, message: newMessage, badgeNames });
	};

	const handleRemoveMessage: (state: { targetMessageId: string }) => void = ({
		targetMessageId
	}) => {
		chat.remove(targetMessageId);
	};

	const loadNicknameConfigFromHref = () => {
		const urlParser = new UrlParser(window.location.href);

		if (urlParser.getHiddenNicknames().length !== 0) {
			nicknameConfig.setHidden(urlParser.getHiddenNicknames());
		}

		if (!!urlParser.getDefaultColor()) nicknameConfig.setDefaultColor(urlParser.getDefaultColor());

		if (!!urlParser.getNicknameColors())
			nicknameConfig.setCustomColor(urlParser.getNicknameColors());
	};

	onMount(async () => {
		if (!browser) return;

		loadNicknameConfigFromHref();

		badges.set(tbadges);

		await fetchAllEmotes(channel, broadcasterId);

		const tjs = (window as any).TwitchJs;
		const twitchChat = new tjs.Chat({
			username: undefined,
			token: undefined,
			log: { level: 'warn' }
		});

		twitchChat.on(Events.PRIVATE_MESSAGE, handleNewMessage);

		twitchChat.on(Events.CLEAR_MESSAGE, handleRemoveMessage);

		twitchChat.on(Events.CONNECTED, () => console.log('Twitch: Connected!'));
		twitchChat.on(Events.DISCONNECTED, () => console.log('Twitch: Disonnected!'));
		twitchChat.on(Events.RECONNECT, () => console.log('Twitch: Reconnect!'));

		await twitchChat.connect();
		await twitchChat.join(channel);
	});
</script>

{#if $chat.length !== 0}
	<main class="chat-container" transition:fade>
		{#each $chat.sort((a, b) => b.time - a.time) as msg (msg.id)}
			<Message chatMessage={msg} />
		{/each}
	</main>
{/if}

<style>
	.chat-container {
		font-size: 2rem;
		background-color: rgba(17, 17, 17, 0.75);
		border-radius: 1rem;
		padding: 1rem 1rem 0.85rem 1rem;
		max-height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column-reverse;
		align-items: stretch;
		color: #fafafa;
	}

	:global(.chat-container > *) {
		margin-top: 0.5rem;
	}

	:global(.chat-container > *:last-child) {
		margin-top: 0rem;
	}

	:global(body) {
		display: flex !important;
		flex-direction: column-reverse !important;
		height: 100vh !important;
		padding: 1.5rem !important;
	}
</style>
