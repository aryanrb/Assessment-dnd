import axios from "axios";
import { toast } from "react-toastify";
import history from "../../../config/history";
import { loginSuccess, loginFailure } from "../../../redux/authSlice";

const config = {
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const register = async (user) => {
  try {
    await axios
      .post("http://localhost:8080/api/v1/register", user, config)
      .then((res) => {
        if (res && res?.data.status) {
          toast.success(res.data.message || "SUCCESS");
          setTimeout(() => {
            history.push("/login");
            window.location.reload();
          }, 2000);
        } else {
          toast.error(res.data.message || "FAILED");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Registration failed");
      });
  } catch (error) {
    console.log(error, "ERROR");
  }
};

export const login = (user) => async (dispatch) => {
  const userData = {
    email: user.email,
    password: user.password,
  };
  await axios
    .post("http://localhost:8080/api/v1/login", userData, config)
    .then((res) => {
      if (res && res?.data.status) {
        localStorage.setItem("auth", JSON.stringify(res.data.data));
        dispatch(loginSuccess(res.data.data));
        toast.success(res.data.message || "LOGIN SUCCESS");
        history.push("/");
      } else {
        dispatch(loginFailure());
        toast.error(res.data.message || "LOGIN FAILED");
      }
      console.log(res, "RESPONSE=========", res.data, res.data.message);
    })
    .catch((err) => {
      console.log(err?.response?.data?.message, "========error", err);
      dispatch(loginFailure());
      toast.error(err?.response?.data?.message || "Login failed");
    });
};
