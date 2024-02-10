<script lang="ts">
	import { log_out } from '$lib/utils/passage/log_out.js';

	const { data } = $props();

	console.log(data);

	async function signout() {
		await log_out();
	}
</script>

<div>
	<h1>My Gratitude Tree</h1>
	<button on:click={signout}>Sign Out</button>
</div>
