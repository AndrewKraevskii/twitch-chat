<script lang="ts" context="module">
	import { browser } from '$app/env';
	import config from '$lib/config';
	import fetchAllEmotes from '$lib/fetchEmotes';
	import { replaceBetween } from '$lib/replaceBetween';
	import badges from '$lib/stores/badges';
	import chat from '$lib/stores/chat';
	import popup from '$lib/stores/popup';
	import UrlParser from '$lib/urlParser';
	import type { ChatTwitchBadge, TwitchBadge } from '$types/badge';
	import type { NewMessageResponse } from '$types/twitch';
	import BlockChat from '@components/BlockChat.svelte';
	import BlockWithHeadChat from '@components/BlockWithHeadChat.svelte';
	import DefaultChat from '@components/DefaultChat.svelte';
	import PopUp from '@components/PopUp.svelte';
	import type { Load } from '@sveltejs/kit';
	import { onMount } from 'svelte';
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
			($config.hideReward && /custom-reward-id=/.test(_raw)) ||
			message.startsWith('!') ||
			$config.hiddenNicknames.map((n) => n.toLowerCase()).includes(tags.username.toLowerCase()) ||
			isSelf
		)
			return;

		let newMessage = message;
		tags.emotes
			.sort((a, b) => b.start - a.start)
			.forEach((emote) => {
				newMessage = replaceBetween(newMessage, emote.start, emote.end + 1, `<!${emote.id}!>`);
			});

		const badgeNames: ChatTwitchBadge[] = _raw
			.split(';')
			.find((v) => v.includes('badges='))
			.split('=')[1]
			.split(',')
			.map((v) => ({
				set_id: v.split('/')[0],
				version: v.split('/')[1]
			}));

		chat.add({ id: tags.id, user: tags, message: newMessage, badgeNames });
	};

	const handleRemoveMessage: (state: { targetMessageId: string }) => void = ({
		targetMessageId
	}) => {
		chat.remove(targetMessageId);
	};

	const loadConfigFromHref = () => {
		const {
			hiddenNicknames,
			defaultColor,
			nicknameColors,
			font,
			animation,
			animationEasing,
			animationParams,
			hideReward,
			disablePadding,
			fontSize,
			gradientOnlyCustom,
			chatType
		} = new UrlParser(window.location.href).getSettings();

		config.setHidden(hiddenNicknames);
		config.setDefaultColor(defaultColor);
		config.setCustomColor(nicknameColors);
		config.setFont(font);
		config.setAnimation(animation);
		config.setAnimationEasing(animationEasing);
		config.setAnimationParams(animationParams);
		config.setHideReward(hideReward);
		config.setDisablePadding(disablePadding);
		config.setFontSize(fontSize);
		config.setGradientOnlyCustom(gradientOnlyCustom);
		config.setChatType(chatType);
	};

	onMount(async () => {
		if (!browser) return;

		if (!$config.disablePadding) document.querySelector('.body').classList.add('with-padding');

		loadConfigFromHref();

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

		twitchChat.on(Events.CLEAR_CHAT, () => chat.clear());

		twitchChat.on(Events.CONNECTED, () => console.log('Twitch: Connected!'));
		twitchChat.on(Events.DISCONNECTED, () => popup.set('Twitch: Disonnected!'));
		twitchChat.on(Events.RECONNECT, () => popup.set('Twitch: Reconnect!'));

		try {
			await twitchChat.connect();
			await twitchChat.join(channel);
		} catch (e) {
			window.location.reload();
		}
	});
</script>

<PopUp />
{#if $config.chatType === 'block'}
	<BlockChat />
{:else if $config.chatType === 'blockWithHead'}
	<BlockWithHeadChat />
{:else}
	<DefaultChat />
{/if}

<style>
	:global(body) {
		display: flex !important;
		flex-direction: column-reverse !important;
		height: 100vh !important;
	}
</style>
