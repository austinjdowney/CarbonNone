import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class HousesService {
  async getAllHouses() {
    const res = await api.get('api/houses')
    AppState.house = res.data
  }

  async getHouseById(id) {
    const res = await api.get(`api/houses/${id}`)
    AppState.house = res.data
  }

  async getHousesByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/houses`)
    AppState.house = res.data
  }

  async createHouse(data) {
    await api.post('api/houses', data)
    this.getAllHouses()
  }

  async editHouse(newHouse) {
    const res = await api.put(`api/houses/${newHouse.id}`, newHouse)
    AppState.house[0] = res.data
    logger.log(res.data)
  }
}

export const housesService = new HousesService()
