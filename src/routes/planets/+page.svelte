<script>
    import Planets from './Planets.svelte';
    import Pagination from './Pagination.svelte';
    export let data;
</script>
<div>
    <div class="scrollable">
        <Planets planets={data.planets} />
    </div>
    <Pagination previous={data.previousPage} next={data.nextPage}/>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        height: 100%;
    }


    /* Scrollable area for the Planets component */
    .scrollable {
        flex: 1;
        overflow-y: auto;
    }
</style>
