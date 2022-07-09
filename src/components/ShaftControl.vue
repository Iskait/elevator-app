<template>
  <div class="shaft-control">
    <div class="shaft-control__manual" v-for="stage in stages" :key="stage">
      <p class="shaft-control__level">{{ stage }}</p>
      <button 
      @click="setQueue(stage)" 
      class="shaft-control__button">
        <span 
        :class="{active: queue.includes(stage)}"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      stages: state=>state.stages,
      queue: state=>state.queue,
      elevators: state=>state.elevators,
    })
  },
  methods: {
    ...mapMutations(['setQueue', 'startElevator', 'stopElevator'])
  },
  watch: {
    queue: {
      deep: true,
      handler(newQueue) {
        if (newQueue.length) {
          const elevator = this.elevators.find(elevator=>elevator.free && elevator.level !== newQueue[0]);
          if (elevator) {
            const { id, currentStage } = elevator;
            const delay = Math.abs(currentStage - newQueue[0]);
            this.startElevator({ id, level: newQueue[0] });
            setTimeout(() => {
              this.stopElevator({ id });
            }, delay * 1000);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.shaft-control {
    display: flex;
    flex-direction: column-reverse;
    width: 40px;
    justify-content: space-around;
  &__manual {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    position: relative;
    border: 1px solid rgb(19, 66, 254);
    span {
        content: '';
        width: 10px;
        height: 10px;
        border: 1px solid rgb(19, 66, 254);
        border-radius: 50%;
        position: absolute;
        right: 20%;
        &.active {
            background-color: rgb(211, 141, 11);
        }
    }
  }
}
</style>
