import { dbContext } from '../db/DbContext'
import { dailyScore } from '../utils/Calculations'
import { BadRequest } from '../utils/Errors'

class DaysService {
  async getAllDays(query = {}) {
    const days = await dbContext.Days.find(query).populate('creator', 'name picture')
    for (const day of days) {
      day.dailyScore = await dailyScore(day)
    }
    return days
  }

  async getDayById(id) {
    const day = await dbContext.Days.findById(id).populate('creator', 'name picture')
    if (!day) {
      throw new BadRequest('Invalid Id')
    }
    day.dailyScore = await dailyScore(day)
    return day
  }

  async getDaysByProfileId(query = {}) {
    const days = await dbContext.Days.find(query).populate('creator', 'name picture')
    if (!days) {
      throw new BadRequest('No Day For This Profile Id')
    }
    for (const day of days) {
      day.dailyScore = await dailyScore(day)
    }
    return days
  }

  async createDay(body) {
    const found = await this.getDaysByProfileId({ creatorId: body.creatorId })
    for (const day of found) {
      const dayDate = new Date(day.date).toISOString().slice(0, 10)
      const bodyDate = new Date(body.date).toISOString().slice(0, 10)
      if (bodyDate === dayDate) {
        throw new BadRequest('This day already exists')
      }
    }
    const day = await dbContext.Days.create(body)
    day.dailyScore = await dailyScore(day)
    return day
  }

  async editDay(body) {
    const found = await this.getDayById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    const day = await dbContext.Days.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    day.dailyScore = await dailyScore(day)

    return day
  }

  async deleteDay(id, profileId) {
    const day = await this.getDayById(id)
    if (day.creatorId !== profileId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    await dbContext.Days.findOneAndDelete({ _id: id })
    return 'Successfully Deleted'
  }
}

export const daysService = new DaysService()
