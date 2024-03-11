<script lang="ts">
	import { log_out } from '$lib/utils/passage/log_out';
	import { aesGcmDecrypt as decrypt } from '$lib/crypto/decrypt';
	import LeafInput from '$lib/components/LeafInput.svelte';
	import Branch from '$lib/components/Branch.svelte';
	import { create_branch } from '$lib/state/branch.svelte.js';
	import type { Database } from '../../../../database.types.js';
	import { Temporal } from 'temporal-polyfill';

	const { data } = $props();
	const { leafs, user } = data;
	const branch = create_branch();

	type TheLeaf = Database['public']['Tables']['leafs']['Row'];

	async function decrypt_leafs(leafs: TheLeaf[]) {
		for await (const leaf of leafs) {
			const content = await decrypt(leaf.content, user.user_id);
			const my_leaf = { content, date: Temporal.PlainDateTime.from(leaf.date), id: leaf.id };
			branch.add_leaf(my_leaf);
		}
	}

	if (leafs && leafs.length > 0) {
		decrypt_leafs(leafs);
	}

	async function signout() {
		await log_out();
	}
</script>

<main>
	<h1>My Gratitude Tree</h1>
	<button id="signout" on:click={signout}>Sign Out</button>
	<LeafInput {branch} />
	{#if leafs && leafs.length > 0}
		<Branch {branch} />
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
