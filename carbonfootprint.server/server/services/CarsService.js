import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class CarsService {
  async getAllCars(query = {}) {
    const cars = await dbContext.Cars.find(query).populate('creator', 'name picture')
    return cars
  }

  async getCarById(id) {
    const car = await dbContext.Cars.findById(id).populate('creator', 'name picture')
    if (!car) {
      throw new BadRequest('Invalid Id')
    }
    return car
  }

  async getCarsByProfileId(profileId) {
    const car = await dbContext.Cars.find(profileId).populate('creator', 'name picture')
    if (!car) {
      throw new BadRequest('No Cars For This Profile')
    }
    return car
  }

  async createCar(body) {
    const car = await dbContext.Cars.create(body)
    return car
  }

  async editCar(body) {
    const found = await this.getCarById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    const car = await dbContext.Cars.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return car
  }

  async deleteCar(id, profileId) {
    const car = await this.getCarById(id)
    if (car.creatorId !== profileId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    await dbContext.Cars.findOneAndDelete({ _id: id })
    return 'Successfully Deleted'
  }
}

export const carsService = new CarsService()
