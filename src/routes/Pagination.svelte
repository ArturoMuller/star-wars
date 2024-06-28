<script>
	export let previous
	export let next
</script>
<div>
	{#if previous}
		<a href={previous? `?page=${previous}` : '/'}>previous</a>
	{/if}
	{#if next}
		<a href={`?page=${next}`}>next</a>
	{/if}
</div>
<style>

</style>
