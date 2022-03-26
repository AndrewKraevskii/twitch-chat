<script lang="ts" context="module">
</script>

<script lang="ts">
	export let defaultColor = '';
</script>

<label class="field">
	<h2 class="field__label">Default Color</h2>
	<input class="input" bind:value={defaultColor} type="color" />
</label>
