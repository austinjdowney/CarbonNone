import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class DaysService {
  async getAllDays(query = {}) {
    const days = await dbContext.Days.find(query).populate('creator', 'name picture')
    return days
  }

  async getDayById(id) {
    const day = await dbContext.Days.findById(id).populate('creator', 'name picture')
    if (!day) {
      throw new BadRequest('Invalid Id')
    }
    return day
  }

  async createDay(body) {
    const day = await dbContext.Days.create(body)
    return day
  }

  async editDay(body) {
    const found = this.getDayById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    const day = await dbContext.Days.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
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
