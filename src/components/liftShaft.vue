<script setup lang="ts">
import Stages from "./Stages.vue";
import Elevator from "./Elevator.vue";
import { useElevatorsStore } from "../stores/Elevators";
import { useOptionStore } from "../stores/Option";
import { storeToRefs } from "pinia";

/** Хранилище `Elevator` */
const elevatorStore = useElevatorsStore();

/** Хранилище `Option` */
const optionStore = useOptionStore();

/** Лифты */
const { elevators } = storeToRefs(elevatorStore);

/** Количетсво этажей  */
const { stages } = storeToRefs(optionStore);

/** Функиця для установки количетсва */
</script>

<template>
  <div class="lift-shaft">
    <div
      v-for="elevator of elevators"
      class="lift-shaft__slide"
      :key="elevator.id"
    >
      <Stages />
      <Elevator
        :position="(100 / +stages) * elevator.level - 100 / +stages"
        :free="elevator.free"
        :done="elevator.done"
        :level="elevator.level"
        :currentStage="elevator.currentStage"
        :id="elevator.id"
      />
    </div>
  </div>
</template>

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
