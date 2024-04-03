import { createSlice } from "@reduxjs/toolkit";

const initalTask = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : null;

const initialState = {
  taskData: initalTask,
  allTasks: [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    allTask: (state, action) => {
      const todoTasks = action.payload.filter((task) => task.status === "todo");
      const doingTasks = action.payload.filter(
        (task) => task.status === "doing"
      );
      const doneTasks = action.payload.filter((task) => task.status === "done");

      // Put all filtered tasks into a single array
      const allTasksByStatus = {
        todo: todoTasks,
        doing: doingTasks,
        done: doneTasks,
      };

      const data = Object.entries(allTasksByStatus).map(([status, tasks]) => ({
        status,
        tasks,
      }));
      state.allTasks = data;
    },
    allTaskFail: (state, action) => {
      return state;
    },
    addTask: (state, action) => {
      state.taskData = action.payload;
      state.allTasks
        .find((col, i) => col.status === action.payload.status)
        .tasks.push(action.payload);
    },
    addTaskFail: (state, action) => {
      return state;
    },
    editTask: (state, action) => {
      const { taskIndex, colIndex, data } = action.payload;
      const prevCol = state.allTasks.find((col, i) => i === colIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      state.allTasks
        .find((col, i) => col.status === data.status)
        .tasks.push(data);
    },
    editTaskFail: (state, action) => {
      return state;
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const prevCol = state.allTasks.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      state.allTasks.find((col, i) => i === colIndex).tasks.push(task);
    },
    dragTaskFail: (state, action) => {
      return state;
    },
    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      const final = state.allTasks.map((item, i) => {
        if (i === colIndex) {
          const updatedTasks = item.tasks.filter((task, i) => i !== taskIndex);
          return {
            ...item,
            tasks: updatedTasks,
          };
        }
        return item;
      });

      state.allTasks = final;
    },
  },
});

export const {
  allTask,
  allTaskFail,
  addTask,
  addTaskFail,
  editTask,
  editTaskFail,
  dragTask,
  dragTaskFail,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;
