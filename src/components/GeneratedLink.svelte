<script lang="ts" context="module">
	import { browser } from '$app/env';
	import config from '$lib/config';
	import UrlEncoder from '$lib/urlEncoder';
	import type { Animation, AnimationEasing, AnimationParams } from '$types/animation';
	import type { UserNicknameColor } from '$types/nickname';
</script>

<script lang="ts">
	let link = '';

	export let channel = '';
	export let hiddenNicknames: string[] = [];
	export let defaultColor = '';
	export let font = '';
	export let animation: Animation;
	export let animationEasing: AnimationEasing;
	export let animationParams: AnimationParams = {};
	export let customColor: UserNicknameColor = {};
	export let hideReward = false;
	export let disablePadding = false;

	const updateLink = () => {
		if (!browser) return;

		config.reset();
		config.setHidden(hiddenNicknames);
		config.setDefaultColor(defaultColor);
		config.setCustomColor(customColor);
		config.setFont(font);
		config.setAnimation(animation);
		config.setAnimationEasing(animationEasing);
		config.setAnimationParams(animationParams);
		config.setDisablePadding(disablePadding);

		const urlEncoder = new UrlEncoder({
			channel,
			hiddenNicknames,
			defaultColor,
			nicknameColors: customColor,
			font,
			animation,
			animationEasing,
			animationParams,
			hideReward,
			disablePadding
		});

		link = urlEncoder.getLink().href;
	};

	$: browser &&
		channel !== undefined &&
		hiddenNicknames.length >= 0 &&
		defaultColor !== undefined &&
		customColor &&
		font !== undefined &&
		animation !== undefined &&
		animationEasing !== undefined &&
		animationParams &&
		hideReward !== undefined &&
		disablePadding !== undefined &&
		updateLink();

	const handleClick = () => {
		window.navigator.clipboard.writeText(link);
	};
</script>

<div class="genearted-link-wrapper">
	<input class="generated-link" value={link} readonly />
	<button on:click={handleClick}>Copy</button>
</div>

<style>
	.genearted-link-wrapper {
		width: 100%;
		display: flex;
	}
	.generated-link {
		flex: 1;
		margin-right: 8px;
	}
</style>
