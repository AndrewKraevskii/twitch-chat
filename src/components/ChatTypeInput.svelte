<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { ChatType } from '$types/settings';

	export let chatType: ChatType;
</script>

<select bind:value={chatType} style="width: 100%">
	<option value={'default'}>Default</option>
	<option value={'block'}>Block like default</option>
	<option value={'blockWithHead'}>Block with header</option>
</select>
