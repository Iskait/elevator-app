import { createStore } from "vuex";

export default createStore({
  state: () => ({
    level: +localStorage.getItem("currentStage") || 1,
    stages: 5,
    elevator: {
      status: "idle",
      done: false,
      currentStage: +localStorage.getItem("currentStage") || 1,
    },
    queue: JSON.parse(localStorage.getItem("queue")) || [],
  }),
  mutations: {
    setLevel(state, payload) {
      if (state.level === payload) return;
      state.level = payload;
      localStorage.setItem("level", state.level);
      state.queue.push(payload);
      localStorage.setItem("queue", JSON.stringify(state.queue));
    },
    switchStatus(state, { status, done, currentStage }) {
      state.elevator.status = status;
      done !== undefined && (state.elevator.done = done);
      done === false &&
        (state.queue.shift(),
        localStorage.setItem("queue", JSON.stringify(state.queue)));
      currentStage &&
        ((state.elevator.currentStage = currentStage),
        localStorage.setItem("currentStage", currentStage));
    },
  },
});
