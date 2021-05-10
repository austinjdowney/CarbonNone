import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { profilesService } from '../services/ProfilesService'
import { housesService } from '../services/HousesService'
import { carsService } from '../services/CarsService'
import { daysService } from '../services/DaysService'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getAllProfiles)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getProfileById)
      .get('/:id/houses', this.getHouseByProfileId)
      .get('/:id/cars', this.getCarsByProfileId)
      .get('/:id/days', this.getDaysByProfileId)
      .put('/:id', this.editProfile)
  }

  async getAllProfiles(req, res, next) {
    try {
      const profiles = await profilesService.getAllProfiles(req.query)
      return res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfileById(req, res, next) {
    try {
      const profile = await profilesService.getProfileById(req.params.id)
      return res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getHouseByProfileId(req, res, next) {
    try {
      const house = await housesService.getHouseByProfileId({ creatorId: req.params.id })
      return res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async getCarsByProfileId(req, res, next) {
    try {
      const cars = await carsService.getCarsByProfileId({ creatorId: req.params.id })
      return res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getDaysByProfileId(req, res, next) {
    try {
      const days = await daysService.getDaysByProfileId({ creatorId: req.params.id })
      return res.send(days)
    } catch (error) {
      next(error)
    }
  }

  async editProfile(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const profile = await profilesService.editProfile(req.body)
      return res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
