<template>
  <div class="lift-shaft">
    <div v-for="elevator of elevators" class="lift-shaft__slide">
      <stages></stages>
      <elevator
        :position="(100 / stages) * elevator.level - 100 / stages"
        :free="elevator.free"
        :done="elevator.done"
        :level="elevator.level"
        :currentStage="elevator.currentStage"
        :id="elevator.id"
      ></elevator>
    </div>
  </div>
</template>

<script>
import Stages from "./Stages.vue";
import Elevator from "./Elevator.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Stages, Elevator },
  computed: {
    ...mapState({
      stages: (state) => state.setModule.stages,
      slides: (state) => state.setModule.slides,
      elevators: (state) => state.elevatorsModule.elevators,
    }),
  },
  methods: {
    ...mapMutations(["setLevel"]),
  },
};
</script>

<style lang="scss" scoped>
.lift-shaft {
  display: flex;

  &__slide {
    height: 100%;
    margin: 0 20px;
    position: relative;
    width: 120px;
  }
}
</style>
