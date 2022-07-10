<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100vh;
  background-color: #fefefe;
  color: #000;
  font-size: 20px;
  font-weight: 600;
}
.wrapper {
  display: flex;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  padding: 10px;
}


</style>
