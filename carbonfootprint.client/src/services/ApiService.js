import { AppState } from '../AppState'
import { newsApi } from './AxiosService'
// import { weatherApi } from './AxiosService'
class ApiService {
  async getNewsApi() {
    const res = await newsApi.get('')
    AppState.newsApi = res.data
  }
  //  async getWeatherApi() {
  //   const res = await weatherApi.get('')
  //   AppState.weatherApi = res.data
  // }
}
export const apiService = new ApiService()
