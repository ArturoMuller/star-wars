import { SWAPI_PLANETS } from '$lib/api/endpoints';
import { dbOps } from '$lib/db/store-utils';
import { browser } from '$app/environment';

export async function load({ fetch, params }) {
  const planetUrl = `${SWAPI_PLANETS}/${params.id}`;
  if (browser) {
    const cachedResults = await Promise.all([
      dbOps.loadPlanet(planetUrl),
      dbOps.loadPeople(planetUrl),
    ]);
    const [planetData, peopleData] = cachedResults;
    const hasNoResidents = planetData && planetData.residents.length === 0;
    const hasResidentsAndPeopleData =
      planetData && planetData.residents.length > 0 && peopleData.length > 0;
    if (hasNoResidents || hasResidentsAndPeopleData) {
      return {
        planet: planetData,
        residents: peopleData,
      };
    }
  }
  const res = await fetch(planetUrl);
  const planet = await res.json();
  const residents = await fetchResidentData(fetch, planet.residents);
  if (browser) {
    dbOps.storePlanet(planet);
    dbOps.storePeople(residents);
  }
  if (res.ok) {
    return {
      planet,
      residents,
    };
  }
  return {
    status: res.status,
    error: new Error('Could not fetch planet'),
  };
}

async function fetchResidentData(fetch, residentUrls) {
  if (residentUrls.length === 0) {
    return [];
  }
  const fetchPromises = residentUrls.map((url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data from ${url}: ${response.statusText}`
        );
      }
      return response.json();
    })
  );
  return Promise.all(fetchPromises);
}
