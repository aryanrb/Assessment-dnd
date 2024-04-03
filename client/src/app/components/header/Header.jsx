import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/react.svg";
import TaskModal from "../modal/taskModal";
import { logout } from "../../../redux/authSlice";
import ProfileIcon from "../profileIcon";

export default function Header() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const handleLogoutClick = (e) => {
    e.preventDefault();
    console.log(auth, "AUTH=============");
    dispatch(logout());
    localStorage.removeItem("auth");
  };

  return (
    <div className="py-4 px-6 w-full fixed left-0 top-0 bg-white border-b border-black z-50">
      <header className=" flex justify-between items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <button className="relative">
            <ProfileIcon name={auth?.currentUser.username}/>
          <span className="z-80 absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-0 transition-opacity duration-200 pointer-events-none">
          {auth?.currentUser.email}
              </span>
              </button>
          <h3 className=" md:text-2xl uppercase hidden md:inline-block font-bold  font-sans">
            {auth?.currentUser.username}
          </h3>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            className=" button hidden md:block "
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className="button py-1 px-3 md:hidden"
          >
            +
          </button>
          <button className="relative rounded-full border border-gray-300 p-2">
            <Link to="/login" onClick={handleLogoutClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                <path d="M15 12h-12l3 -3" />
                <path d="M6 15l-3 -3" />
              </svg>
              <span className="z-80 absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow opacity-0 transition-opacity duration-200 pointer-events-none">
                Logout
              </span>
            </Link>
          </button>
        </div>
      </header>
      {isTaskModalOpen && (
        <TaskModal
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}
    </div>
  );
}
