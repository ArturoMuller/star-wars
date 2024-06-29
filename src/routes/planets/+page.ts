import { SWAPI_PLANETS } from '$lib/api/endpoints';
import { dbOps } from '$lib/db/store-utils';
import { browser } from '$app/environment';

function getPageParam(url) {
  if (!url) {
    return;
  }
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  return params.get('page');
}

export async function load({ fetch, url }) {
  const currPage = url.searchParams.get('page') ?? '1';
  if (browser) {
    const cachedResults = await dbOps.loadPlanets(currPage);
    if (cachedResults?.results?.length) {
      const { results, nextPage, previousPage } = cachedResults;
      return {
        planets: results,
        nextPage,
        previousPage,
      };
    }
  }
  const pageUrl = `${SWAPI_PLANETS}/?page=${currPage}`;
  const res = await fetch(pageUrl);
  const { results, next, previous } = await res.json();
  const nextPage = getPageParam(next);
  const previousPage = getPageParam(previous);
  if (browser) {
    dbOps.storePlanets(results, nextPage);
    dbOps.storePages({ page: currPage, nextPage, previousPage });
  }
  if (res.ok) {
    return {
      planets: results,
      nextPage,
      previousPage,
    };
  }
  return {
    status: res.status,
    error: new Error('Could not fetch planets'),
  };
}
