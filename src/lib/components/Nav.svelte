<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { create_pages } from '$lib/pages.svelte';

	let { session } = $props();
	const pages = create_pages();

	let page_list = $state(pages.get_all(session !== null));

	beforeNavigate((event) => {
		pages.update_page(event.to?.url.pathname || '');
	});
</script>

<nav>
	<a href="/"><img src="/icon.svg" alt="" srcset="" /></a>
	{#each page_list as page}
		{#if !page.hide}
			<a href={page.path}>{page.name}</a>
		{/if}
	{/each}
</nav>

<style lang="postcss">
	nav {
		display: flex;
		background-color: var(--blue-12);
		justify-content: space-around;
		padding: var(--size-2);
	}
	img {
		min-width: 2rem;
	}

	a {
		color: var(--blue-0);
		transition-duration: var(--anim-duration-fast);
		transition-timing-function: var(--ease-3);

		&:hover {
			color: var(--green-5);
		}
	}
</style>
