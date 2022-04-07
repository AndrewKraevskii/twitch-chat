<script lang="ts" context="module">
</script>

<script lang="ts">
	export let gradientOnlyCustom: boolean;
</script>

<div class="gradient-only-wrapper">
	<label class="gradient-only">
		<input type="checkbox" bind:checked={gradientOnlyCustom} />
		Gradients only to custom nicknames
	</label>
</div>

<style>
	.gradient-only-wrapper {
		display: flex;
		margin-bottom: 8px;
	}

	.gradient-only {
		font-size: 20px;
		display: flex;
		align-items: center;
	}

	.gradient-only input {
		margin-right: 4px;
	}
</style>
