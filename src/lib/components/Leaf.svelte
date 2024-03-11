<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import type { MyLeaf } from '../../types';
	import { enhance } from '$app/forms';
	import type { Branch } from '$lib/state/branch.svelte';

	const { leaf, index, id, branch } = $props<{
		leaf: MyLeaf;
		index: number;
		id: string;
		branch: Branch; // theres probably a better way to do this
	}>();
	const date = $derived(Temporal.PlainDateTime.from(leaf.date));

	// cap id at 2 and return to 0
	const capped = (index + 1) % 3;
</script>

<div data-index={capped} data-id={id}>
	<form
		action="?/delete"
		method="post"
		use:enhance={() => {
			branch.remove_leaf(id);
			branch.refresh();
			return ({ update }) => {
				update();
			};
		}}
	>
		<input type="hidden" value={id} name="id" />
		<button type="submit">X</button>
	</form>
	<p>{date.toLocaleString('en-AU', { hourCycle: 'h12' })}</p>
	<p>{leaf.content}</p>
</div>

<style lang="postcss">
	div {
		position: relative;
		background-color: var(--cyan-11);
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-1);
		box-shadow: var(--shadow-2);
		min-width: var(--size-14);
		text-align: center;
		margin-block-end: var(--size-5);

		p:first-child {
			font-size: var(--font-size-0);
		}

		button {
			position: absolute;
			top: 0;
			right: 0;
		}
	}

	[data-index='0'] {
		background-color: var(--pink-6);
	}
	[data-index='1'] {
		background-color: var(--green-6);
	}
</style>
