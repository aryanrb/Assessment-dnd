import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../../components/task/Tasks";
import { editStatus } from "../../pages/home/api";

function Column({ colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  const col =
    boards.allTasks && boards.allTasks.length > 0
      ? boards.allTasks.find((col, i) => i === colIndex)
      : [];

  useEffect(() => {}, [dispatch]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    let prevCol = boards.allTasks.find((col, i) => i === prevColIndex);
    let tas = prevCol.tasks.find((col, i) => i === taskIndex);

    if (colIndex !== prevColIndex) {
      dispatch(editStatus({ colIndex, prevColIndex, taskIndex, data: tas }));
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide mx-5 pt-[100px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#657FA7]">
        <div className={`rounded-full w-4 h-4 `} />
        <p className="uppercase">{col?.status}</p>(
        {col?.tasks && col?.tasks.length > 0 ? col.tasks.length : 0})
      </p>

      {col?.tasks && col?.tasks.length > 0 ? (
        col.tasks.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Column;
