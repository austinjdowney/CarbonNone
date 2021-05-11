<template>
  <div class="news container-fluid">
    <div class="col-12">
      <div class="news-container d-flex">
        <!-- <img src="//placehold.it/100x100" alt="" class="img-fluid new-container__img">
        <div class="news-container__text d-flex flex-column text-left p-2"> -->
        <h6>{{ state.news }}</h6>
        <!-- <small class="">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches</small> -->
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from 'vue'
import { apiService } from '../services/ApiService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  name: 'NewsFeed',
  props: {
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      news: computed(() => AppState.newsApi),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      route,
      state,
      async getNewsApi() {
        try {
          await apiService.getNewsApi()
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
