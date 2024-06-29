<script>
	import Link from '$lib/components/Link.svelte';

	export let planets
	const planetEndpoint = 'planets'
</script>

<div class="planets">
	{#each planets as { name, climate, residents, terrain, url }}
		<Link url={url} endpoint={planetEndpoint}>
			<div class="planet-item">
				<h1>{name}</h1>
				<div class="planet-fields">
					<div>Total residents: {residents.length} </div>
					<div>Climate: {climate} </div>
					<div>Terrain: {terrain} </div>
				</div>
			</div>
		</Link>
	{/each}
</div>


<style>
    .planets {
        scrollbar-gutter: stable both-edges;
        display: flex;
        flex-direction: column;
        gap: 16px; /* Space between planet items */
    }
    .planet-item {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        background-color: rgba(249, 249, 249, 0.79);
    }

    .planet-fields {
        flex-direction: row;
        display: flex;
        justify-content: flex-start;
        gap: 16px; /* Space between fields */
        flex: 1;
    }
    .planet-fields {
        flex: 1; /* Each field takes up an equal amount of space */
    }
    h1 {
        margin: 0 0 16px; /* Space between title and fields */
    }
</style>
