<script lang="ts" context="module">
</script>

<script lang="ts">
	import HiddenNickname from './HiddenNickname.svelte';

	export let hiddenNicknames: string[] = [];
	let hiddenNickname = '';

	const addHidden = () => {
		if (hiddenNicknames.includes(hiddenNickname) || !hiddenNickname) return;
		hiddenNicknames = [...hiddenNicknames, hiddenNickname];
		hiddenNickname = '';
	};
</script>

<div class="hidden-nicknames-header">
	<input
		bind:value={hiddenNickname}
		on:keydown={(e) => {
			if (e.key !== 'Enter') return;
			addHidden();
		}}
	/>
	<button class="btn" on:click={addHidden}>Add</button>
</div>
{#if hiddenNicknames.length !== 0}
	<div class="nickname-list">
		{#each hiddenNicknames as nickname (nickname)}
			<HiddenNickname bind:hiddenNicknames {nickname} />
		{/each}
	</div>
{/if}

<style>
	.hidden-nicknames-header {
		display: flex;
		margin-bottom: 8px;
	}
	.hidden-nicknames-header input {
		flex: 1;
		margin-right: 8px;
	}

	.nickname-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: 4px;
	}
</style>
