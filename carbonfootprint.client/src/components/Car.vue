<template>
  <div class="Car row" v-if="car.closed === false">
    <div class="col-12">
      <div class="car-summary component-car d-flex">
        <div class="car-summary__data d-flex flex-column w-100 text-left ml-2">
          <strong>{{ car.title }}</strong>
          <div>
            <ul class="list">
              <li>Year: {{ car.year }}</li>
              <li>Make: {{ car.make }}</li>
              <li>Model: {{ car.model }}</li>
              <li>MPG: {{ car.mpg }}</li>
              <li>Fuel Type: {{ car.gasType }}</li>
            </ul>
          </div>
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
              class="btn btn-grad-cancel"
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
@import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
.component-car {
  margin: .5rem !important;
  padding-bottom: 1rem !important;
  border-bottom: 1px solid $primary;
}
.list{
  list-style-type: circle;
}
.btn-grad-cancel {
  background-image: linear-gradient(to right, $danger 0%, #d32020 100%);
  margin: 2px;
  padding: 3px 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 0px #eee;
  border-radius: 10px;
  display: block;
  font-size: .7em;
}
.btn-grad-cancel:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
