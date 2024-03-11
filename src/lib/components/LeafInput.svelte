<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Branch } from '$lib/state/branch.svelte';
	import { Temporal } from 'temporal-polyfill';

	const { branch } = $props<{ branch: Branch }>();
</script>

<form
	method="post"
	action="?/add"
	use:enhance={({ formData }) => {
		branch.add_leaf({
			content: formData?.get('content')?.toString() || '',
			date: Temporal.Now.plainDateTimeISO(),
			id: ''
		});
		branch.refresh();
		return ({ update }) => {
			update();
		};
	}}
>
	<textarea name="content" />

	<button type="submit">Submit</button>
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin-top: var(--size-5);
	}
	textarea {
		resize: none;
		background-color: var(--pink-2);
		color: var(--gray-12);
		width: 500px;
		margin-bottom: var(--size-2);
	}
	button {
		width: 100px;
	}
</style>
