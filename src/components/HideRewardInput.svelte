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
		margin-bottom: 8px;
	}

	.hide-reward {
		font-size: 20px;
		display: flex;
		align-items: center;
	}

	.hide-reward input {
		margin-right: 4px;
	}
</style>
