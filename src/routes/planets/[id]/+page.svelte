<script>
	import Planet from './Planet.svelte';

	export let data
</script>
<section>
	<Planet planet={data.planet} residents={data.residents}/>
</section>
