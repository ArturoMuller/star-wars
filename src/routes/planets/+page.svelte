<script>
    import Planets from './Planets.svelte';
    import Pagination from './Pagination.svelte';
    export let data;
</script>
<section>
    <Planets planets={data.planets} />
    <Pagination previous={data.previousPage} next={data.nextPage}/>
</section>
