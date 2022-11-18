import { defineStore } from "pinia";

export const useOptionStore = defineStore("option", {
  state: () => ({
    slides: localStorage.getItem("slides") || 1,
    stages: localStorage.getItem("stages") || 5,
  }),
  actions: {
    setSlides(amount: number) {
      this.slides = amount;
      localStorage.setItem("slides", amount.toString());
    },
    setStages(amount: number) {
      this.stages = amount;
      localStorage.setItem("stages", amount.toString());
    },
  },
});
