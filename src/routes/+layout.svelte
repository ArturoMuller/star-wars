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
    }
</style>
