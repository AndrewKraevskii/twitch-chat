<script lang="ts">
	import badges from '$lib/stores/badges';
	import type { ChatTwitchBadge } from '$types/badge';

	export let userBadges: ChatTwitchBadge[];

	let badgeImages: string[] = [];

	const updateBadgeImages = () => {
		badgeImages = userBadges
			.map((badge) => {
				const versions = $badges?.filter((b) => b.set_id === badge.set_id)[0]?.versions;
				if (!versions) return new Date().toISOString();
				const version = versions.filter((v) => v.id === badge.version)[0];
				if (!version) return new Date().toISOString();
				return version.image_url_4x ?? new Date().toISOString();
			})
			.filter((v) => !!v);
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
