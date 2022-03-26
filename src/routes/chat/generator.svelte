<script lang="ts" context="module">
	import type { UserNicknameColor } from '$types/nickname';
	import ChannelInput from '@components/ChannelInput.svelte';
	import CustomColor from '@components/CustomColor.svelte';
	import DefaultColor from '@components/DefaultColor.svelte';
	import GeneratedLink from '@components/GeneratedLink.svelte';
	import HiddenNicknames from '@components/HiddenNicknames.svelte';
	import LoadLink from '@components/LoadLink.svelte';
</script>

<script lang="ts">
	let channel = '';
	let hiddenNicknames: string[] = [];
	let customColor: UserNicknameColor = {};
	let defaultColor = '';
	//http://localhost:3000/BruhaBruh?hidden=bruhabruh_bot&defaultColor=8cf2a5&custom=Ark_Hentan%3Afb7185%3Aef4444%2CBruhaBruh%3A68d8ff%3A6b90ff%2Chyperspace42_%3Af472b6%3Aaf4bfd
</script>

<h1 class="header">Chat link generator</h1>

<LoadLink bind:channel bind:hiddenNicknames bind:customColor bind:defaultColor />

<ChannelInput bind:channel />

<HiddenNicknames bind:hiddenNicknames />

<DefaultColor bind:defaultColor />

<CustomColor bind:customColor />

<GeneratedLink {channel} {hiddenNicknames} {defaultColor} {customColor} />

<style>
	:global(.input) {
		font-size: 1.1rem;
		padding: 0.2rem 0.4rem;
		width: 100%;
	}

	:global(.nickname-list) {
		margin-top: 0.4rem;
		list-style-position: inside;
	}

	:global(.nickname-item) {
		margin-bottom: 0.2rem;
	}

	:global(.nickname-item:last-child) {
		margin-bottom: 0;
	}

	:global(.btn) {
		padding: 0.2rem 0.4rem;
	}

	.header {
		margin-bottom: 1.5rem;
	}

	:global(.field) {
		display: block;
		margin-bottom: 0.8rem;
	}

	:global(.field__label) {
		margin-bottom: 0.25rem;
		font-weight: 400;
	}

	:global(.link) {
		display: block;
	}
	:global(.row) {
		display: flex;
	}

	:global(.row > *) {
		margin-right: 0.2rem;
	}

	:global(.row > *:last-child) {
		margin-right: 0;
	}
</style>
