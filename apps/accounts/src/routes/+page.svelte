<script>
	let { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p>{data.user?.id}</p>
<p>{data.user?.publicId}</p>
<p>{data.user?.name}</p>
<p>{data.user?.email}</p>
<p>{data.user?.createdAt}</p>
<p>{data.user?.updatedAt}</p>
