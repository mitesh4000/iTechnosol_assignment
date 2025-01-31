import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../interface/task.interface";

export interface TaskBoardState {
  taskList: Task[];
  viewTaskIndex: number;
  deleteTaskIndex: number;
  updateTaskIndex: number;
  addTaskFormOpen: boolean;
  value: number;
}

const initialState: TaskBoardState = {
  taskList: [],
  viewTaskIndex: -1,
  deleteTaskIndex: -1,
  updateTaskIndex: -1,
  addTaskFormOpen: false,
  value: 0,
};

export const taskBoardSlice = createSlice({
  name: "taskBoard",
  initialState,
  reducers: {
    viewTask: (state, action: PayloadAction<number>) => {
      state.viewTaskIndex = action.payload;
      state.deleteTaskIndex = -1;
      state.updateTaskIndex = -1;
      state.addTaskFormOpen = false;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  taskBoardSlice.actions;
export default taskBoardSlice.reducer;
