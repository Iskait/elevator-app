<template>
  <div class="set">
    <div class="set__container">
      <div class="set__block">
        <h2 class="set__title">Select the number of floors and shafts</h2>
        <div class="set__options">
          <div class="set__type">
            <p class="set__text">Numbers of floors: {{ numberOfFloors }}</p>
            <select @change="numberOfFloors = +$event.target.value">
              <option v-for="floor in floors" :value="floor">
                {{ floor }}
              </option>
            </select>
          </div>
          <div class="set__type">
            <p class="set__text">Numbers of shafts: {{ numberOfShafts }}</p>
            <select @change="numberOfShafts = +$event.target.value">
              <option v-for="shaft in shafts" :value="shaft">
                {{ shaft }}
              </option>
            </select>
          </div>
        </div>
        <button
        class="set__btn"
        @click="startApp" 
        >Start</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      floors: [...Array(18)].map((_, i) => i + 3),
      shafts: [...Array(10)].map((_, i) => ++i),
      numberOfFloors: 3,
      numberOfShafts: 1,
    };
  },
  methods: {
    ...mapMutations(['setSlides', 'setStages', 'setElevators']),
    startApp() {
        localStorage.clear();
        this.setStages(this.numberOfFloors);
        this.setSlides(this.numberOfShafts);
        this.setElevators(this.numberOfShafts);
        this.$router.push('/mine');
    }
  },
  computed: {
    ...mapState({
        stages: state=>state.setModule.stages
    })
  }
};
</script>

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
