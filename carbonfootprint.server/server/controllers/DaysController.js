import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { daysService } from '../services/DaysService'

export class DaysController extends BaseController {
  constructor() {
    super('api/days')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllDays)
      .get('/:id', this.getDayById)
      .post('', this.createDay)
      .put('/:id', this.editDay)
      .delete('/:id', this.deleteDay)
  }

  async getAllDays(req, res, next) {
    try {
      const days = await daysService.getAllDays(req.query)
      return res.send(days)
    } catch (error) {
      next(error)
    }
  }

  async getDayById(req, res, next) {
    try {
      const day = await daysService.getDayById(req.params.id)
      return res.send(day)
    } catch (error) {
      next(error)
    }
  }

  async createDay(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const day = await daysService.createDay(req.body)
      return res.send(day)
    } catch (error) {
      next(error)
    }
  }

  async editDay(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const day = await daysService.editDay(req.body)
      return res.send(day)
    } catch (error) {
      next(error)
    }
  }

  async deleteDay(req, res, next) {
    try {
      const day = await daysService.deleteDay(req.params.id, req.userInfo.id)
      return res.send({ message: 'Day Deleted', data: day })
    } catch (error) {
      next(error)
    }
  }
}
