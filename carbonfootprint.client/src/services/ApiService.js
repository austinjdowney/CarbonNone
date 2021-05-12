import { AppState } from '../AppState'
import { newsApi, weatherApi } from './AxiosService'
class ApiService {
  async getNewsApi() {
    const res = await newsApi.get('')
    AppState.newsApi = res.data.value
    // console.log(res.data.value)
  }

  async getWeatherApi() {
    const res = await weatherApi.get('')
    AppState.weatherApi = res.data.data
    console.log(res.data.data)
  }
}
export const apiService = new ApiService()
