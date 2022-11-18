export interface Elevator {
  id: number;
  free: boolean;
  done: boolean;
  currentStage: number;
  level: number;
}

export interface ElevatorState {
  elevators: Elevator[];
  queue: number[];
  performingStages: number[];
}
