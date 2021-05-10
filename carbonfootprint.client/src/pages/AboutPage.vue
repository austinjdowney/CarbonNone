<template>
  <div class="container-fluid">
    <div class="row flex-column">
      <div class="col-12 about">
        <div class="about__header text-left mt-4 mb-4">
          <h1 class="about__header--title mb-0">
            Carbon Footprint
          </h1>
          <p class="about__header--subtitle">
            mission statement subtitle
          </p>
        </div>
        <div class="about__mission-statement">
          <h5 class="about__mission-statement--title">
            Keep track of your daily CO2 emissions:
          </h5>
          <p class="about__mission-statement--text">
            Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.
          </p>
        </div>
        <div class="about__how-to-use">
          <h5 class="about__how-to-use--title">
            How to track your emissions:
          </h5>
          <p class="about__how-to-use--text">
            Text explaining how to use the app and what the ratings are based off of, national average ect...
          </p>
          <div class="about__how-to-use--progress d-flex flex-column mb-2">
            <p class="mb-0">
              Good average...
            </p>
            <div class="progress">
              <div class="progress-bar bg-success"
                   role="progressbar"
                   style="width: 25%"
                   aria-valuenow="25"
                   aria-valuemin="0"
                   aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="about__how-to-use--progress d-flex flex-column mb-2">
            <p class="mb-0">
              Medium average...
            </p>
            <div class="progress">
              <div class="progress-bar bg-warning"
                   role="progressbar"
                   style="width: 55%"
                   aria-valuenow="55"
                   aria-valuemin="0"
                   aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="about__how-to-use--progress d-flex flex-column">
            <p class="mb-0">
              Bad average...
            </p>
            <div class="progress">
              <div class="progress-bar bg-danger"
                   role="progressbar"
                   style="width: 75%"
                   aria-valuenow="75"
                   aria-valuemin="0"
                   aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AboutPage'
}
</script>
<style lang="scss" scoped>
  @import '../assets/scss/_variables.scss';
@import "../assets/scss/main.scss";
  *{
    border: solid 1px red;
  }
  .about {
  font-family: $secondary-font;
  position: relative;
  &__header {
    font-family: $primary-font;
    line-height: .8;
    &--title {
      text-transform: uppercase;
      font-size: 1.8rem;
    }
    &--subtitle {
      font-weight: 200;
    }
  }
  &__mission-statement--title {
    // font-family: $primary-font;
    text-transform: uppercase;
    line-height: 1.4;
    font-size: 1.4em;
  }
  &__mission-statement--text {
    font-family: $secondary-font;
    line-height: 1.6;
  }
  &__how-to-use {
    &--title {
    text-transform: uppercase;
    line-height: 1.4;
    font-size: 1.4em;
    }
    &--text {
    font-family: $secondary-font;
    line-height: 1.6;
    }
  }
}

</style>
