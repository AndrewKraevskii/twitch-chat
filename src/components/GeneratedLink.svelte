<script lang="ts" context="module">
	import { browser } from '$app/env';
	import UrlEncoder from '$lib/urlEncoder';
	import type { UserNicknameColor } from '$types/nickname';
</script>

<script lang="ts">
	let link = '';

	export let channel = '';
	export let hiddenNicknames: string[] = [];
	export let defaultColor = '';
	export let customColor: UserNicknameColor = {};

	const updateLink = () => {
		if (!browser) return;

		const urlEncoder = new UrlEncoder(channel, hiddenNicknames, defaultColor, customColor);

		link = urlEncoder.getLink().href;
	};

	$: browser &&
		channel !== undefined &&
		hiddenNicknames.length >= 0 &&
		defaultColor !== undefined &&
		customColor &&
		updateLink();
</script>

<input class="generated-link" value={link} readonly />

<style>
	.generated-link {
		width: 100%;
	}
</style>
