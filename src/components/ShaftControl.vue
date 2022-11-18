<script setup lang="ts">
import { watch } from "vue";
import { useElevatorsStore } from "../stores/Elevators";
import { useOptionStore } from "../stores/Option";
import { storeToRefs } from "pinia";

/** Хранилище `Elevator` */
const elevatorStore = useElevatorsStore();

/** Хранилище `Option` */
const optionStore = useOptionStore();

/** Очередь, выполняющийся этаж и лифты */
const { queue, performingStages, elevators } = storeToRefs(elevatorStore);

/** Добавление в очередь, запуск лифта и остановка */
const { setQueue, startElevator, stopElevator } = elevatorStore;

/** Количество этажей */
const { stages } = storeToRefs(optionStore);

watch(
  () => queue,
  (newQueue) => {
    if (newQueue.value.length) {
      const freeElevators = elevators.value.filter(
        (elevator) => elevator.free && elevator.level !== newQueue.value[0]
      );
      const closestElevator = freeElevators.sort(
        (a, b) =>
          Math.abs(a.currentStage - newQueue.value[0]) -
          Math.abs(b.currentStage - newQueue.value[0])
      )[0];
      if (closestElevator) {
        const { id, currentStage } = closestElevator;
        const delay = Math.abs(currentStage - newQueue.value[0]);
        startElevator({ id, level: newQueue.value[0] });
        setTimeout(() => {
          stopElevator(id);
        }, delay * 1000);
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="shaft-control">
    <div class="shaft-control__manual" v-for="stage in stages" :key="stage">
      <p class="shaft-control__level">{{ stage }}</p>
      <button
        @click="setQueue(+stage)"
        :class="{
          'shaft-control__button': true,
          active: performingStages.includes(+stage),
        }"
      >
        <span></span>
      </button>
    </div>
  </div>
</template>

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
