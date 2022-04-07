<script lang="ts" context="module">
</script>

<script lang="ts">
	export let disablePadding: boolean;
</script>

<div class="disable-padding-wrapper">
	<label class="disable-padding">
		<input type="checkbox" bind:checked={disablePadding} />
		Disable padding
	</label>
</div>

<style>
	.disable-padding-wrapper {
		display: flex;
		margin-bottom: 8px;
	}

	.disable-padding {
		font-size: 20px;
		display: flex;
		align-items: center;
	}

	.disable-padding input {
		margin-right: 4px;
	}
</style>
