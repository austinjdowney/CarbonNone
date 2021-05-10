import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class HousesService {
  async getAllHouses() {
    const res = await api.get('api/houses')
    AppState.houses = res.data
  }

  async getHouseById(id) {
    const res = await api.get(`api/houses/${id}`)
    AppState.houses = res.data
  }

  async getHousesByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/houses`)
    AppState.house = [res.data, ...AppState.defaultHouse]
  }

  async createHouse(data) {
    const res = await api.post('api/houses', data)
    router.push({ name: 'ProfilePage', params: { id: res.data.id } })
  }

  async editHouse(newHouse) {
    await api.put(`api/houses/${newHouse.id}`, newHouse)
    this.getHouseById(newHouse.id)
  }
}

export const housesService = new HousesService()
