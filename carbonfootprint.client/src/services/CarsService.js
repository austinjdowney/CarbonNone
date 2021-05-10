import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class CarsService {
  async getAllCars() {
    const res = await api.get('api/cars')
    AppState.cars = res.data
  }

  async getCarById(id) {
    const res = await api.get(`api/cars/${id}`)
    AppState.cars = res.data
  }

  async getCarsByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/cars`)
    AppState.cars = [res.data, ...AppState.defaultCars]
  }

  async createCar(data) {
    const res = await api.post('api/cars', data)
    router.push({ name: 'ProfilePage', params: { id: res.data.id } })
  }

  async deleteCar(id, profileId) {
    await api.delete(`api/cars/${id}`)
    this.getProfileById(profileId)
  }

  async editCar(newCar) {
    await api.put(`api/cars/${newCar.id}`, newCar)
    this.getCarById(newCar.id)
  }
}

export const carsService = new CarsService()
