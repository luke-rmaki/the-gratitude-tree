<script lang="ts">
	import { PUBLIC_PASSAGE_APP_ID } from '$env/static/public';
</script>

<main>
	<h1>The Gratitude Tree</h1>
	<passage-auth app-id={PUBLIC_PASSAGE_APP_ID}></passage-auth>

	<img src="/icon.svg" alt="" />
</main>

<style lang="postcss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(90vh - var(--size-2));
		justify-content: space-around;
	}

	h1 {
		text-align: center;
	}
	a {
		padding: var(--size-3) var(--size-4);
		border-radius: var(--border-size-3);
		background-color: var(--violet-5);
		color: #fff;
		transition: var(--anim-duration-fast) var(--ease-3);
		width: 150px;
		text-align: center;

		&:hover {
			text-decoration: none;
			background-color: var(--orange-4);
			color: #000;
		}
	}

	img {
		height: clamp(200px, 50vh, 400px);
	}

	passage-auth {
		--passage-container-background-color: var(--purple-12);
		--passage-header-text-color: var(--pink-0);
		--passage-body-text-color: var(--pink-0);
		--passage-anchor-text-color: var(--yellow-5);
	}
</style>
