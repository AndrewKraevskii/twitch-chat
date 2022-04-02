<script lang="ts" context="module">
	import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
	import type { UserNicknameColor } from '$types/nickname';
	import AnimationParamsInput from '@components/AnimationParamsInput.svelte';
	import AnimationSelect from '@components/AnimationSelect.svelte';
	import ChannelInput from '@components/ChannelInput.svelte';
	import CustomColorInput from '@components/CustomColorInput.svelte';
	import DefaultColorInput from '@components/DefaultColorInput.svelte';
	import Field from '@components/Field.svelte';
	import Footer from '@components/Footer.svelte';
	import GeneratedLink from '@components/GeneratedLink.svelte';
	import HiddenNicknamesInput from '@components/HiddenNicknamesInput.svelte';
	import HideRewardInput from '@components/HideRewardInput.svelte';
	import LoadLinkInput from '@components/LoadLinkInput.svelte';
	import PreviewChat from '@components/PreviewChat.svelte';
</script>

<script lang="ts">
	let channel = '';
	let hiddenNicknames: string[] = [];
	let customColor: UserNicknameColor = {};
	let defaultColor = '';
	let font = '';
	let animation: Animation = Animation.Slide;
	let animationEasing: AnimationEasing = AnimationEasing.Linear;
	let animationParams: AnimationParams = {};
	let hideReward = false;

	let debouncedChannel = '';

	let timeout: NodeJS.Timeout;

	const debounce = () => {
		clearTimeout(timeout);
		setTimeout(() => {
			debouncedChannel = channel;
		}, 1000);
	};

	$: channel !== undefined && debounce();
</script>

<svelte:head>
	<title>BruhChat</title>
</svelte:head>

<main class="container">
	<h1 class="heading">Chat link generator</h1>

	<div class="columns">
		<div class="controls">
			<Field label="Channel">
				<ChannelInput bind:channel />
			</Field>

			<Field label="Hide rewards">
				<HideRewardInput bind:hideReward />
			</Field>

			<Field label="Default color">
				<DefaultColorInput bind:defaultColor />
			</Field>

			<Field label="Hidden nicknames">
				<HiddenNicknamesInput bind:hiddenNicknames />
			</Field>

			<Field label="Custom color nicknames">
				<CustomColorInput bind:customColor />
			</Field>

			<Field label="Font">
				<input style="width: 100%" bind:value={font} />
			</Field>

			<Field label="Animation">
				<AnimationSelect bind:animation bind:animationEasing />
			</Field>

			{#if animation !== Animation.Nothing}
				<Field label="Animation Parameters">
					<AnimationParamsInput
						{animation}
						bind:duration={animationParams.duration}
						bind:opacity={animationParams.opacity}
						bind:start={animationParams.start}
					/>
				</Field>
			{/if}

			<Field label="Chat link">
				<GeneratedLink
					{channel}
					{hiddenNicknames}
					{defaultColor}
					{customColor}
					{font}
					{animation}
					{animationEasing}
					{animationParams}
					{hideReward}
				/>
			</Field>

			<Field label="Load config from link">
				<LoadLinkInput
					bind:channel
					bind:hiddenNicknames
					bind:customColor
					bind:defaultColor
					bind:font
					bind:animation
					bind:animationEasing
					bind:animationParams
					bind:hideReward
				/>
			</Field>
		</div>
		<PreviewChat channel={debouncedChannel} />
	</div>

	<Footer />
</main>

<style>
	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.heading {
		margin-bottom: 1rem;
		color: #171717;
	}
	.columns {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-gap: 4rem;
	}
	.controls {
		grid-column: 1 / 2;
		color: #171717;
	}
</style>
