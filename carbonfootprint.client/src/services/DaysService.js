import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class DaysService {
  async getAllDays() {
    const res = await api.get('api/days')
    AppState.days = res.data
  }

  async getDayById(id) {
    const res = await api.get(`api/days/${id}`)
    AppState.days = res.data
  }

  async getDaysByProfileId(profileId) {
    const res = await api.get(`api/profiles/${profileId}/days`)
    AppState.days = res.data
  }

  async createDay(data) {
    const res = await api.post('api/days', data)
    router.push({ name: 'ProfilePage', params: { id: res.data.id } })
  }

  async editDay(newDay) {
    await api.put(`api/days/${newDay.id}`, newDay)
    this.getDayById(newDay.id)
  }
}

export const daysService = new DaysService()
