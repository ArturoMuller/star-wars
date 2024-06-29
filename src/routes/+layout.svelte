<script>
	import Header from './Header.svelte'
	import '../styles/global.css'

</script>

<Header />
<main>
	<slot></slot>
</main>

<style>
    main {
        max-width: 960px;
        margin: 20px auto;
        position: absolute;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
