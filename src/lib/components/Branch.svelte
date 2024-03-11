<script lang="ts">
	import { aesGcmDecrypt as decrypt } from '$lib/crypto/decrypt';
	import type { Database } from '../../../database.types';
	import type { MyLeaf } from '../../types';
	import Leaf from './Leaf.svelte';

	type TheLeaf = Database['public']['Tables']['leafs']['Row'];

	const { leafs, user_id } = $props<{ leafs: TheLeaf[]; user_id: string }>();

	let my_leafs: MyLeaf[] = $state([]);

	async function decrypt_leafs() {
		for await (const leaf of leafs) {
			const content = await decrypt(leaf.content, user_id);
			const my_leaf = { content, date_stamp: leaf.date, id: leaf.id };
			my_leafs.push(my_leaf);
		}
	}
	decrypt_leafs();
</script>

<section>
	{#if my_leafs}
		{#each my_leafs as leaf, index}
			<Leaf {leaf} {index} id={leaf.id} />
		{/each}
	{/if}
</section>

<style lang="postcss">
	section {
		margin-block-start: var(--size-7);
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
	}
</style>
