<script lang="ts">
	import '../../node_modules/open-props/normalize.min.css';
</script>

<svelte:head>
	<title>The Gratitude Tree</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		--anim-duration-fast: 0.3s;
		background-image: var(--gradient-4);
	}
	:global(h1) {
		font-family: var(--font-sans);
		color: var(--blue-8);
		text-align: center;
		padding-block-start: var(--size-5);
	}
</style>
