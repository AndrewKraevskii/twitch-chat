<script lang="ts" context="module">
	import { browser } from '$app/env';
	import config from '$lib/config';
	import '../app.css';

	export const prerender = true;
</script>

<script lang="ts">
	$: customFont = $config.font ? `'${$config.font}', ` : '';

	config.subscribe((v) => {
		if (!browser) return;
		console.log(v.fontSize);
		document.documentElement.style.fontSize = v.fontSize + 'px';
	});
</script>

<div
	class="body"
	style={`font-family: ${customFont}'Golos UI VF', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`}
>
	<slot />
</div>

<style>
	.body {
		display: grid;
		max-height: 100vh;
	}
</style>
