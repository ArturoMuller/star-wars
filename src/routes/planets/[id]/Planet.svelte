<script>
	export let planet;
	export let residents;
	const {
		name,
		rotation_period,
		orbital_period,
		diameter,
		climate,
		gravity,
		terrain,
		surface_water,
		population,
		films,
	} = planet;
</script>

<div class="planets">
		<div class="planet-item">
			<h1>{name}</h1>
			<div class="planet-fields">
				<div>Climate: {climate} </div>
				<div>Gravity: {gravity} </div>
				<div>Terrain: {terrain} </div>
				<div>Surface Water: {surface_water} </div>
			</div>
			<div class="planet-fields">
				<div>Rotational Period: {rotation_period} </div>
				<div>Orbital Period: {orbital_period} </div>
				<div>Diameter: {diameter} </div>
				<div>Climate: {climate} </div>
			</div>
			<div class="planet-fields">
				<div>Population: {population} </div>
				<div>Films: {films.length} </div>
			</div>
			<div class="planet-fields">
				<div>Residents:
					{#each residents as { name }, index }
					<span>
						{name}{#if index < residents.length - 1}, {/if}{#if index === residents.length - 1}.{/if}
					</span>
					{/each}
				</div>
			</div>
		</div>
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
    }

    .planet-fields span {
        flex: 1; /* Each field takes up an equal amount of space */
    }

    h1 {
        margin: 0 0 16px; /* Space between title and fields */
    }
</style>
