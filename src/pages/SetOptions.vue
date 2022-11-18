<script setup lang="ts">
import { useElevatorsStore } from "../stores/Elevators";
import { useOptionStore } from "../stores/Option";
import { useRouter } from "vue-router";

/** Роутер */
const router = useRouter();

/** Хранилище `Option` */
const optionStore = useOptionStore();

/** Установка количества лифтов */
const { setElevators } = useElevatorsStore();

/** Количетсво этажей */

/** Установка шатх и количества этажей */
const { setSlides, setStages } = optionStore;

const floors = [...Array(18)].map((_, i) => i + 3);
const shafts = [...Array(10)].map((_, i) => ++i);

const numberOfShafts = 3;

const numberOfFloors = 1;

function startApp() {
  localStorage.clear();
  setStages(numberOfFloors);
  setSlides(numberOfShafts);
  setElevators(numberOfShafts);
  router.push("/mine");
}
</script>

<template>
  <div class="set">
    <div class="set__container">
      <div class="set__block">
        <h2 class="set__title">Select the number of floors and shafts</h2>
        <div class="set__options">
          <div class="set__type">
            <p class="set__text">Numbers of floors: {{ numberOfFloors }}</p>
            <select
              @change="
                numberOfFloors = +($event.target as HTMLSelectElement).value
              "
            >
              <option v-for="floor in floors" :value="floor" :key="floor">
                {{ floor }}
              </option>
            </select>
          </div>
          <div class="set__type">
            <p class="set__text">Numbers of shafts: {{ numberOfShafts }}</p>
            <select
              @change="
                numberOfShafts = +($event.target as HTMLSelectElement).value
              "
            >
              <option v-for="shaft in shafts" :value="shaft" :key="shaft">
                {{ shaft }}
              </option>
            </select>
          </div>
        </div>
        <button class="set__btn" @click="startApp">Start</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.set {
  margin: 0 auto;
  &__container {
    max-width: 500px;
  }
  &__block {
    display: flex;
    flex-direction: column;
  }
  &__options {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }

  &__type {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__text {
    margin-bottom: 10px;
  }
  &__btn {
    margin-top: 40px;
    padding: 20px;
    border-radius: 10px;
    font-size: 20px;
    background-color: rgb(12, 237, 237);
    cursor: pointer;
  }
}
</style>
