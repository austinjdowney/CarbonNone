<template>
  <div class="Car row" v-if="car.closed === false">
    <div class="col-12">
      <div class="car-summary component-spacing d-flex">
        <div class="car-summary__data d-flex flex-column w-100 text-left">
          <h5 class="car-summary__data--name mb-0">
            {{ car.title }} || Year: {{ car.year }}
          </h5>
          <div>
            Make: {{ car.make }} || Model: {{ car.model }}
          </div>
          <p>MPG: {{ car.mpg }} || Fuel Type: {{ car.gasType }}</p>
          <div class="d-flex">
            <button title="Open Edit Car Form"
                    type="button"
                    class="btn btn-sm btn-grad"
                    data-toggle="modal"
                    data-target="#edit-car-form"
                    v-if="state.account.id === route.params.id"
            >
              Edit Car
            </button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              v-if="state.account.id === route.params.id"
              @click="deleteCar"
            >
              Delete Car
            </button>
            <EditCarModal :car="car" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { carsService } from '../services/CarsService'
import Notification from '../utils/Notification'

export default {
  name: 'Car',
  props: {
    car: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newCar: {},
      cars: computed(() => AppState.cars),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      route,
      async deleteCar() {
        try {
          if (await Notification.confirmAction('Are you sure?', "You won't be able to revert this!", 'warning', 'Yes, Remove Car')) {
            await carsService.deleteCar(props.car.id, state.account.id)
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'warning')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
