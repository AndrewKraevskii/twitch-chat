<script lang="ts" context="module">
	import chat from '$lib/stores/chat';
	import { fade } from 'svelte/transition';
	import BlockMessage from './BlockMessage.svelte';
</script>

<script lang="ts">
</script>

{#if $chat.length !== 0}
	<main class="chat-container" transition:fade>
		{#each $chat.sort((a, b) => b.time - a.time) as msg (msg.id)}
			<BlockMessage chatMessage={msg} />
		{/each}
	</main>
{/if}

<style>
	.chat-container {
		font-size: 2rem;
		max-height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column-reverse;
		align-items: stretch;
	}

	:global(.chat-container > *) {
		margin-top: 0.5rem;
	}

	:global(.chat-container > *:last-child) {
		margin-top: 0rem;
	}
</style>
