<script lang="ts" context="module">
	import { browser } from '$app/env';
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

		const url = new URL(window.location.origin);

		if (channel) {
			url.pathname = '/' + channel;
		}
		if (hiddenNicknames.length !== 0) {
			url.searchParams.append('hidden', hiddenNicknames.join(','));
		}

		if (defaultColor) {
			url.searchParams.append('defaultColor', defaultColor.replace('#', ''));
		}

		if (Object.keys(customColor).length !== 0) {
			let v = [];
			Object.keys(customColor).forEach((nickname) => {
				const color = customColor[nickname];
				if (typeof color === 'string') {
					v.push(`${nickname}:${color.replace('#', '')}`);
				} else {
					v.push(`${nickname}:${color.start.replace('#', '')}:${color.end.replace('#', '')}`);
				}
			});

			url.searchParams.append('custom', v.join(','));
		}
		link = url.href;
	};

	$: browser &&
		channel !== undefined &&
		hiddenNicknames.length >= 0 &&
		defaultColor !== undefined &&
		customColor &&
		updateLink();
</script>

<label class="field">
	<h2 class="field__label">Link</h2>
	<input class="link input" value={link} readonly />
</label>
