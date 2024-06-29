import {
  addBulk,
  addData,
  dbInit,
  getElem,
  getElems,
  loadPage,
} from './db-store';
import {
  HOMEPLANET_INDEX,
  PAGES_STORE,
  PEOPLE_STORE,
  PLANET_STORE,
} from './constants';
import { browser } from '$app/environment';

async function setupDb() {
  const dbClient = await dbInit();
  return dbClient;
}

const dbPromise = browser ? setupDb() : null;

const storePlanets = async (planets, page) => {
  const db = await dbPromise;
  return addBulk(db, PLANET_STORE, planets, page);
};

const storePages = async ({ page, next, previous }) => {
  const db = await dbPromise;
  return addData(db, PAGES_STORE, { page, next, previous });
};

const storePlanet = async (planet) => {
  const db = await dbPromise;
  return addData(db, PLANET_STORE, planet);
};

const loadPlanets = async (page) => {
  const db = await dbPromise;
  return loadPage(db, page);
};

const loadPlanet = async (page) => {
  const db = await dbPromise;
  return getElem(db, PLANET_STORE, page);
};

const loadPeople = async (planet) => {
  const db = await dbPromise;
  return getElems(db, PEOPLE_STORE, HOMEPLANET_INDEX, planet);
};

const storePeople = async (people) => {
  const db = await dbPromise;
  return addBulk(db, PEOPLE_STORE, people);
};

export const dbOps = {
  storePlanets: storePlanets,
  storePages: storePages,
  storePlanet: storePlanet,
  loadPlanets: loadPlanets,
  loadPlanet: loadPlanet,
  loadPeople: loadPeople,
  storePeople: storePeople,
};
