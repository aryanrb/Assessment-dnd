import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "./api";
import { toast } from "react-toastify";

export default function Register() {
  const [registerState, setRegisterState] = useState();

  const handleChange = (e) => {
    setRegisterState({ ...registerState, [e.target.id]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(registerState);
  };

  return (
    <>
      <div className="mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">
          Already have an account?{"    "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Login
          </Link>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <form className="mt-8 space-y-6 w-6/12" onSubmit={handleRegister}>
          <div>
            <div className="my-5">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                onChange={handleChange}
                value={registerState?.username}
                id="username"
                name="username"
                type="text"
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div className="my-5">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                onChange={handleChange}
                value={registerState?.email}
                id="email"
                name="email"
                type="text"
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="my-5">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={handleChange}
                value={registerState?.password}
                id="password"
                name="password"
                type="password"
                className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
