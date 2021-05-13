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
            Most Recent CO₂ Score - <span>{{ state.profileDay.dailyScore }} Kg/CO₂</span>
          </h6>
          <div class="progress current-score__progress">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 :style="'width:' + `${state.profileDay.dailyScore}` +'%;'"
                 :aria-valuenow="`${state.profileDay.dailyScore}`"
                 aria-valuemin="0"
                 aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <div class="col-12" v-if="state.ytdScores">
        <div class="weekly-score component-spacing weekly-score__container text-left">
          <h6 class="weekly-score__title">
            <!-- YTD AVERAGE HERE -->
            Your YTD Daily Average - <span :value="averageScore()"> {{ state.totalScore }} </span> Kg/CO₂
          </h6>
          <div class="progress weekly-score__progress">
            <div class="progress-bar bg-success"
                 role="progressbar"
                 :style="'width:' + `${state.totalScore}` +'%;'"
                 :aria-valuenow="`${state.totalScore}`"
                 aria-valuemin="0"
                 aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 flex-grow-1 d-flex stretch">
        <div class="component-spacing--small w-100" v-if="state.weather">
          <p> <b> {{ state.weather.city }}, {{ state.weather.state }} </b> </p>
          <img :src="getPic()" class="weatherImg" />
          <p> AQI: {{ state.weather.current.pollution.aqius }} </p>
          <p>Temp: {{ state.tempFahrenheit }} </p>
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
          Profiles
        </h5>
      </div>
      <div class="col-12">
        <Profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
      </div>
      <div class="row">
        <div class="col-12">
          <h5 class="text-left mt-3 news__title">
            Your Environmental News Feed
          </h5>
          <!-- <NewsFeed v-for="news in state.news" :key="news.id" :news="news" /> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { apiService } from '../services/ApiService'
import { daysService } from '../services/DaysService'
export default {
  name: 'HomePage',
  props: {
  },
  setup() {
    const state = reactive({
      loading: true,
      activeProfile: computed(() => AppState.activeProfile),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      profiles: computed(() => AppState.profiles),
      // news: computed(() => AppState.newsApi),
      weather: computed(() => AppState.weatherApi),
      profileDay: computed(() => AppState.days.find(d => d.creatorId === state.account.id)),
      ytdScores: computed(() => AppState.days.filter(d => d.creatorId === state.account.id)),
      totalScore: 0,
      tempFahrenheit: computed(() => {
        const C = state.weather.current.weather.tp
        return (C * (9 / 5) + 32)
      })
      // icon: computed(()=> AppState.weatherApi.current.weather.ic)
    })
    onMounted(async() => {
      await daysService.getAllDays()
      await profilesService.getAllProfiles()
      // await apiService.getNewsApi()
      await apiService.getWeatherApi()
      state.loading = false
    })
    return {
      state,
      getPic() {
        return require(`@/assets/img/${state.weather.current.weather.ic}.png`)
      },
      averageScore() {
        let totalScore = 0
        state.ytdScores.forEach(d => {
          totalScore += d.dailyScore
        })
        state.totalScore = Math.floor(totalScore / state.ytdScores.length, -1)
      }
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
.weatherImg{
  height: 80px;
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
