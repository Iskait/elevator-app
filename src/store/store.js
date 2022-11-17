import { createStore } from "vuex";

export default createStore({
  state: () => ({
    slides: 4,
    stages: 9,
    elevators: [
      {
      id: 0,
      free: true,
      done: false,
      currentStage: 1,
      level: 1
    },
    {
      id: 1,
      free: true,
      done: false,
      currentStage: 1,
      level: 1
    },
    {
      id: 2,
      free: true,
      done: false,
      currentStage: 1,
      level: 1
    },
    {
      id: 3,
      free: true,
      done: false,
      currentStage: 1,
      level: 1
    },
  ],
    queue: [],
  }),
  mutations: {
    setQueue(state, payload) {
      !state.queue.includes(payload) && 
      !state.elevators.every(elevator=>elevator.currentStage === payload) && 
      (state.queue = state.queue.concat(payload));
    },
    startElevator(state, {id, level}) {
      const elevator = state.elevators.find(elevator=>elevator.id === id);
      elevator.level = level;
      elevator.free = false;
      state.queue.shift();
    },
    stopElevator(state, { id }) {
      const elevator = state.elevators.find(elevator=>elevator.id === id);
      elevator.currentStage = elevator.level;
      elevator.done = true;
    },
    readyElevator(state, { id }) {
      const elevator = state.elevators.find(elevator=>elevator.id === id);
      elevator.done = false;
      elevator.free = true;
    }
  },
});
