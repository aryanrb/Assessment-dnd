import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

server.interceptors.request.use(
  (config) => {
    let state = JSON.parse(localStorage.getItem("auth"));
    if (!state) {
      return null;
    }

    // const user = JSON.parse(state.user);
    let token = state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    alert("interceptor request has error");
    return Promise.reject(error);
  }
);


export { server };
