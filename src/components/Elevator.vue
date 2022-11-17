<template>
  <div :style="{
    bottom: `${position}%`,
    height: (100 / stages) + '%',
    transition: `all ${Math.abs(level - currentStage)}s ease-in-out`
  }" :class="{
  elevator: true,
  elevator__done: done,
}">
    <p v-if="!free" class="elevator__display">
      {{ level }}
      <span v-if="level !== currentStage" class="elevator__arrow" :style="{
        transform: `rotate(${level > currentStage ? '0deg' : '180deg'})`,
      }">&#x2191;</span>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    position: Number,
    level: Number,
    currentStage: Number,
    done: Boolean,
    free: Boolean,
    id: Number,
  },
  computed: {
    ...mapState({
      queue: (state) => state.queue,
      stages: (state) => state.stages,
    }),
  },
  methods: {
    ...mapMutations(['readyElevator', 'startElevator', 'stopElevator'])
  },
  watch: {
    done(status) {
      if (status) setTimeout(() => this.readyElevator({ id: this.id }), 3000);
    },
    free(ready) {
      if (ready && this.queue.length) {
        const delay = Math.abs(this.queue[0] - this.currentStage)
        this.startElevator({ id: this.id, level: this.queue[0] });
        setTimeout(() => {
          this.stopElevator({ id: this.id });
        }, delay * 1000);
      }
    }
  },
  mounted() {
    //this.queue[0] ? (this.startElevator(), this.setLevel({level: this.queue[0], id: this.id})) : null
  }
};
</script>

<style lang="scss" scoped>
.elevator {
  background-color: rgba(5, 45, 204, 0.8);
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
