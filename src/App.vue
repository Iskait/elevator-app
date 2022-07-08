<template>
  <div class="wrapper">
    <lift-shaft></lift-shaft>
    <shaft-control></shaft-control>
  </div>
</template>

<script>
import liftShaft from '@/components/liftShaft';
import ShaftControl from '@/components/ShaftControl';
export default {
  components: { liftShaft, ShaftControl }
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
}
.wrapper {
  display: flex;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  padding: 10px;
}


</style>
