import { createRouter, createWebHistory } from "vue-router";
import Main from "@/pages/Main.vue";
import setOptions from "@/pages/SetOptions.vue";

const routes = [
  {
    path: "",
    component: setOptions,
  },
  {
    path: "/mine",
    component: Main,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
