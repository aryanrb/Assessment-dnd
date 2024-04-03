import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modal/taskModal";
import { formattedDate } from "../../utils/dateFormatter";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const col =
    boards.allTasks && boards.allTasks.length > 0
      ? boards.allTasks.find((col, i) => i === colIndex)
      : [];

  let task =
    col?.tasks && col?.tasks.length > 0
      ? col.tasks.find((task, index) => index === taskIndex)
      : {};
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#8D919D] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-semibold capitalize tracking-wide ">
          {task?.task.length > 20
            ? `${task?.task.substring(0, 20)}...`
            : task?.task}
        </p>
        <p className=" text-xs tracking-tighter mt-2 text-gray-700">
          {task?.desc.length > 100
            ? `${task?.desc.substring(0, 100)}...`
            : task?.desc}
        </p>

        <div className=" text-right text-xs tracking-tighter mt-4 text-gray-600">
          <p>
            <strong>Due Date: </strong> {formattedDate(task?.dueDate)}
          </p>
          <p>
            <strong>Assigned To: </strong>{" "}
            {task.userInfo && task?.userInfo.username}
          </p>
        </div>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          type="edit"
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
