<script lang="ts" context="module">
	import type { NicknameColor, UserNicknameColor } from '$types/nickname';
</script>

<script lang="ts">
	export let customColor: UserNicknameColor;
	export let nickname: string;
	export let color: NicknameColor;

	$: colorString = typeof color === 'string' ? color : `${color.start} - ${color.end}`;

	$: colorStart = typeof color === 'string' ? color : color.start;
	$: colorEnd = typeof color === 'string' ? color : color.end;
	const handleClick = () => {
		delete customColor[nickname];
		customColor = customColor;
	};
</script>

<div class="custom-color">
	<p>
		<span
			style={`background: linear-gradient(to right, ${colorStart}, ${colorEnd}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent`}
			>{nickname}</span
		>
		{colorString}
	</p>
	<button on:click={handleClick}>Remove</button>
</div>

<style>
	.custom-color {
		display: flex;
	}

	.custom-color p {
		margin-right: 8px;
		flex: 1;
		font-weight: 500;
		font-size: 18px;
	}
</style>
