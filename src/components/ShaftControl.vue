<template>
  <div class="shaft-control">
    <div class="shaft-control__manual" v-for="level in stages" :key="level">
      <p class="shaft-control__level">{{ level }}</p>
      <button 
      @click="setLevel(level)" 
      class="shaft-control__button">
        <span 
        :class="{active: queue.includes(level)}"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
        stages: state => state.stages,
        queue: state => state.queue
    })
  },  
  methods: {
    ...mapMutations(["setLevel"]),
  },
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
    flex-direction: column;
  }
  &__button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    position: relative;
    span {
        content: '';
        width: 10px;
        height: 10px;
        border: 1px solid black;
        border-radius: 50%;
        position: absolute;
        right: 16%;
        &.active {
            background-color: rgb(211, 141, 11);
        }
    }
  }
}
</style>
