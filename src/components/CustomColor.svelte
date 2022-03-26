<script lang="ts" context="module">
	import type { UserNicknameColor } from '$types/nickname';
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

	const getColorString = (nickname: string) => {
		return (customColor[nickname] as any).start + ' - ' + (customColor[nickname] as any).end;
	};
</script>

<div class="field">
	<h2 class="field__label">Custom nicknames</h2>
	<div class="row">
		<label>
			<input type="checkbox" bind:checked={isGradient} />
			Is gradient?
		</label>
		<input class="grow" bind:value={nickname} />
		<input class="grow" bind:value={startColor} type="color" />
		{#if isGradient}
			<input class="grow" bind:value={endColor} type="color" />
		{/if}
		<button class="btn" on:click={add}>add</button>
	</div>
	{#if Object.keys(customColor).length !== 0}
		<ul class="nickname-list">
			{#each Object.keys(customColor) as nickname (nickname)}
				<li class="nickname-item">
					{nickname}
					{#if typeof customColor[nickname] === 'string'}
						{customColor[nickname]}
					{:else}
						{getColorString(nickname)}
					{/if}
					<button
						class="btn"
						on:click={() => {
							delete customColor[nickname];
							customColor = customColor;
						}}>remove</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.grow {
		flex: 1;
	}
</style>
