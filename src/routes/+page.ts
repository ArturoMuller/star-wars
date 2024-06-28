import { swapiPlanets } from '$lib/api/endpoints';
export async function load({ fetch }) {
	const res = await fetch(swapiPlanets);
	const { results, next, previous } = await res.json();
	if (res.ok) {
		return {
			planets: results,
			next,
			previous
		};
	}
	return {
		status: res.status,
		error: new Error('Could not fetch planets')
	};
}
