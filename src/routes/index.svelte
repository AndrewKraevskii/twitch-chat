<script lang="ts" context="module">
	import type { UserNicknameColor } from '$types/nickname';
	import ChannelInput from '@components/ChannelInput.svelte';
	import CustomColorInput from '@components/CustomColorInput.svelte';
	import DefaultColorInput from '@components/DefaultColorInput.svelte';
	import Field from '@components/Field.svelte';
	import Footer from '@components/Footer.svelte';
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

<svelte:head>
	<title>BruhChat</title>
</svelte:head>

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

	<Footer />
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
</style>
