import { defineStore } from "pinia";
import { ElevatorState } from "../types/Elevator";

export const useElevatorsStore = defineStore("elevators", {
  state: () =>
    ({
      elevators: JSON.parse(localStorage.getItem("elevators")!) || [],
      queue: JSON.parse(localStorage.getItem("performingStages")!) || [],
      performingStages:
        JSON.parse(localStorage.getItem("performingStages")!) || [],
    } as ElevatorState),
  actions: {
    setQueue(stage: number) {
      if (
        !this.queue.includes(stage) &&
        !this.elevators.some((elevator) => elevator.level === stage)
      ) {
        this.queue = this.queue.concat(stage);
        localStorage.setItem("queue", JSON.stringify(this.queue));
        this.performingStages.push(stage);
        localStorage.setItem(
          "performingStages",
          JSON.stringify(this.performingStages)
        );
      }
    },
    setElevators(amount: number) {
      this.elevators = [...Array(amount)].map((_, index) => ({
        id: index,
        free: true,
        done: false,
        currentStage: 1,
        level: 1,
      }));
      localStorage.setItem("elevators", JSON.stringify(this.elevators));
    },
    startElevator({ id, level }: { id: number; level: number }) {
      const elevator = this.elevators.find((elevator) => elevator.id === id);
      elevator!.level = level;
      elevator!.free = false;
      this.queue.shift();
      localStorage.setItem("elevators", JSON.stringify(this.elevators));
    },
    stopElevator(id: number) {
      const elevator = this.elevators.find((elevator) => elevator.id === id);
      elevator!.currentStage = elevator!.level;
      elevator!.done = true;
      localStorage.setItem("elevators", JSON.stringify(this.elevators));
    },
    readyElevator(id: number) {
      const elevator = this.elevators.find((elevator) => elevator.id === id);
      elevator!.done = false;
      elevator!.free = true;
      this.performingStages.shift();
      localStorage.setItem(
        "performingStages",
        JSON.stringify(this.performingStages)
      );
      localStorage.setItem("elevators", JSON.stringify(this.elevators));
    },
  },
});
