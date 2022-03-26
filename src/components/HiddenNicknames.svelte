<script lang="ts" context="module">
</script>

<script lang="ts">
	export let hiddenNicknames: string[] = [];
	let hiddenNickname = '';

	const addHidden = () => {
		if (hiddenNicknames.includes(hiddenNickname) || !hiddenNickname) return;
		hiddenNicknames = [...hiddenNicknames, hiddenNickname];
		hiddenNickname = '';
	};
</script>

<div class="field">
	<h2 class="field__label">Hidden Nicknames</h2>
	<div class="row">
		<input
			class="input"
			bind:value={hiddenNickname}
			on:keydown={(e) => {
				if (e.key !== 'Enter') return;
				addHidden();
			}}
		/>
		<button class="btn" on:click={addHidden}>add</button>
	</div>
	{#if hiddenNicknames.length !== 0}
		<ul class="nickname-list">
			{#each hiddenNicknames as nickname (nickname)}
				<li class="nickname-item">
					{nickname}
					<button
						class="btn"
						on:click={() => {
							hiddenNicknames = hiddenNicknames.filter((v) => v !== nickname);
						}}>remove</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
