<template>
  <lift-shaft></lift-shaft>
  <shaft-control></shaft-control>
</template>

<script>
import liftShaft from "@/components/liftShaft.vue";
import ShaftControl from "@/components/ShaftControl.vue";

export default {
  components: { liftShaft, ShaftControl },
};
</script>

<style lang="scss" scoped></style>
