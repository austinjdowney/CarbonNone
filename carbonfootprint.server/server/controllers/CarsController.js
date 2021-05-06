import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { carsService } from '../services/CarsService'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllCars)
      .get('/:id', this.getCarById)
      .post('', this.createCar)
      .put('/:id', this.editCar)
      .delete('/:id', this.deleteCar)
  }

  async getAllCars(req, res, next) {
    try {
      const cars = await carsService.getAllCars(req.query)
      return res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCarById(req, res, next) {
    try {
      const car = await carsService.getCarById(req.params.id)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async createCar(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const car = await carsService.createCar(req.body)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async editCar(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const car = await carsService.editCar(req.body)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async deleteCar(req, res, next) {
    try {
      const car = await carsService.deleteCar(req.params.id, req.userInfo.id)
      return res.send({ message: 'Car Deleted', data: car })
    } catch (error) {
      next(error)
    }
  }
}
