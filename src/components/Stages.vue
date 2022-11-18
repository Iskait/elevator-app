<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useOptionStore } from "../stores/Option";

/** Количество этажей */
const { stages } = storeToRefs(useOptionStore());
</script>

<template>
  <div class="stages">
    <div
      v-for="stage in stages"
      :key="+stage"
      class="stages__level"
      :style="{ height: 100 / +stages + '%' }"
    />
  </div>
</template>

<style lang="scss" scoped>
.stages {
  height: 100%;
  border: 1px solid black;
  &__level {
    border-bottom: 1px solid rgb(73, 72, 72);
  }
}
</style>
