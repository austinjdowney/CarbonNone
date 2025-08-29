import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})
export const weatherApi = Axios.create({
  baseURL: 'https://api.airvisual.com/v2/city?city=Boise&state=Idaho&country=USA&key=040cdc41-fc2a-44dd-a696-5d6245acce0e',
  timeout: 15000
})
export const newsApi = Axios.create({
  baseURL: 'https://custom-search.p.rapidapi.com/api/search/CustomNewsSearchAPIV2?q=Carbon Emissions&searchEngineId=687417457347224395&pageNumber=1',
  timeout: 15000,
  headers: {
    'x-rapidapi-key': 'getNewApiKey',
    'x-rapidapi-host': 'custom-search.p.rapidapi.com',
    useQueryString: true
  }
})
export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}
export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
