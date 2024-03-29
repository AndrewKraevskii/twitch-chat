<script lang="ts">
	import config from '$lib/config';
	import hexToHSL from '$lib/hexToHsl';
	import type { ChatTwitchBadge } from '$types/badge';
	import type { ColorGradient } from '$types/nickname';
	import Badges from './Badges.svelte';
	import Separator from './Separator.svelte';

	export let userBadges: ChatTwitchBadge[];
	export let color: string | null;
	export let nickname: string;
	export let withSeparator = true;

	let nicknameStartColor: string | undefined = undefined;
	let nicknameEndColor: string | undefined = undefined;

	const add = 5;
	const multy = 1.5;
	const step = 5;

	const updateNicknameColors = () => {
		const customNicknames = $config.nicknameColors;
		if (Object.keys(customNicknames).includes(nickname)) {
			if (typeof customNicknames[nickname] !== 'string') {
				const colors = customNicknames[nickname] as ColorGradient;
				nicknameStartColor = colors.start;
				nicknameEndColor = colors.end;
				return;
			}
			nicknameStartColor = customNicknames[nickname] as string;
			nicknameEndColor = customNicknames[nickname] as string;
			return;
		}

		if (color === null) return;
		if ($config.gradientOnlyCustom) {
			nicknameStartColor = color;
			nicknameEndColor = color;
			return;
		}

		const { hue, saturation, lightness } = hexToHSL(color);

		nicknameStartColor = `hsl(${hue}, ${saturation}%, ${
			lightness + add * multy > 100 - step ? 100 - step : lightness + add * multy
		}%)`;
		nicknameEndColor = `hsl(${hue}, ${saturation}%, ${
			lightness + (add + step) * multy > 100 ? 100 : lightness + (add + step) * multy
		}%)`;
	};

	$: color && updateNicknameColors();
</script>

<div class="username">
	<Badges {userBadges} /><span
		class="name"
		style={`background: linear-gradient(to right, ${nicknameStartColor ?? $config.defaultColor}, ${
			nicknameEndColor ?? $config.defaultColor
		}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
		>{nickname}</span
	>{#if withSeparator}<Separator />{/if}
</div>

<style>
	.username {
		display: inline-block;
	}
	.name {
		word-break: break-all;
		font-weight: 700;
	}
</style>
