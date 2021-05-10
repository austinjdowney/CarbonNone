import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getAllProfiles() {
    const res = await api.get('api/profiles')
    AppState.profiles = res.data
  }

  // vvv Set Active Profile vvv
  async getProfileById(id) {
    const res = await api.get(`api/profiles/${id}`)
    AppState.activeProfile = res.data
  }

  async editProfile(newProfile) {
    await api.put(`api/profiles/${newProfile.id}`, newProfile)
    this.getProfileById(newProfile.id)
  }
}

export const profilesService = new ProfilesService()
