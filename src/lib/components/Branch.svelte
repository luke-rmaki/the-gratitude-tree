<script lang="ts">
	import { aesGcmDecrypt as decrypt } from '$lib/crypto/decrypt';
	import { Temporal } from 'temporal-polyfill';
	import type { Database } from '../../../database.types';
	import Leaf from './Leaf.svelte';
	import type { Branch } from '$lib/state/branch.svelte';

	const { branch } = $props<{ branch: Branch }>();
</script>

<section>
	{#if branch.leafs}
		{#each branch.leafs as leaf, index}
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
