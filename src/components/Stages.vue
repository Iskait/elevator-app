<template>
  <div class="stages">
    <div class="stages__level" v-for="stage in stages"></div>
    <elevator></elevator>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Elevator from "./Elevator";

export default {
  components:  { Elevator } , 
  computed: {
    ...mapState({
      stages: (state) => state.stages,
    }),
  },
};
</script>

<style lang="scss" scoped>
.stages {
  height: 100%;
  position: relative;
  border: 1px solid black;
  width: 120px;
  &__level {
    height: 20%;
    border-bottom: 1px solid rgb(73, 72, 72);
  }
}
</style>
