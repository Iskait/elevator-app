<script setup lang="ts">
import { useElevatorsStore } from "../stores/Elevators";
import { useOptionStore } from "../stores/Option";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const props = defineProps<{
  position: number;
  level: number;
  currentStage: number;
  done: boolean;
  free: boolean;
  id: number;
}>();

/** Хранилище `Elevator` */
const elevatorStore = useElevatorsStore();

/** Хранилище `Option` */
const optionStore = useOptionStore();

/** Количесто этажей */
const { stages } = storeToRefs(optionStore);

/** Очередь */
const { queue } = storeToRefs(elevatorStore);

/** Функции для контроля лифта */
const { stopElevator, startElevator, readyElevator } = elevatorStore;

function forceStart() {
  props.currentStage === props.level &&
    props.done === props.free &&
    // eslint-disable-next-line vue/no-mutating-props
    (props.free = true);
  if (queue.value.length) return;
  const delay = Math.abs(queue.value[0] - props.currentStage);
  startElevator({ id: props.id, level: queue.value[0] });
  setTimeout(() => {
    stopElevator(props.id);
  }, delay * 1000);
}

onMounted(() => {
  forceStart();
  props.done && setTimeout(() => readyElevator(props.id), 3000);
});
</script>

<template>
  <div
    :style="{
      bottom: `${position}%`,
      height: 100 / +stages + '%',
      transition: `all ${Math.abs(level - currentStage)}s ease-in-out`,
    }"
    :class="{
      elevator: true,
      elevator__done: done,
    }"
  >
    <p v-if="!free" class="elevator__display">
      {{ level }}
      <span
        v-if="level !== currentStage"
        class="elevator__arrow"
        :style="{
          transform: `rotate(${level > currentStage ? '0deg' : '180deg'})`,
        }"
        >&#x2191;</span
      >
    </p>
  </div>
</template>

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
