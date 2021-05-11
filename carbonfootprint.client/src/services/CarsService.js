import { AppState } from '../AppState'
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
    AppState.cars = res.data
  }

  async createCar(data) {
    await api.post('api/cars', data)
    this.getAllCars()
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
