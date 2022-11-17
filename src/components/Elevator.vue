<template>
  <div
    :style="{ bottom: `${position}%` }"
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
  data() {
    return {
      position: +localStorage.getItem("currentStage") * 20 - 20,
    };
  },
  computed: {
    ...mapState({
      level: (state) => state.level,
      queue: (state) => state.queue,
      status: (state) => state.elevator.status,
      done: (state) => state.elevator.done,
      currentStage: (state) => state.elevator.currentStage,
    }),
  },
  methods: {
    ...mapMutations(["setLevel", "switchStatus"]),
    startElevator() {
      this.switchStatus({ status: "working" });
      const id = setInterval(() => {
        this.position += this.queue[0] < this.currentStage ? -0.4 : 0.4;
        if (~~this.position === this.queue[0] * 20 - 20) {
          clearInterval(id);
          this.position = ~~(this.queue[0] * 20 - 20);
          this.switchStatus({
            status: "done",
            done: true,
            currentStage: this.queue[0],
          });
        }
      }, 20);
    },
  },
  watch: {
    queue: {
      handler(current) {
        if (current.length && this.status === "idle") {
          this.startElevator();
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
    this.queue.length ? this.startElevator() : null;
  },
};
</script>

<style lang="scss" scoped>
.elevator {
  background-color: rgb(5, 204, 204);
  height: 20%;
  width: 100%;
  position: absolute;
  bottom: 0%;
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
