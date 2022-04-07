<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Animation } from '$types/animation';

	export let animation: Animation;

	export let duration: number = undefined;
	export let start: number = undefined;
	export let opacity: number = undefined;
</script>

<div class="animation-params-wrapper">
	<input placeholder="duration in ms" bind:value={duration} min={0} type="number" />
	{#if animation === Animation.Scale}
		<input placeholder="start" bind:value={start} min={0} type="number" />
		<input placeholder="opacity" bind:value={opacity} min={0} max={100} type="number" />
	{/if}
</div>

<style>
	.animation-params-wrapper {
		display: flex;
		width: 100%;
	}

	.animation-params-wrapper > input {
		flex: 1;
		margin-right: 8px;
	}

	.animation-params-wrapper > input:last-child {
		margin-right: 0;
	}
</style>
