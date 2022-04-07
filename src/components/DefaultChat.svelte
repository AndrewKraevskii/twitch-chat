<script lang="ts" context="module">
	import chat from '$lib/stores/chat';
	import { fade } from 'svelte/transition';
	import Message from './Message.svelte';
</script>

<script lang="ts">
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
	}

	:global(.chat-container > *) {
		margin-top: 0.5rem;
	}

	:global(.chat-container > *:last-child) {
		margin-top: 0rem;
	}
</style>
