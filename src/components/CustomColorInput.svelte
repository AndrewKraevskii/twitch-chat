<script lang="ts" context="module">
	import type { UserNicknameColor } from '$types/nickname';
	import CustomColorItem from './CustomColorItem.svelte';
</script>

<script lang="ts">
	export let customColor: UserNicknameColor = {};
	let isGradient = false;
	let startColor = '#000000';
	let endColor = '#000000';
	let nickname = '';

	const add = () => {
		if (
			!nickname ||
			Object.keys(customColor)
				.map((v) => v.toLowerCase())
				.includes(nickname.toLowerCase())
		)
			return;
		if (isGradient) {
			customColor = { ...customColor, [nickname]: { start: startColor, end: endColor } };
		} else {
			customColor = { ...customColor, [nickname]: startColor };
		}
		nickname = '';
	};
</script>

<div class="custom-color-header">
	<div class="nickname-wrapper">
		<input class="nickname-input" placeholder="Nickname" bind:value={nickname} />
		<button on:click={add}>Add</button>
	</div>
	<div class="color-wrapper">
		<label class="is-gradient">
			<input type="checkbox" bind:checked={isGradient} />
			Is gradient?
		</label>
		<input bind:value={startColor} type="color" />
		{#if isGradient}
			<input bind:value={endColor} type="color" />
		{/if}
	</div>
</div>

{#if Object.keys(customColor).length !== 0}
	<div class="nickname-list">
		{#each Object.keys(customColor) as nickname (nickname)}
			<CustomColorItem bind:customColor {nickname} color={customColor[nickname]} />
		{/each}
	</div>
{/if}

<style>
	.custom-color-header {
		margin-bottom: 0.5rem;
	}

	.nickname-wrapper {
		display: flex;
		margin-bottom: 0.5rem;
	}

	.color-wrapper {
		display: flex;
		margin-bottom: 0.5rem;
	}

	.color-wrapper > * {
		margin-right: 0.25rem;
	}

	.color-wrapper > *:last-child {
		margin-right: 0;
	}

	.nickname-input {
		flex: 1;
		margin-right: 0.5rem;
	}

	.is-gradient {
		font-size: 1.25rem;
		display: flex;
		align-items: center;
	}

	.is-gradient input {
		margin-right: 0.25rem;
	}

	.nickname-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.25rem;
	}
</style>
