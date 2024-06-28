import { swapiPlanets } from '$lib/api/endpoints';
import { browser } from '$app/environment';

export async function load({ fetch, url }) {
  const nextPage = url.searchParams.get('page') ?? swapiPlanets;
  const res = await fetch(nextPage);
  const { results, next, previous } = await res.json();
  if (res.ok) {
    return {
      planets: results,
      next,
      previous,
    };
  }
  return {
    status: res.status,
    error: new Error('Could not fetch planets'),
  };
}
