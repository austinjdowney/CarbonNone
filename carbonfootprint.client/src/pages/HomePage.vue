<template>
  <div class="home container-fluid flex-grow-1 d-flex flex-column">
    <div class="row">
      <div class="col-12">
        Current CO2 Score
      </div>
      <div class="col-12">
        Your Weekly Average
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        Graph/Info/TBD
      </div>
      <div class="col-6">
        Weather/Air API
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        User's Weekly Average
      </div>
      <div class="col-12">
        User1
      </div>
      <div class="col-12">
        User2
      </div>
      <div class="col-12">
        User3
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        Environmental news feed
      </div>
      <div class="col-12">
        article 1
      </div>
      <div class="col-12">
        article 2
      </div>
      <div class="col-12">
        article 3
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  *{
    border: solid 1px red;
  }
}
</style>
