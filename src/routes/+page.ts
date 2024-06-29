import { SWAPI_PLANETS } from '$lib/api/endpoints';
import { dbOps } from '$lib/db/store-utils';

export async function load({ fetch, url, browser }) {
  const nextPage = url.searchParams.get('page') ?? SWAPI_PLANETS;
  if (browser) {
    const cachedResults = await loadPlanets(nextPage);
    if (cachedResults) {
      const { results, next, previous } = cachedResults;
      return {
        planets: results,
        next,
        previous,
      };
    }
  }
  const res = await fetch(nextPage);
  const { results, next, previous } = await res.json();
  if (browser) {
    console.log('test store planet');

    dbOps.storePlanets(results, nextPage);
    dbOps.storePages({ page: nextPage, next, previous });
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
