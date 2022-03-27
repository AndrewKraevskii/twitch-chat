<script lang="ts" context="module">
	import { browser } from '$app/env';
	import config from '$lib/config';
	import UrlEncoder from '$lib/urlEncoder';
	import UrlParser from '$lib/urlParser';
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

	const updateLink = () => {
		if (!browser) return;

		const urlEncoder = new UrlEncoder({
			channel,
			hiddenNicknames,
			defaultColor,
			nicknameColors: customColor,
			font,
			animation,
			animationEasing,
			animationParams
		});

		link = urlEncoder.getLink().href;

		const {
			hiddenNicknames: hn,
			defaultColor: dc,
			nicknameColors: nc,
			font: f,
			animation: a,
			animationEasing: ae,
			animationParams: ap
		} = new UrlParser(link).getSettings();

		config.reset();
		config.setHidden(hn);
		config.setDefaultColor(dc);
		config.setCustomColor(nc);
		config.setFont(f);
		config.setAnimation(a);
		config.setAnimationEasing(ae);
		config.setAnimationParams(ap);
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
		margin-right: 0.5rem;
	}
</style>
