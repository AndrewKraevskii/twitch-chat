<script lang="ts" context="module">
	import UrlParser from '$lib/urlParser';
	import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';
	import type { UserNicknameColor } from '$types/nickname';
</script>

<script lang="ts">
	export let channel: string;
	export let hiddenNicknames: string[];
	export let defaultColor: string;
	export let customColor: UserNicknameColor;
	export let font: string;
	export let animation: Animation;
	export let animationEasing: AnimationEasing;
	export let animationParams: AnimationParams = {};
	export let hideReward: boolean;

	let link = '';

	const load = () => {
		try {
			const settings = new UrlParser(link).getSettings();

			channel = settings.channel;
			hiddenNicknames = settings.hiddenNicknames;
			defaultColor = settings.defaultColor;
			customColor = settings.nicknameColors;
			font = settings.font;
			animation = settings.animation;
			animationEasing = settings.animationEasing;
			animationParams = settings.animationParams;
			hideReward = settings.hideReward;
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
