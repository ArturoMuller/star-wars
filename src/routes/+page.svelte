<script>
    import Planets from './Planets.svelte';
    export let data
</script>
<section>
    <Planets planets={data.planets} next={data.next} />
</section>
