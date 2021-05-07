import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class ProfilesService {
  async getAllProfiles(query = {}) {
    const profiles = await dbContext.Accounts.find(query).populate('creator', 'name picture')
    return profiles
  }

  async getProfileById(id) {
    const profile = await dbContext.Accounts.findById(id).populate('creator', 'name picture')
    if (!profile) {
      throw new BadRequest('Invalid Id')
    }
    return profile
  }

  async editProfile(body) {
    const found = await this.getProfileById(body.id)
    if (found.id !== body.creatorId) {
      throw new BadRequest('Unauthorized Permissions')
    }
    const profile = await dbContext.Accounts.findOneAndUpdate({ _id: body.creatorId }, body, { new: true })
    return profile
  }
}

export const profilesService = new ProfilesService()
