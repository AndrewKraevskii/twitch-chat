<script lang="ts" context="module">
	import UrlParser from '$lib/urlParser';
	import type { UserNicknameColor } from '$types/nickname';
</script>

<script lang="ts">
	export let channel: string;
	export let hiddenNicknames: string[];
	export let defaultColor: string;
	export let customColor: UserNicknameColor;

	let link = '';

	const load = () => {
		try {
			const settings = new UrlParser(link).getSettings();

			channel = settings.channel;
			hiddenNicknames = settings.hiddenNicknames;
			defaultColor = settings.defaultColor;
			customColor = settings.nicknameColors;
		} catch (e) {
			link = 'incorrect link';
		}
	};
</script>

<div class="load-link">
	<input
		class="load-link__input"
		bind:value={link}
		on:keydown={(e) => {
			if (e.key !== 'Enter') return;
			load();
		}}
	/>
	<button on:click={load}>Load</button>
</div>

<style>
	.load-link {
		display: flex;
	}

	.load-link__input {
		flex: 1;
		margin-right: 0.5rem;
	}
</style>
