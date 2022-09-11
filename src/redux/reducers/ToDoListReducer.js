import { themeArr } from "../../Todolist_StyledComponents/Themes/ThemesManager";
import { ToDoListDarkTheme } from "../../Todolist_StyledComponents/Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../Todolist_StyledComponents/Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../Todolist_StyledComponents/Themes/ToDoListPrimaryTheme";
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
  update_task,
} from "../actions/types/ToDoListTypes";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "task 1", done: true },
    { id: "task-2", taskName: "task 2", done: false },
    { id: "task-3", taskName: "task 3", done: true },
    { id: "task-4", taskName: "task 4", done: false },
  ],
  taskEdit: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case add_task:
      // console.log("todo", action.newTask);
      //kiem tra rong
      if (action.newTask.taskName.trim() === "") {
        alert("task name is required!");
        return { ...state };
      }
      //kiem tra ton tai
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName == action.newTask.taskName
      );
      if (index !== -1) {
        alert("task name already existed");
        return { ...state };
      }
      //xử lý xong thì gán lại taskList mới
      state.taskList = [...taskListUpdate, action.newTask];
      return { ...state };
    case change_theme:
      let theme = themeArr.find((theme) => theme.id == action.themeId);
      if (theme) {
        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
    case done_task: {
      //c1
      // let taskListUpdate = [...state.taskList];
      // let index = taskListUpdate.findIndex((task) => task.id == action.taskId);
      // if (index !== -1) {
      //   taskListUpdate[index].done = true;
      // }
      // state.taskList = taskListUpdate;
      // return { ...state };

      //c2
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id == action.taskId);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }
      return { ...state, taskList: taskListUpdate };
    }
    case delete_task: {
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }
    case edit_task: {
      return { ...state, taskEdit: action.task };
    }
    case update_task: {
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => {
        return task.id == state.taskEdit.id;
      });
      if (index !== -1) {
        taskListUpdate[index].taskName = state.taskEdit.taskName;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: -1, taskName: "", done: false };
      return { ...state };
    }
    default:
      return { ...state };
  }
};
