<template>
  <div class="lift-shaft">
      <div class="lift-shaft__slide">
        <stages></stages>
      </div>
  </div>
</template>

<script>
import Stages from "./Stages";
import { mapState, mapMutations } from "vuex";
export default {
  components: { Stages },
  computed: {
    ...mapState({
      stages: (state) => state.stages,
    }),
  },
    methods: {
    ...mapMutations(["setLevel"]),
  },
};
</script>

<style lang="scss" scoped>
.lift-shaft {
  &__slide {
    height: 100%;
    margin: 0 20px;
  }
}
</style>
