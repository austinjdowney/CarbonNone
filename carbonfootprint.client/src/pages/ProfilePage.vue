<template>
  <div v-if="state.loading === true && !state.activeProfile">
    Loading...
  </div>
  <div v-else class="profile-page container-fluid">
    <!-- Weeks Score -->
    <div class="row" v-if="state.todayScore">
      <div class="col-12">
        <div class="profile__title text-center">
          <h1 class="mb-0">
            {{ state.todayScore.dailyScore }}
            {{ state.todayScore.date }}
          </h1>
          <small>Most Recent Score</small>
        </div>
      </div>
      <div class="col-12">
        <div class="graph pb-0">
          <div class="graph__data">
            <canvas class="myChart" id="myChart"></canvas>
          </div>
          <div class="graph__text">
            <h1 class="mb-0" v-for="day in state.days" :key="day.id">
              {{ day.dailyScore }}
              {{ day.date }}
            </h1>
            <h6 class="mb-0  d-flex justify-content-between align-items-center">
              Your Scores for the Week
            </h6>
          </div>
        </div>
      </div>
    </div>
    <button title="Open Create Day Form"
            type="button"
            class="btn btn-grad btn-lg"
            data-toggle="modal"
            data-target="#new-day-form"
            v-if="state.account.id === route.params.id"
    >
      Add Day
    </button>
    <div class="row">
      <div class="col-12">
        <div class="profile profile-container component-spacing">
          <div class="profile__user-info">
            <h4 class="profile__user-info--name" v-if="state.activeProfile">
              {{ state.activeProfile.name }}
            </h4>
            <small class="profile__user-info--bio">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster</small>
          </div>
          <div class="profile__details mt-3">
            <div class="profile__details--header d-flex justify-content-between">
              <h6>House Details</h6>
              <button title="Open Create House Form"
                      type="button"
                      class="btn btn-grad btn-sm"
                      data-toggle="modal"
                      data-target="#new-house-form"
                      v-if="state.house.length === 0 && state.account.id === route.params.id"
              >
                House
              </button>
              <button v-if="state.account.id === route.params.id && state.house.length !== 0"
                      class="btn btn-sm btn-grad"
                      data-toggle="modal"
                      data-target="#edit-house-form"
              >
                Edit House
              </button>
            </div>
            <div class="profile__details--house d-flex flex-column" v-if="state.house.length > 0">
              <p>{{ state.house[0].title }}</p>
              <p>Monthly EKwh: {{ state.house[0].electricKwh }}</p>
              <p>Monthly Gallons: {{ state.house[0].waterGallons }}</p>
            </div>
            <div class="profile__details--car">
              <div class="profile__details--car-header d-flex justify-content-between">
                <h6>Car Details</h6>
                <button title="Open Create Car Form"
                        type="button"
                        class="btn btn-sm btn-grad"
                        data-toggle="modal"
                        data-target="#new-car-form"
                        v-if="state.account.id === route.params.id"
                >
                  Add Car
                </button>
              </div>
              <Car v-for="car in state.cars" :key="car.id" :car="car" />
            </div>
          </div>
        </div>
        <CreateCarModal />
        <CreateHouseModal />
        <CreateDayModal />
        <EditHouseModal />
      </div>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { computed, onMounted, reactive, watch } from 'vue'
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
    watch(
      () => route.params,
      async newParams => {
        // function you want to run when the params change, you can also use newParams.id
        if (newParams.id) {
          await profilesService.getProfileById(newParams.id)
          await carsService.getCarsByProfileId(newParams.id)
          await housesService.getHousesByProfileId(newParams.id)
          await daysService.getDaysByProfileId(newParams.id)
          state.loading = false
        }
      }
    )
    const state = reactive({
      loading: true,
      newCar: {},
      newHouse: {},
      newDay: {},
      activeDay: {},
      days: computed(() => AppState.days.splice(0, 7)),
      todayScore: computed(() => state.days[0]),
      house: computed(() => AppState.house),
      cars: computed(() => AppState.cars),
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
