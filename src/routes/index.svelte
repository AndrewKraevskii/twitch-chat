<script lang="ts" context="module">
	import type { UserNicknameColor } from '$types/nickname';
	import ChannelInput from '@components/ChannelInput.svelte';
	import CustomColorInput from '@components/CustomColorInput.svelte';
	import DefaultColorInput from '@components/DefaultColorInput.svelte';
	import Field from '@components/Field.svelte';
	import GeneratedLink from '@components/GeneratedLink.svelte';
	import HiddenNicknamesInput from '@components/HiddenNicknamesInput.svelte';
	import LoadLinkInput from '@components/LoadLinkInput.svelte';
</script>

<script lang="ts">
	let channel = '';
	let hiddenNicknames: string[] = [];
	let customColor: UserNicknameColor = {};
	let defaultColor = '';
</script>

<main class="container">
	<h1 class="heading">Chat link generator</h1>

	<Field label="Channel">
		<ChannelInput bind:channel />
	</Field>

	<Field label="Default color">
		<DefaultColorInput bind:defaultColor />
	</Field>

	<Field label="Hidden nicknames">
		<HiddenNicknamesInput bind:hiddenNicknames />
	</Field>

	<Field label="Custom color nicknames">
		<CustomColorInput bind:customColor />
	</Field>

	<Field label="Chat link">
		<GeneratedLink {channel} {hiddenNicknames} {defaultColor} {customColor} />
	</Field>

	<Field label="Load config from link">
		<LoadLinkInput bind:channel bind:hiddenNicknames bind:customColor bind:defaultColor />
	</Field>
</main>

<style>
	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.heading {
		margin-bottom: 1rem;
	}

	/* 
	:global(.input) {
		font-size: 1.1rem;
		padding: 0.2rem 0.4rem;
		width: 100%;
	}

	:global(.nickname-list) {
		margin-top: 0.4rem;
		list-style-position: inside;
	}

	:global(.nickname-item) {
		margin-bottom: 0.2rem;
	}

	:global(.nickname-item:last-child) {
		margin-bottom: 0;
	}

	:global(.btn) {
		padding: 0.2rem 0.4rem;
	}

	.header {
		margin-bottom: 1.5rem;
	}

	:global(.field) {
		display: block;
		margin-bottom: 0.8rem;
	}

	:global(.field__label) {
		margin-bottom: 0.25rem;
		font-weight: 400;
	}

	:global(.link) {
		display: block;
	}
	:global(.row) {
		display: flex;
	}

	:global(.row > *) {
		margin-right: 0.2rem;
	}

	:global(.row > *:last-child) {
		margin-right: 0;
	} */
</style>
