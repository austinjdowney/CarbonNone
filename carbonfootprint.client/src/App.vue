<template>
  <header>
    <span class="navbar-text">
      <button
        class="btn btn-outline-primary text-uppercase ml-2"
        @click="logout"
        v-if="user.isAuthenticated"
      >
        Logout
      </button>
    </span>
    <MyNavbar />
  </header>
  <main>
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
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
import { AuthService } from './services/AuthService'
import Notification from './utils/Notification'
export default {
  name: 'AboutPage',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async signUp() {
        AuthService.loginWithRedirect({
          screen_hint: 'signup'
        })
      },
      async logout() {
        if (await Notification.confirmAction('Are you sure you want to logout?', '')) {
          await AuthService.logout({ returnTo: window.location.origin })
        }
      },
      activeProfile() {
        AppState.activeProfile = state.account
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.github-link{
  color: #FFF
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
