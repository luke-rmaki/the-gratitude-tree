<script lang="ts">
</script>

<form method="post" action="?/submit">
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
