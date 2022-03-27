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
	import type { TwitchBadge } from '$types/badge';
	import Message from '@components/Message.svelte';
	import faker from '@faker-js/faker';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { EmoteTag } from 'twitch-js';
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

	const getRandomBadges = (): string[] => {
		let badgeNames = [];
		for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
			let hasAlready = true;
			while (hasAlready) {
				const randomBadgeId = Math.floor(Math.random() * $badges.length);
				if (badgeNames.includes($badges[randomBadgeId].set_id)) continue;
				badgeNames.push($badges[randomBadgeId].set_id);
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

	const defaultNicknames = ['BruhaBruh', 'hyperspace42_', 'nightbot', 'twitch', 'Pepega'];
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
		timeout = setTimeout(sendNewMessage, Math.floor(Math.random() * 2000 + 1000));
	};

	onMount(async () => {
		if (!browser) return;
		await loadBadges();

		loadConfigFromHref();

		timeout = setTimeout(sendNewMessage, Math.floor(Math.random() * 2000 + 1000));
	});

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="body_replica">
	{#if $chat.length !== 0}
		<main class="chat-container" transition:fade>
			{#each $chat.sort((a, b) => b.time - a.time) as msg (msg.id)}
				<Message chatMessage={msg} />
			{/each}
		</main>
	{/if}
</div>

<style>
	.body_replica {
		display: flex !important;
		flex-direction: column-reverse !important;
		max-height: 576px;
		height: 100%;
		overflow: hidden;
	}

	.chat-container {
		font-size: 1.5rem;
		background-color: rgba(17, 17, 17, 0.75);
		border-radius: 1rem;
		padding: 1rem 1rem 0.85rem 1rem;
		height: max-content;
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
</style>
