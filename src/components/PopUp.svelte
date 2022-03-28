<script lang="ts" context="module">
	import popup from '$lib/stores/popup';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
</script>

<script lang="ts">
	onMount(() => {
		setTimeout(() => {
			popup.clear();
		}, 2000);
	});
</script>

{#if $popup}
	<section class="popup-wrapper" transition:fade>
		<article class="popup">{$popup}</article>
	</section>
{/if}

<style>
	.popup-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(17, 17, 17, 0.5);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.popup {
		background-color: rgb(17, 17, 17);
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
	}
</style>
