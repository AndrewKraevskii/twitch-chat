<script lang="ts">
	import badges from '$lib/stores/badges';

	export let userBadges: string[];

	let badgeImages: string[] = [];

	const updateBadgeImages = () => {
		badgeImages = userBadges
			.map((badge) => {
				const versions = $badges?.filter((b) => b.set_id === badge)[0]?.versions;
				if (!versions) return '';
				return versions[versions.length - 1]?.image_url_4x ?? '';
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
