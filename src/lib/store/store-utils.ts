import {addData} from './db-store'
import {getPlanets} from '$lib/api/endpoints';
const storePlanets = async (apiCall) => {
    const planets = await getPlanets(apiCall)
    addData()
}
