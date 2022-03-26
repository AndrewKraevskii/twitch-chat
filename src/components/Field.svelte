<script lang="ts" context="module">
</script>

<script lang="ts">
	export let label: string;
</script>

<div class="field">
	<h2 class="field__label">{label}</h2>
	<slot />
</div>

<style>
	.field {
		margin-bottom: 0.5rem;
		width: 100%;
	}

	.field:last-child {
		margin-bottom: 0;
	}

	.field__label {
		margin-bottom: 0.25rem;
	}
</style>
