<script context="module">
	import { browser} from '$app/environment';
	import { dbInit } from '$lib/store/db-store';

	if (browser) {
		dbInit();
	} //Todo: move to another file that always runs
</script>

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
