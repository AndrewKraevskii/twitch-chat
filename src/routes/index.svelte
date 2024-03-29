<script lang="ts" context="module">
	import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
	import type { UserNicknameColor } from '$types/nickname';
	import type { ChatType } from '$types/settings';
	import AnimationParamsInput from '@components/AnimationParamsInput.svelte';
	import AnimationSelect from '@components/AnimationSelect.svelte';
	import ChannelInput from '@components/ChannelInput.svelte';
	import ChatTypeInput from '@components/ChatTypeInput.svelte';
	import CustomColorInput from '@components/CustomColorInput.svelte';
	import DefaultColorInput from '@components/DefaultColorInput.svelte';
	import DisablePaddingInput from '@components/DisablePaddingInput.svelte';
	import Field from '@components/Field.svelte';
	import FontSizeInput from '@components/FontSizeInput.svelte';
	import Footer from '@components/Footer.svelte';
	import GeneratedLink from '@components/GeneratedLink.svelte';
	import GradientOnlyCustom from '@components/GradientOnlyCustom.svelte';
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
	let disablePadding = false;
	let fontSize = 16;
	let gradientOnlyCustom = false;
	let chatType: ChatType = 'default';

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

			<Field label="ChatType">
				<ChatTypeInput bind:chatType />
			</Field>

			<Field label="Hide rewards">
				<HideRewardInput bind:hideReward />
			</Field>

			<Field label="Hidden nicknames">
				<HiddenNicknamesInput bind:hiddenNicknames />
			</Field>

			<Field label="Default color">
				<DefaultColorInput bind:defaultColor />
			</Field>

			<Field label="Gradient only for custom">
				<GradientOnlyCustom bind:gradientOnlyCustom />
			</Field>

			<Field label="Custom color nicknames">
				<CustomColorInput bind:customColor />
			</Field>

			<Field label="Font">
				<input style="width: 100%" bind:value={font} />
			</Field>

			<Field label="Font Size">
				<FontSizeInput bind:fontSize />
			</Field>

			<Field label="Disable padding">
				<DisablePaddingInput bind:disablePadding />
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
					{disablePadding}
					{fontSize}
					{gradientOnlyCustom}
					{chatType}
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
					bind:disablePadding
					bind:fontSize
					bind:gradientOnlyCustom
					bind:chatType
				/>
			</Field>
		</div>
		<div>
			<PreviewChat channel={debouncedChannel} />
			<Footer />
		</div>
	</div>
</main>

<style>
	.container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 32px 16px;
		width: 100%;
	}

	.heading {
		margin-bottom: 16px;
		color: #171717;
	}
	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 64px;
	}
	.controls {
		grid-column: 1 / 2;
		color: #171717;
	}
</style>
