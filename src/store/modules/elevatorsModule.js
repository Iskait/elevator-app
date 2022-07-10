export const elevatorsModule = {
  state: () => ({
    elevators: JSON.parse(localStorage.getItem('elevators')) || [],
    queue: JSON.parse(localStorage.getItem('performingStages')) || [],
    performingStages: JSON.parse(localStorage.getItem('performingStages')) || [],
  }),
  mutations: {
    setQueue(state, payload) {
      if(!state.queue.includes(payload) && !state.elevators.every(elevator=>elevator.currentStage === payload)) {
        state.queue = state.queue.concat(payload);
        localStorage.setItem('queue', JSON.stringify(state.queue));
        state.performingStages.push(payload);
        localStorage.setItem('performingStages', JSON.stringify(state.performingStages));
      } 
    },
    setElevators(state, payload) {
        state.elevators = [...Array(payload)].map((_, index) => ({
            id: index,
            free: true,
            done: false,
            currentStage: 1,
            level: 1,
        }));
        localStorage.setItem('elevators', JSON.stringify(state.elevators));
    },
    startElevator(state, { id, level }) {
      const elevator = state.elevators.find((elevator) => elevator.id === id);
      elevator.level = level;
      elevator.free = false;
      state.queue.shift();
      localStorage.setItem('elevators', JSON.stringify(state.elevators));
    },
    stopElevator(state, { id }) {
      const elevator = state.elevators.find((elevator) => elevator.id === id);
      elevator.currentStage = elevator.level;
      elevator.done = true;
      localStorage.setItem('elevators', JSON.stringify(state.elevators));
    },
    readyElevator(state, { id }) {
      const elevator = state.elevators.find((elevator) => elevator.id === id);
      elevator.done = false;
      elevator.free = true;
      state.performingStages.shift();
      localStorage.setItem('performingStages', JSON.stringify(state.performingStages));
      localStorage.setItem('elevators', JSON.stringify(state.elevators));
    },
  },
};
