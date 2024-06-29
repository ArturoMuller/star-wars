<script>
	export let planet;
	export let residents;
</script>

<div class="planets">
		<div class="planet-item">
			<h1>{planet.name}</h1>
			<div class="planet-fields">
				<div>Climate: {planet.climate} </div>
				<div>Gravity: {planet.gravity} </div>
				<div>Terrain: {planet.terrain} </div>
				<div>Surface Water: {planet.surface_water} </div>
			</div>
			<div class="planet-fields">
				<div>Rotational Period: {planet.rotation_period} </div>
				<div>Orbital Period: {planet.orbital_period} </div>
				<div>Diameter: {planet.diameter} </div>
				<div>Climate: {planet.climate} </div>
			</div>
			<div class="planet-fields">
				<div>Population: {planet.population} </div>
				<div>Films: {planet.films.length} </div>
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
