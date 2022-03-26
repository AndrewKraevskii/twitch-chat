<script lang="ts" context="module">
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
			const url = new URL(link);

			channel = url.pathname.replace('/', '');

			const hidden = url.searchParams.get('hidden');
			if (!!hidden) hiddenNicknames = hidden.split(',');

			const color = url.searchParams.get('defaultColor');
			if (!!color) defaultColor = '#' + color;

			const custom = url.searchParams.get('custom');
			if (!!custom) {
				let ccolor: UserNicknameColor = {};
				custom.split(',').forEach((nicknameWithColors) => {
					const [nickname, start, end] = nicknameWithColors.split(':');
					if (!end) {
						ccolor = {
							...ccolor,
							[nickname]: '#' + start
						};
					} else {
						ccolor = {
							...ccolor,
							[nickname]: {
								start: '#' + start,
								end: '#' + end
							}
						};
					}
				});
				customColor = ccolor;
			}
		} catch (e) {
			link = 'incorrect link';
		}
	};
</script>

<div class="field">
	<h2 class="field__label">Load config by link</h2>
	<div class="row">
		<input
			class="input"
			bind:value={link}
			on:keydown={(e) => {
				if (e.key !== 'Enter') return;
				load();
			}}
		/>
		<button class="btn" on:click={load}>load</button>
	</div>
</div>
