import { SWAPI_PLANETS } from '$lib/api/endpoints';
import { browser } from '$app/environment';
import {
  loadPeople,
  loadPlanet,
  storePeople,
  storePlanet,
} from '$lib/store/store-utils';

export async function load({ fetch, params }) {
  const planetUrl = `${SWAPI_PLANETS}/${params.id}`;
  if (browser) {
    const cachedResults = await Promise.all([
      loadPlanet(planetUrl),
      loadPeople(planetUrl),
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
  const residents = await fetchResidentData(planet.residents);
  if (browser) {
    storePlanet(planet);
    storePeople(residents);
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

async function fetchResidentData(residentUrls) {
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
