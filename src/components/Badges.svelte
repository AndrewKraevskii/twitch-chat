<script lang="ts">
	import badges from '$lib/stores/badges';
	import type { ChatTwitchBadge } from '$types/badge';

	export let userBadges: ChatTwitchBadge[];

	let badgeImages: string[] = [];

	const updateBadgeImages = () => {
		badgeImages = userBadges
			.map((badge) => {
				const versions = $badges?.find((b) => b.set_id === badge.set_id)?.versions;
				return versions?.find((v) => v.id === badge.version)?.image_url_4x;
			})
			.filter(Boolean);
	};

	$: userBadges && updateBadgeImages();
</script>

{#if badgeImages.length !== 0}
	<span class="badges">
		{#each badgeImages as image (image)}
			<span class="badge">
				<img class="badge-image" src={image} alt="" />
			</span>
		{/each}
	</span>
{/if}

<style>
	:global(.badges > .badge) {
		display: inline-block;
		margin-right: 0.5rem;
		width: min-content;
		height: 100%;
	}

	.badge-image {
		margin-bottom: 0.15em;
		vertical-align: middle;
		height: 1.1875em;
	}
</style>
