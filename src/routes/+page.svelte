<script lang="ts">
	import { PUBLIC_PASSAGE_APP_ID } from '$env/static/public';

	const { data } = $props();
</script>

<main>
	<h1>The Gratitude Tree</h1>

	{#if data.user.is_authorized}
		<a href="/app/dashboard">Go to my Tree</a>
	{:else}
		<passage-auth app-id={PUBLIC_PASSAGE_APP_ID}></passage-auth>
	{/if}

	<img src="/icon.svg" alt="" />
</main>

<style lang="postcss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(90vh - var(--size-2));
		justify-content: space-between;
		min-height: 100vh;
	}

	h1 {
		text-align: center;
		margin-block-start: var(--size-5);
	}
	a {
		padding: var(--size-3) var(--size-4);
		border-radius: var(--border-size-3);
		background-color: var(--violet-5);
		color: #fff;
		transition: var(--anim-duration-fast) var(--ease-3);
		width: 200px;
		text-align: center;

		&:hover {
			text-decoration: none;
			background-color: var(--orange-4);
			color: #000;
		}
	}

	img {
		height: clamp(100px, 50vh, 300px);
	}

	passage-auth {
		--passage-container-background-color: var(--purple-12);
		--passage-header-text-color: var(--pink-0);
		--passage-body-text-color: var(--pink-0);
		--passage-anchor-text-color: var(--yellow-5);
	}
</style>
