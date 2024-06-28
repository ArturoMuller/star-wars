import { addBulk, addData } from './db-store';
import { PLANET_STORE } from '$lib/store/constants';

export const storePlanets = async (planets, page) => {
  addBulk(PLANET_STORE, planets, page);
};
