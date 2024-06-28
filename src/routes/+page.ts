import { SWAPI_PLANETS } from '$lib/api/endpoints';
import { browser } from '$app/environment';
import { dbInit } from '$lib/store/db-store';
import { storePlanets } from '$lib/store/store-utils';

export async function load({ fetch, url }) {
  const nextPage = url.searchParams.get('page') ?? SWAPI_PLANETS;
  const res = await fetch(nextPage);
  const { results, next, previous } = await res.json();
  if (browser) {
    storePlanets(results, nextPage);
  }
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
