<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Animation, AnimationEasing } from '$types/animation';

	export let animation: Animation;
	export let animationEasing: AnimationEasing;
</script>

<div class="animation-wrapper">
	<select bind:value={animation} class="animation-select">
		<option value={Animation.Slide}>Slide</option>
		<option value={Animation.Scale}>Scale</option>
		<option value={Animation.Fade}>Fade</option>
		<option value={Animation.Nothing}>Nothing</option>
	</select>
	{#if animation !== Animation.Nothing}
		<select bind:value={animationEasing} class="animation-select">
			{#each Object.values(AnimationEasing) as easing (easing)}
				<option value={easing}>{easing}</option>
			{/each}
		</select>
	{/if}
</div>

<style>
	.animation-wrapper {
		display: flex;
	}

	.animation-select {
		flex: 1;
	}
	.animation-wrapper > *:not(:last-child) {
		margin-right: 0.5rem;
	}
</style>
