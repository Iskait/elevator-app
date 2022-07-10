<template>
  <div class="stages">
    <div 
    class="stages__level" 
    v-for="stage in stages"
    :style="{height: (100 / stages) + '%'}"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      stages: (state) => state.setModule.stages,
    }),
  },
};
</script>

<style lang="scss" scoped>
.stages {
  height: 100%;
  border: 1px solid black;
  &__level {
    border-bottom: 1px solid rgb(73, 72, 72);
  }
}
</style>
