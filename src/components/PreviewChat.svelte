<script lang="ts" context="module">
	import { browser } from '$app/env';
	import config from '$lib/config';
	import fetchAllEmotes from '$lib/fetchEmotes';
	import { replaceBetween } from '$lib/replaceBetween';
	import badges from '$lib/stores/badges';
	import bttvemotes from '$lib/stores/bttvemotes';
	import chat from '$lib/stores/chat';
	import ffzemotes from '$lib/stores/ffzemotes';
	import stvemotes from '$lib/stores/stvemotes';
	import UrlParser from '$lib/urlParser';
	import type { ChatTwitchBadge, TwitchBadge } from '$types/badge';
	import faker from '@faker-js/faker';
	import { onDestroy } from 'svelte';
	import type { EmoteTag } from 'twitch-js';
	import DefaultChat from './DefaultChat.svelte';
</script>

<script lang="ts">
	export let channel: string;

	let timeout: NodeJS.Timeout;

	const loadBadges = async () => {
		try {
			const { badges: TBadges, broadcasterId }: { badges: TwitchBadge[]; broadcasterId: string } =
				await fetch('/badges?channel=' + channel).then((r) => r.json());

			badges.set(TBadges);

			await fetchAllEmotes(channel, broadcasterId);
		} catch (e) {
			console.error(e);
		}
	};

	const handleUpdateChannel = async () => {
		if (!browser || !channel) return;
		await loadBadges();

		loadConfigFromHref();

		timeout = setTimeout(sendNewMessage, Math.floor(Math.random() * 2000 + 1000));
	};

	$: channel && handleUpdateChannel();

	const loadConfigFromHref = () => {
		const {
			hiddenNicknames,
			defaultColor,
			nicknameColors,
			font,
			animation,
			animationEasing,
			animationParams
		} = new UrlParser(window.location.href).getSettings();

		config.setHidden(hiddenNicknames);
		config.setDefaultColor(defaultColor);
		config.setCustomColor(nicknameColors);
		config.setFont(font);
		config.setAnimation(animation);
		config.setAnimationEasing(animationEasing);
		config.setAnimationParams(animationParams);
	};

	const getRandomBadges = (): ChatTwitchBadge[] => {
		let badgeNames: ChatTwitchBadge[] = [];
		for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
			let hasAlready = true;
			while (hasAlready) {
				const randomBadgeId = Math.floor(Math.random() * $badges.length);
				const badge = $badges[randomBadgeId];
				if (badgeNames.map((v) => v.set_id).includes(badge.set_id)) continue;

				badgeNames.push({
					set_id: badge.set_id,
					version: badge.versions[badge.versions.length - 1].id
				});
				hasAlready = false;
			}
		}
		return badgeNames;
	};

	const getRandomColor = (): string | null => {
		const randomType = Math.floor(Math.random() * 2);
		if (randomType === 0) return null;

		// Has color
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);

		return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
	};

	const defaultNicknames = [
		'BruhaBruh',
		'hyperspace42_',
		'nightbot',
		'twitch',
		'Pepega',
		'andrewkraevskii'
	];
	const defaultEmotes: { emote: string; tag: EmoteTag }[] = [
		{
			emote: 'Kappa',
			tag: {
				id: '25',
				start: 0,
				end: 0
			}
		},
		{
			emote: 'PogChamp',
			tag: {
				id: '305954156',
				start: 0,
				end: 0
			}
		},
		{
			emote: 'BibleThump',
			tag: {
				id: '86',
				start: 0,
				end: 0
			}
		}
	];

	const getNickname = (): string => {
		const randomType = Math.floor(Math.random() * 3);
		if (randomType === 0 || Object.keys($config.nicknameColors).length === 0) {
			return defaultNicknames[Math.floor(Math.random() * defaultNicknames.length)];
		} else if (randomType === 1) return faker.name.firstName();

		const nicknames = Object.keys($config.nicknameColors);

		return nicknames[Math.floor(Math.random() * nicknames.length)];
	};

	const getMessage = (): { message: string; emotes: EmoteTag[] } => {
		let message = faker.word.adjective(7);
		let amountOfEmotes = Math.floor(Math.random() * 4);
		let emotes: EmoteTag[] = [];
		for (let i = 0; i < amountOfEmotes; i++) {
			const emoteType = Math.floor(Math.random() * 4);
			// 0 - Twitch 1 - BTTV 2 - 7TV 3 - FFZ
			if (emoteType === 0) {
				const { emote, tag } = defaultEmotes[Math.floor(Math.random() * defaultEmotes.length)];
				const start = message.length + 1;
				const end = message.length + emote.length;
				message += ' ' + emote;
				emotes.push({
					id: tag.id,
					start,
					end
				});
				continue;
			} else if (emoteType === 2) {
				const bttvEmotes = $bttvemotes.emotes.map((v) => v.code);
				if (bttvEmotes.length === 0) continue;
				message += ' ' + bttvEmotes[Math.floor(Math.random() * bttvEmotes.length)];
				continue;
			} else if (emoteType === 3) {
				const stvEmotes = $stvemotes.map((v) => v.name);
				if (stvEmotes.length === 0) continue;
				message += ' ' + stvEmotes[Math.floor(Math.random() * stvEmotes.length)];
				continue;
			}
			const ffzEmotes = $ffzemotes.map((v) => v.name);
			if (ffzEmotes.length === 0) continue;
			message += ' ' + ffzEmotes[Math.floor(Math.random() * ffzEmotes.length)];
		}
		return { message, emotes };
	};

	const sendNewMessage = () => {
		const nickname = getNickname();
		if (!$config.hiddenNicknames.includes(nickname)) {
			const { message, emotes } = getMessage();
			let newMessage = message;
			emotes
				.sort((a, b) => b.start - a.start)
				.forEach((emote) => {
					newMessage = replaceBetween(newMessage, emote.start, emote.end + 1, `<!${emote.id}!>`);
				});
			chat.add({
				id: (Math.random() * 1000000).toString(),
				user: {
					id: 'id',
					badges: {},
					color: getRandomColor(),
					displayName: nickname,
					emotes: emotes,
					emoteSets: [],
					username: nickname.toLowerCase(),
					isModerator: false
				},
				message: newMessage,
				badgeNames: getRandomBadges()
			});
		}
		timeout = setTimeout(sendNewMessage, Math.floor(Math.random() * 2000 + 1000));
	};

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="body_replica">
	<DefaultChat />
</div>

<style>
	.body_replica {
		display: flex !important;
		flex-direction: column-reverse !important;
		max-height: 576px;
		height: 100%;
		overflow: hidden;
		outline: 1px solid rgba(17, 17, 17, 0.5);
		padding: 1rem !important;
	}
</style>
