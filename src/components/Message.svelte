<script lang="ts">
	import type { ChatMessage } from '$types/chat';
	import { fade, slide } from 'svelte/transition';
	import Text from './Text.svelte';
	import UserName from './UserName.svelte';

	export let chatMessage: ChatMessage;
</script>

<div in:slide out:fade class="chat-message">
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
