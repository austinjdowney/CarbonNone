<template>
  <div class="modal"
       id="new-house-form"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            New House
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form @submit.prevent="createHouse">
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="title">House Title:</label>
                  <input type="text"
                         class="form-control"
                         id="title"
                         placeholder="House Title..."
                         v-model="state.newHouse.title"
                         required
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="make">Members:</label>
                  <input type="number"
                         class="form-control"
                         id="members"
                         placeholder="Household Members(#)..."
                         v-model="state.newHouse.members"
                         required
                  >
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="electricKwh">Electric:</label>
                    <input type="number"
                           class="form-control"
                           id="electricKwh"
                           placeholder="Kwh per month..."
                           v-model="state.newHouse.electricKwh"
                           required
                    >
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label for="waterGallons">Water:</label>
                    <input type="number"
                           class="form-control"
                           id="waterGallons"
                           placeholder="Gallons per month..."
                           v-model="state.newHouse.waterGallons"
                           required
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-success">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { housesService } from '../services/HousesService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import $ from 'jquery'
export default {
  name: 'CreateHouseModal',
  props: {
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      newHouse: {},
      house: computed(() => AppState.house),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state,
      async createHouse() {
        try {
          await housesService.createHouse(state.newHouse)
          state.newHouse = {}
          $('#new-house-form').modal('hide')
          Notification.toast('Successfully Created House', 'success')
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
