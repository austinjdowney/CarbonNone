<template>
  <div class="Car row">
    <div class="col-12">
      <div class="car-summary component-spacing d-flex">
        <div class="car-summary__data d-flex flex-column w-100 text-left">
          <p class="car-summary__data--name mb-0">
            {{ car.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Car',
  props: {
    car: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
