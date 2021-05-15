<template>
  <header>
    <MyNavbar />
  </header>
  <main class="mt-4">
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-3 d-flex align-items-center justify-content-around">
      <div>
        <a class="github-link" href="http://www.github.com/austinjdowney">
          Austin Downey
        </a>
        <br>
        <a class="github-link" href="http://www.github.com/alecvictory">
          Alec Victory
        </a>
      </div>
      <i class="fab fa-github text-light fa-2x" aria-hidden="true"></i>
      <div class="">
        <a class="github-link" href="http://www.github.com/LoganPonder">
          Logan Ponder
        </a>
        <br>
        <a class="github-link" href="http://www.github.com/Toppedyk">
          Taylor Oppedyk
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.github-link{
  color: #FFF
}
</style>
