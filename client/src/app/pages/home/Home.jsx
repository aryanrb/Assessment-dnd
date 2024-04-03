import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Columns from "../../components/task/Columns";
import Header from "../../components/header/Header";
import { getTasks } from "../../pages/home/api";
import { socket } from "../../../config/socket";

function Home() {
  const boards = useSelector((state) => state.boards);
  const data = boards.allTasks;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());

    socket.on("refetch-all", () => {
      dispatch(getTasks());
    });

    // return () => {
    //   socket.close();
    // };
  }, []);
  return (
    <>
      <Header />

      <div className="bg-[#f4f7fd] h-screen flex justify-start overflow-x-scroll gap-12 px-8">
        <>
          {data.map((col, index) => (
            <Columns key={index} colIndex={index} />
          ))}
        </>
      </div>
    </>
  );
}

export default Home;
