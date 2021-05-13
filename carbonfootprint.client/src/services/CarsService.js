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
    const res = await api.post('api/cars', data)
    this.getCarsByProfileId(res.data.creatorId)
  }

  async deleteCar(id, profileId) {
    await api.delete(`api/cars/${id}`)
    this.getCarsByProfileId(profileId)
  }

  async editCar(newCar) {
    await api.put(`api/cars/${newCar.id}`, newCar)
    this.getAllCars()
  }
}

export const carsService = new CarsService()
