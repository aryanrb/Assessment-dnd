import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { users, add, edit, delTask } from "../../pages/home/api";
import DeleteModal from "./deleteModal";
import { formattedDate } from "../../utils/dateFormatter";

function TaskModal({
  type,
  device,
  setIsTaskModalOpen,
  taskIndex,
  colIndex = 0,
}) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [user, setUser] = useState([]);
  const [assignTo, setAssignTo] = useState();
  const [status, setStatus] = useState("todo");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const col =
    boards.allTasks && boards.allTasks.length > 0
      ? boards.allTasks.find((col, i) => i === colIndex)
      : [];

  const task =
    col?.tasks && col.tasks.length > 0
      ? col.tasks.find((task, index) => index === taskIndex)
      : [];

  useEffect(() => {
    getAllUsers();
    if (type === "edit") {
      setTitle(task?.task);
      setDescription(task?.desc);
      setDeadline(formattedDate(task?.dueDate));
      setStatus(task?.status);
    }
  }, []);

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const onChangeAssign = (e) => {
    setAssignTo(e.target.value);
  };

  const getAllUsers = async () => {
    users((err, data) => {
      if (!err) {
        setUser(data.data);
        setAssignTo(data.data[0]._id);
      }
    });
  };

  const onDeleteBtnClick = async (e) => {
    if (e.target.textContent === "Delete") {
      await dispatch(delTask(task._id, taskIndex, colIndex));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const onSubmit = async (type) => {
    if (type === "add") {
      await dispatch(add({ title, description, status, deadline, assignTo }));
    } else {
      await dispatch(
        edit(
          { title, description, status, deadline, assignTo, id: task._id },
          taskIndex,
          colIndex
        )
      );
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "z-100 py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "z-100 py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#515157] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Form Design"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="e.g. Design a responsive regsitration form for college."
          />
        </div>

        {/* Deadline */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Deadline
          </label>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            id="task-deadline-input"
            type="date"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
          />
        </div>

        {/* Assigned To */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Assign To
          </label>
          <select
            value={assignTo}
            onChange={onChangeAssign}
            id="task-assignTo-input"
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {user.map((user, index) => (
              <option key={index} className="text-gray-500" value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 text-white  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {boards.allTasks.map((column, index) => (
              <option key={index} className="text-gray-500">{column.status}</option>
            ))}
          </select>

          {type === "edit" ? (
            <button
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
              className=" w-full items-center text-white bg-[#d05151] py-2 rounded-full "
            >
              {" "}
              Delete Task
            </button>
          ) : (
            <></>
          )}

          <button
            onClick={() => {
              onSubmit(type);
              setIsTaskModalOpen(false);
              type === "edit";
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
            {type === "edit" ? " Edit Task" : "Create Task"}
          </button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.task}
        />
      )}
    </div>
  );
}

export default TaskModal;
