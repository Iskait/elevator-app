<template>
  <div
    :style="{ 
        bottom: `${position}%`,
        height: (100 / stages) + '%', 
        transition: `all ${Math.abs(level - currentStage)}s ease-in-out`
        }"
    :class="{
      elevator: true,
      elevator__done: done,
    }"
  >
    <p v-if="status === 'working'" class="elevator__display">
      {{ queue[0] }}
      <span
        class="elevator__arrow"
        :style="{
          transform: `rotate(${queue[0] > currentStage ? '0deg' : '180deg'})`,
        }"
        >&#x2191;</span>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    position: Number
  },
  computed: {
    ...mapState({
      level: (state) => state.level,
      queue: (state) => state.queue,
      status: (state) => state.elevator.status,
      done: (state) => state.elevator.done,
      currentStage: (state) => state.elevator.currentStage,
      stages: (state) => state.stages
    }),
  },
  methods: {
    ...mapMutations(["setLevel", "switchStatus"]),
    startElevator() {
      this.switchStatus({status: 'working'});
      setTimeout(() => {
      this.switchStatus({status: 'done', done: true, currentStage: this.queue[0]})
      }, Math.abs(this.level - this.queue[0]) * 1000)
      
    }
  },
  watch: {
    queue: {
      handler(current) {
        if (current.length && this.status === "idle") {
          this.startElevator();
          this.setLevel(current[0]);
        }
      },
      deep: true,
    },
    status: {
      handler(current) {
        if (current === "done") {
          setTimeout(() => {
            this.switchStatus({ status: "idle", done: false });
          }, 3000);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.queue[0] ? (this.startElevator(), this.setLevel(this.queue[0])) : null
  }
};
</script>

<style lang="scss" scoped>
.elevator {
  background-color: rgb(5, 204, 204);
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  &__display {
    margin-top: 5px;
    height: 20px;
    width: 50px;
    background-color: rgba(130, 130, 246, 0.5);
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
  &__arrow {
    margin-left: 5px;
  }
}
@keyframes flickering {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
}
.elevator__done {
  animation: flickering 1s ease-in 0s 3;
}
</style>
