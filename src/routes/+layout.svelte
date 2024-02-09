<script lang="ts">
	import '../../node_modules/open-props/normalize.min.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();
	console.log(data);
	// let { supabase, session } = data;
	// onMount(() => {
	// 	const {
	// 		data: { subscription }
	// 	} = supabase.auth.onAuthStateChange((event, _session) => {
	// 		if (_session?.expires_at !== session?.expires_at) {
	// 			invalidate('supabase:auth');
	// 		}
	// 	});

	// 	return () => subscription.unsubscribe();
	// });
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
	}
</style>
