<script lang="ts">
	import config, { getEasing } from '$lib/config';
	import { Animation } from '$types/animation';
	import type { ChatMessage } from '$types/chat';
	import { fade, scale, slide } from 'svelte/transition';
	import Text from './Text.svelte';
	import UserName from './UserName.svelte';

	export let chatMessage: ChatMessage;
</script>

{#if $config.animation === Animation.Slide}
	<div
		transition:slide={{ ...$config.animationParams, easing: getEasing($config.animationEasing) }}
		class="chat-message"
	>
		<UserName
			color={chatMessage.user.color}
			userBadges={chatMessage.badgeNames}
			nickname={chatMessage.user.displayName}
			withSeparator={false}
		/><Text message={chatMessage.message} />
	</div>
{:else if $config.animation === Animation.Fade}
	<div
		transition:fade={{ ...$config.animationParams, easing: getEasing($config.animationEasing) }}
		class="chat-message"
	>
		<UserName
			color={chatMessage.user.color}
			userBadges={chatMessage.badgeNames}
			nickname={chatMessage.user.displayName}
			withSeparator={false}
		/><Text message={chatMessage.message} />
	</div>
{:else if $config.animation === Animation.Scale}
	<div
		transition:scale={{ ...$config.animationParams, easing: getEasing($config.animationEasing) }}
		class="chat-message"
	>
		<UserName
			color={chatMessage.user.color}
			userBadges={chatMessage.badgeNames}
			nickname={chatMessage.user.displayName}
			withSeparator={false}
		/><Text message={chatMessage.message} />
	</div>
{:else}
	<div class="chat-message">
		<UserName
			color={chatMessage.user.color}
			userBadges={chatMessage.badgeNames}
			nickname={chatMessage.user.displayName}
			withSeparator={false}
		/><Text message={chatMessage.message} />
	</div>
{/if}

<style>
	.chat-message {
		position: relative;
		overflow-wrap: anywhere;
		background-color: rgba(17, 17, 17, 0.75);
		border-radius: 1rem;
		padding: 1rem 1rem 0.85rem 1rem;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		display: grid;
		grid-template-rows: max-content 1fr;
	}
</style>
