<template>
  <div class="shaft-control">
    <div class="shaft-control__manual" v-for="stage in stages" :key="stage">
      <p class="shaft-control__level">{{ stage }}</p>
      <button
        @click="setQueue(stage)"
        :class="{
          'shaft-control__button': true,
          active: performingStages.includes(stage),
        }"
      >
        <span></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      stages: (state) => state.setModule.stages,
      queue: (state) => state.elevatorsModule.queue,
      performingStages: (state) => state.elevatorsModule.performingStages,
      elevators: (state) => state.elevatorsModule.elevators,
    }),
  },
  methods: {
    ...mapMutations(["setQueue", "startElevator", "stopElevator"]),
  },
  watch: {
    queue: {
      deep: true,
      handler(newQueue) {
        if (newQueue.length) {
          const freeElevators = this.elevators.filter(
            (elevator) => elevator.free && elevator.level !== newQueue[0]
          );
          const closestElevator = freeElevators.sort(
            (a, b) =>
              Math.abs(a.currentStage - newQueue[0]) -
              Math.abs(b.currentStage - newQueue[0])
          )[0];
          if (closestElevator) {
            const { id, currentStage } = closestElevator;
            const delay = Math.abs(currentStage - newQueue[0]);
            this.startElevator({ id, level: newQueue[0] });
            setTimeout(() => {
              this.stopElevator({ id });
            }, delay * 1000);
          }
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.shaft-control {
  display: flex;
  flex-direction: column-reverse;
  width: 50px;
  justify-content: space-around;
  &__manual {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__button {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid rgb(19, 66, 254);
    margin-left: 5px;
    &.active {
      border-color: rgb(211, 141, 11);
    }
    span {
      content: "";
      width: 10px;
      height: 10px;
      border: inherit;
      border-radius: 50%;
      position: absolute;
      right: 30%;
    }
  }
}
</style>
