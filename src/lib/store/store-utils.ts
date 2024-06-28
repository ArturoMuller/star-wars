import { addBulk, addData, getElem, getElems } from './db-store';
import {
  HOMEPLANET_INDEX,
  PAGES_STORE,
  PEOPLE_STORE,
  PLANET_STORE,
} from '$lib/store/constants';

export const storePlanets = async (planets, page) => {
  addBulk(PLANET_STORE, planets, page);
};

export const storePages = async ({ page, next, previous }) => {
  addData(PAGES_STORE, { page, next, previous });
};

export const storePlanet = async (planet) => {
  addData(PLANET_STORE, planet);
};

export const loadPlanet = async (page) => {
  return getElem(PLANET_STORE, page);
};

export const loadPeople = async (planet) => {
  return getElems(PEOPLE_STORE, HOMEPLANET_INDEX, planet);
};

export const storePeople = async (people) => {
  addBulk(PEOPLE_STORE, people);
};
