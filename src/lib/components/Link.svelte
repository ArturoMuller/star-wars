<script>
	export let url
	export let endpoint
	const match = url.match(/\d+/);
	const id = match[0];
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
