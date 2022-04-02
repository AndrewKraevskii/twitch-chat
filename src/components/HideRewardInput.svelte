<script lang="ts" context="module">
</script>

<script lang="ts">
	export let hideReward: boolean;
</script>

<div class="hide-reward-wrapper">
	<label class="hide-reward">
		<input type="checkbox" bind:checked={hideReward} />
		Hide claim rewards in chat
	</label>
</div>

<style>
	.hide-reward-wrapper {
		display: flex;
		margin-bottom: 0.5rem;
	}

	.hide-reward {
		font-size: 1.25rem;
		display: flex;
		align-items: center;
	}

	.hide-reward input {
		margin-right: 0.25rem;
	}
</style>
