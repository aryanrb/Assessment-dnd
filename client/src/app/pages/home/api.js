import { toast } from "react-toastify";
import {
  allTask,
  allTaskFail,
  addTask,
  addTaskFail,
  editTask,
  editTaskFail,
  dragTask,
  dragTaskFail,
  deleteTask,
} from "../../../redux/taskSlice";
import { server } from "../../../config/server";

export const getTasks = () => async (dispatch) => {
  try {
    server
      .get("http://localhost:8080/api/v1/tasks")
      .then((res) => {
        if (res && res?.data.status) {
          dispatch(allTask(res.data.data));
          // toast.success(res.data.message || "SUCCESS");
        } else {
          dispatch(allTaskFail());
          toast.error(res.data.message || "FAILED");
        }
      })
      .catch((err) => {
        dispatch(allTaskFail());
        console.log(err);
        toast.error(err?.response?.data?.message || "Task fetch failed");
      });
  } catch (error) {
    dispatch(allTaskFail());
    console.log(error, "ERROR");
  }
};

export const add = (task) => async (dispatch) => {
  try {
    console.log(task, "======Task");
    server
      .post("http://localhost:8080/api/v1/task", task)
      .then((res) => {
        if (res && res?.data.status) {
          localStorage.setItem("task", JSON.stringify(res.data.data));
          dispatch(addTask(res.data.data));
          toast.success(res.data.message || "SUCCESS");
        } else {
          dispatch(addTaskFail());
          toast.error(res.data.message || "FAILED");
        }
      })
      .catch((err) => {
        dispatch(addTaskFail());
        toast.error(err?.response?.data?.message || "Task add failed");
      });
  } catch (error) {
    dispatch(addTaskFail());
    console.log(error, "ERROR");
  }
};

export const edit = (task, taskIndex, colIndex) => async (dispatch) => {
  server
    .put(`http://localhost:8080/api/v1/task/${task.id}`, task)
    .then((res) => {
      if (res && res?.data.status) {
        localStorage.setItem("task", JSON.stringify(res.data.data));
        dispatch(editTask({ taskIndex, colIndex, data: res.data.data }));
        toast.success(res.data.message || "SUCCESS");
      } else {
        dispatch(editTaskFail());
        toast.error(res.data.message || "FAILED");
      }
      console.log(res, "RESPONSE=========", res.data, res.data.message);
    })
    .catch((err) => {
      console.log(err?.response?.data?.message, "========error", err);
      dispatch(editTaskFail());
      toast.error(err?.response?.data?.message || "Task edit failed");
    });
};

export const editStatus = (task) => async (dispatch) => {
  const { colIndex, prevColIndex, taskIndex, data } = task;
  const finalTask = {
    id: data._id,
    status: colIndex,
  };
  server
    .put(`http://localhost:8080/api/v1/task/status/${data._id}`, finalTask)
    .then((res) => {
      if (res && res?.data.status) {
        localStorage.setItem("task", JSON.stringify(res.data.data));
        dispatch(
          dragTask({ colIndex, prevColIndex, taskIndex, data: res.data.data })
        );
        toast.success(res.data.message || "SUCCESS");
      } else {
        dispatch(dragTaskFail());
        toast.error(res.data.message || "FAILED");
      }
    })
    .catch((err) => {
      dispatch(dragTaskFail());
      toast.error(err?.response?.data?.message || "Task edit failed");
    });
};

export const delTask = (task, taskIndex, colIndex) => async (dispatch) => {
  server
    .delete(`http://localhost:8080/api/v1/task/${task}`)
    .then((res) => {
      if (res && res?.data.status) {
        localStorage.setItem("task", JSON.stringify(res.data.data));
        dispatch(deleteTask({ taskIndex, colIndex }));
        toast.success(res.data.message || "SUCCESS");
      } else {
        toast.error(res.data.message || "FAILED");
      }
    })
    .catch((err) => {
      console.log(err, "=======");
      toast.error(err?.response?.data?.message || "Task delete failed");
    });
};

export const users = async (callback) => {
  server
    .get("http://localhost:8080/api/v1/users")
    .then((res) => {
      if (res && res?.data.status) {
        callback(null, res.data);
      } else {
        callback(null, res.data);
      }
    })
    .catch((err) => {
      callback(err);
      console.log(err?.response?.data?.message || "User fetch failed");
    });
};
