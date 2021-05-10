<template>
  <div class="profile-page container-fluid">
    <div class="row">
      <div class="col-12">
        This Week's Score
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <img src="http://placehold.it/200x200" alt="">
      </div>
      <div class="col-12">
        Your Scores for the Week
        <button>Today's Emissions data</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        User's Profile
      </div>
      <div class="col-12">
        Location:
      </div>
      <div class="col-12">
        Info
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <button>edit profile</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  *{
    border: solid 1px red;
  }
</style>
