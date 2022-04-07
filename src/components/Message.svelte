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
		<div class="layout">
			<div class="mds">
				<UserName
					color={chatMessage.user.color}
					userBadges={chatMessage.badgeNames}
					nickname={chatMessage.user.displayName}
				/><Text message={chatMessage.message} />
			</div>
		</div>
	</div>
{:else if $config.animation === Animation.Fade}
	<div
		transition:fade={{ ...$config.animationParams, easing: getEasing($config.animationEasing) }}
		class="chat-message"
	>
		<div class="layout">
			<div class="mds">
				<UserName
					color={chatMessage.user.color}
					userBadges={chatMessage.badgeNames}
					nickname={chatMessage.user.displayName}
				/><Text message={chatMessage.message} />
			</div>
		</div>
	</div>
{:else if $config.animation === Animation.Scale}
	<div
		transition:scale={{ ...$config.animationParams, easing: getEasing($config.animationEasing) }}
		class="chat-message"
	>
		<div class="layout">
			<div class="mds">
				<UserName
					color={chatMessage.user.color}
					userBadges={chatMessage.badgeNames}
					nickname={chatMessage.user.displayName}
				/><Text message={chatMessage.message} />
			</div>
		</div>
	</div>
{:else}
	<div class="chat-message">
		<div class="layout">
			<div class="mds">
				<UserName
					color={chatMessage.user.color}
					userBadges={chatMessage.badgeNames}
					nickname={chatMessage.user.displayName}
				/><Text message={chatMessage.message} />
			</div>
		</div>
	</div>
{/if}

<style>
	.chat-message {
		position: relative;
		overflow-wrap: anywhere;
	}

	.layout {
		position: relative;
		border: 0;
		font-size: 100%;
		font: inherit;
		margin: 0;
		padding: 0;
		vertical-align: baseline;
	}

	.mds {
		display: inline;
		overflow-wrap: anywhere;
	}
</style>
