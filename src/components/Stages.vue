<template>
  <div class="stages">
    <div 
    class="stages__level" 
    v-for="stage in stages"
    :style="{height: (100 / stages) + '%'}"></div>
    <elevator :position="(100 / stages) * level - (100 / stages)"></elevator>
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
      level: (state) => state.level,
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
    border-bottom: 1px solid rgb(73, 72, 72);
  }
}
</style>
