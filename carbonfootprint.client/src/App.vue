<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      <p>
        Made with 💖 by
      </p>
      <a href="http://www.github.com/austinjdowney">
        www.github.com/austinjdowney
      </a>
      <a href="http://www.github.com/alecvictory">
        www.github.com/alecvictory
      </a>
      <a href="http://www.github.com/LoganPonder">
        www.github.com/LoganPonder
      </a>
      <a href="http://www.github.com/Toppedyk">
        www.github.com/Toppedyk
      </a>
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

</style>
