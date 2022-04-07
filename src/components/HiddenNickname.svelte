<script lang="ts" context="module">
</script>

<script lang="ts">
	export let hiddenNicknames: string[];
	export let nickname: string;

	const handleClick = () => {
		hiddenNicknames = hiddenNicknames.filter((v) => v !== nickname);
	};
</script>

<div class="hidden-nickname">
	<p class="hidden-nickname__nickname">{nickname}</p>
	<button on:click={handleClick}>Remove</button>
</div>

<style>
	.hidden-nickname {
		display: flex;
	}

	.hidden-nickname__nickname {
		flex: 1;
		margin-right: 8px;
		font-weight: 500;
		font-size: 18px;
	}
</style>
