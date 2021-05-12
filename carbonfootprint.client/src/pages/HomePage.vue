<template>
  <div v-if="state.loading === true">
    Loading...
  </div>
  <div v-else class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="col-12">
        <div class="current-score current-score__container text-left component-spacing">
          <small class="current-score__welcome">Welcome User</small>
          <h6 class="current-score__title">
            Current CO₂ Score - <span>75 CO₂</span>
          </h6>
          <div class="progress current-score__progress">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: 75%"
                 aria-valuenow="75"
                 aria-valuemin="0"
                 aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="weekly-score component-spacing weekly-score__container text-left">
          <h6 class="weekly-score__title">
            Your Weekly Average - <span>55 CO₂</span>
          </h6>
          <div class="progress weekly-score__progress">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 style="width: 55%"
                 aria-valuenow="55"
                 aria-valuemin="0"
                 aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 flex-grow-1 d-flex stretch">
        <div class="component-spacing--small w-100">
          Graph/Info/TBD
        </div>
      </div>
      <div class="col-6">
        <div class="weather weather__container component-spacing--small">
          <p class="weather__air-quality">
            Air Quality: 29 AQI
          </p>
          <div class="weather__data pb-0">
            <i class="fas fa-sun weather__data--icon fa-3x"></i>
            <small class="weather__data--temp">76°</small>
            <p class="weather__data--location mb-0">
              Boise, ID
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 ml-2">
        <h5 class="text-left mt-2 user__title">
          User's Weekly Average
        </h5>
      </div>
      <Profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
      <div class="row">
        <div class="col-12 ml-2">
          <h5 class="text-left mt-3 news__title">
            Your Environmental News Feed
          </h5>
          <NewsFeed />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { apiService } from '../services/ApiService'
export default {
  name: 'HomePage',
  props: {
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      activeProfile: computed(() => AppState.activeProfile),
      currentDay: computed(() => AppState.currentDay.id),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      profiles: computed(() => AppState.profiles)
    })
    onMounted(async() => {
      await profilesService.getAllProfiles()
      await apiService.getNewsApi()
      state.loading = false
    })
    return {
      route,
      state
    }
  }
}
</script>
<style scoped lang="scss">
@import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
.home{
  text-align: center;
  user-select: none;
  font-family: $secondary-font;
}
.current-score {
  &__title {
    font-family: $primary-font;
    span {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
}
.weekly-score {
  &__title {
    font-family: $primary-font;
    span {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
}
  div {
    padding: 0 !important;
    margin: 0 !important;
  }
.weather {
  &__air-quality {
    font-size: .8rem;
  }
  &__data {
    position: relative;
    &--icon {
      color: $yellow;
    }
    &--temp {
      position: absolute;
      top: .5em;
      right: 2.25em;
    }
    &--location {
      font-weight: bold;
    }
  }
}
.user__title {
  font-family: $primary-font;;
}
.news__title {
  font-family: $primary-font;
}
.user-summary {
  &__avatar {
    height: 3rem;
    border-radius: 50%;
    background-color: $dark;
  }
  .progress-bar {
    color: $dark !important;
  }
}
.news-container {
  background-color: $off-white;
  margin: .5rem !important;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  img {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  }
}
</style>
