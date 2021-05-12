<template>
  <div @click="profilePage" class="profile col-12">
    <div class="user-summary component-spacing d-flex">
      <img :src="profile.picture" alt="" class="sm-img user-summary__avatar mr-2">
      <div class="user-summary__data d-flex flex-column w-100 text-left">
        <p class="user-summary__data--name mb-0">
          {{ profile.name }}
        </p>
        <div class="progress">
          <div class="progress-bar bg-warning"
               role="progressbar"
               style="width: 65%"
               aria-valuenow="65"
               aria-valuemin="0"
               aria-valuemax="100"
          >
            220kg/co2
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Notification from '../utils/Notification'
// import { AppState } from '../AppState'
// import { profilesService } from '../services/ProfilesService'
// import { apiService } from '../services/ApiService'

export default {
  name: 'Profile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      router,
      //   state
      profilePage() {
        try {
          router.push({ name: 'ProfilePage', params: { id: props.profile.id } })
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.sm-img{
border-radius: 50%;
max-height: 3rem;
}
</style>
