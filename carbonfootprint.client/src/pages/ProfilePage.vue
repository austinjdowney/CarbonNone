<template>
  <div v-if="state.loading === true && state.activeProfile">
    Loading...
  </div>
  <div v-else class="profile-page container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="profile__title text-center">
          <h1 class="mb-0">
            CO2/25
          </h1>
          <small>This Weeks Score</small>
        </div>
      </div>
      <div class="col-12">
        <div class="graph pb-0">
          <div class="graph__data">
            <canvas class="myChart" id="myChart"></canvas>
          </div>
          <div class="graph__text d-flex justify-content-between align-items-center">
            <h6 class="mb-0">
              Your Scores for the Week
            </h6>
            <button class="graph__button btn btn-sm btn-grad">
              Add Data
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="profile profile-container component-spacing">
          <div class="profile__user-info">
            <h4 class="profile__user-info--name">
              Logan Ponder
            </h4>
            <small class="profile__user-info--bio">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster</small>
            <button class="profile__user-info--btn btn btn-sm btn-grad">
              Edit Profile
            </button>
          </div>
          <CreateCarModal />
          <CreateHouseModal />
          <CreateDayModal />
        </div>
        <button title="Open Create Car Form"
                type="button"
                class="btn btn-success text-light shadow"
                data-toggle="modal"
                data-target="#new-car-form"
                v-if="state.user.isAuthenticated"
        >
          Car
        </button>
      </div>
      <button title="Open Create House Form"
              type="button"
              class="btn btn-success text-light shadow"
              data-toggle="modal"
              data-target="#new-house-form"
              v-if="state.user.isAuthenticated"
      >
        House
      </button>
    </div>
    <button title="Open Create Day Form"
            type="button"
            class="btn btn-success text-light shadow"
            data-toggle="modal"
            data-target="#new-day-form"
    >
      Day
    </button>
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
  @import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
  .graph {
  padding: 1rem;
  margin: .5rem;
}
.profile {
  position: relative;
  &__user-info {
    &--btn {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
