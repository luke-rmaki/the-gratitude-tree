<script lang="ts">
	import { Temporal } from 'temporal-polyfill';
	import type { MyLeaf } from '../../types';

	const { leaf, index, id } = $props<{ leaf: MyLeaf; index: number; id: string }>();
	const date = $derived(Temporal.PlainDateTime.from(leaf.date));

	// cap id at 2 and return to 0
	const capped = (index + 1) % 3;

	async function delete_me() {
		const res = await fetch('/api/leaf/delete', { method: 'POST', body: JSON.stringify({ id }) });
		const data = await res.json();
	}
</script>

<div data-index={capped} data-id={id}>
	<button on:click={delete_me}>X</button>
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
