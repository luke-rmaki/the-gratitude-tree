<script lang="ts">
	import { log_out } from '$lib/utils/passage/log_out';
	import LeafInput from '$lib/components/LeafInput.svelte';
	import Branch from '$lib/components/Branch.svelte';

	const { data } = $props();
	const { leafs, user } = data;

	async function signout() {
		await log_out();
	}
</script>

<main>
	<h1>My Gratitude Tree</h1>
	<button id="signout" on:click={signout}>Sign Out</button>
	<LeafInput />
	{#if leafs && leafs.length > 0}
		<Branch {leafs} user_id={user.user_id} />
	{/if}
</main>

<style lang="postcss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: calc(90vh - var(--size-2));
	}

	#signout {
		position: absolute;
		top: 20px;
		right: 20px;
		background-color: var(--indigo-4);
		padding: var(--size-1) var(--size-2);
		border-radius: var(--radius-1);
		box-shadow: var(--shadow-2);
		transition: all 0.2s var(--ease-1);

		&:hover {
			background-color: var(--indigo-8);
		}
	}
</style>
