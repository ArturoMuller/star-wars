<script>
	export let url
	export let endpoint
	let id
	$: {
		const match = url.match(/\d+/);
		id = match ? match[0] : 'unknown';
	}
</script>
<a href={`${endpoint}/${id}`} class="link-wrapper">
	<slot></slot>
</a>

<style>
	.link-wrapper {
			text-decoration: none;
			color: inherit;
			display: block; /* Ensures the anchor behaves like a block element */
	}
</style>
