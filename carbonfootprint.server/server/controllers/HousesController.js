import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { housesService } from '../services/HousesService'

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllHouses)
      .get('/:id', this.getHouseById)
      .post('', this.createHouse)
      .put('/:id', this.editHouse)
  }

  async getAllHouses(req, res, next) {
    try {
      const houses = await housesService.getAllHouses(req.query)
      return res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouseById(req, res, next) {
    try {
      const house = await housesService.getHouseById(req.params.id)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const house = await housesService.editHouse(req.body)
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }
}
