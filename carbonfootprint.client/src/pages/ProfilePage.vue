<template>
  <div v-if="state.loading === true && state.activeProfile">
    Loading...
  </div>
  <div class="profile-page container-fluid" v-else>
    <div class="row">
      <div class="col-12">
        This Week's Score
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <img src="http://placehold.it/200x200" alt="">
      </div>
      <div class="col-12">
        Your Scores for the Week
        <button title="Open Create Car Form"
                type="button"
                class="btn btn-success text-light shadow"
                data-toggle="modal"
                data-target="#new-car-form"
                v-if="state.user.isAuthenticated"
        >
          Car
        </button>
        <CreateCarModal />
        <button title="Open Create House Form"
                type="button"
                class="btn btn-success text-light shadow"
                data-toggle="modal"
                data-target="#new-house-form"
                v-if="state.user.isAuthenticated"
        >
          House
        </button>
        <CreateHouseModal />
        <CreateDayModal />
        <button title="Open Create Day Form"
                type="button"
                class="btn btn-success text-light shadow"
                data-toggle="modal"
                data-target="#new-day-form"
        >
          Day
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        User's Profile
      </div>
      <div class="col-12">
        Location:
      </div>
      <div class="col-12">
        Info
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button>edit profile</button>
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
import Notification from '../utils/Notification'
import { profilesService } from '../services/ProfilesService'
import { carsService } from '../services/CarsService'
import { housesService } from '../services/HousesService'
import { daysService } from '../services/DaysService'

export default {
  name: 'ProfilePage',

  props: {
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newCar: {},
      newHouse: {},
      newDay: {},
      activeCar: {},
      activeHouse: {},
      activeDay: {},
      activeProfile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      await profilesService.getProfileById(route.params.id)
      await carsService.getCarsByProfileId(route.params.id)
      await housesService.getHousesByProfileId(route.params.id)
      await daysService.getDaysByProfileId(route.params.id)
      state.loading = false
    })
    return {
      route,
      state,
      async deleteCar() {
        try {
          if (await Notification.confirmAction('Are you sure?', "You won't be able to revert this!", 'warning', 'Yes, Remove Car')) {
            await carsService.deleteCar(state.cars.id, state.profiles.id)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async createCar() {
        try {
          state.newCar.activeProfile = route.params.id
          await carsService.createCar(state.newCar)
          state.newCar = {}
          Notification.toast('Successfully Created Car', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async editCar() {
        try {
          if (await Notification.confirmAction('Are you sure?', "You won't be able to revert this!", 'warning', 'Yes, Edit Car')) { state.newCar.id = state.activeCar.id }
          await carsService.editCar(state.newCar)
          state.newCar = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async createHouse() {
        try {
          state.newHouse.activeProfile = route.params.id
          await housesService.createHouse(state.newHouse)
          state.newHouse = {}
          Notification.toast('Successfully Created House', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async editHouse() {
        try {
          if (await Notification.confirmAction('Are you sure?', "You won't be able to revert this!", 'warning', 'Yes, Edit House')) { state.newHouse.id = state.activeHouse.id }
          await housesService.editHouse(state.newHouse)
          state.newHouse = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async createDay() {
        try {
          state.newDay.activeProfile = route.params.id
          await daysService.createDay(state.newDay)
          state.newDay = {}
          Notification.toast('Successfully Created Day', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      },
      async editDay() {
        try {
          if (await Notification.confirmAction('Are you sure?', "You won't be able to revert this!", 'warning', 'Yes, Edit Day')) { state.newDay.id = state.activeDay.id }
          await daysService.editDay(state.newDay)
          state.newDay = {}
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  *{
    border: solid 1px red;
  }
</style>
