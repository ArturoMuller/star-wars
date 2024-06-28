import { addBulk, addData, getElem } from './db-store';
import { PAGES_STORE, PLANET_STORE } from '$lib/store/constants';

export const storePlanets = async (planets, page) => {
  addBulk(PLANET_STORE, planets, page);
};

export const storePages = async ({ page, next, previous }) => {
  addData(PAGES_STORE, { page, next, previous });
};

export const loadPlanets = async (page) => {
  return loadPlanets(page);
};

export const getPage = async (page) => {
  return getElem(PAGES_STORE, page);
};
