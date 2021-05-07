import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class HousesService {
  async getAllHouses(query = {}) {
    const houses = await dbContext.Houses.find(query).populate('creator', 'name picture')
    return houses
  }

  async getHouseById(id) {
    const house = await dbContext.Houses.findById(id).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('Invalid Id')
    }
    return house
  }

  async getHouseByProfileId(profileId) {
    const house = await dbContext.Houses.find(profileId).populate('creator', 'name picture')
    if (!house) {
      throw new BadRequest('No House For This Profile Id')
    }
    return house
  }

  async createHouse(body) {
    const house = await dbContext.Houses.create(body)
    return house
  }

  async editHouse(body) {
    const found = await this.getHouseById(body.id)
    if (found.creatorId !== body.creatorId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    const house = await dbContext.Houses.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return house
  }
}

export const housesService = new HousesService()
