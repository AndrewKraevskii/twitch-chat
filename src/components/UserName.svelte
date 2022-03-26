<script lang="ts">
	import hexToHSL from '$lib/hexToHsl';
	import { customNicknames } from '$lib/nicknameConfig';
	import Badges from './Badges.svelte';
	import Separator from './Separator.svelte';

	export let userBadges: string[];
	export let color: string | null;
	export let nickname: string;

	let nicknameStartColor = '#8CF2A5';
	let nicknameEndColor = '#8CF2A5';

	const updateNicknameColors = () => {
		if (Object.keys(customNicknames).includes(nickname)) {
			nicknameStartColor = customNicknames[nickname].start;
			nicknameEndColor = customNicknames[nickname].end;
			return;
		}

		if (color === null) return;

		const { hue, saturation, lightness } = hexToHSL(color ?? '#AB72F4');

		nicknameStartColor = `hsl(${hue}, ${saturation}%, ${lightness - 5 < 0 ? 0 : lightness - 5}%)`;
		nicknameEndColor = `hsl(${hue}, ${saturation}%, ${lightness + 5 > 100 ? 100 : lightness + 5}%)`;
	};

	$: color && updateNicknameColors();
</script>

<div class="username">
	<Badges {userBadges} /><span
		class="name"
		style={`background: linear-gradient(to right, ${nicknameStartColor}, ${nicknameEndColor}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
		>{nickname}</span
	><Separator />
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
