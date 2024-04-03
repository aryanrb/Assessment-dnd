import Home from "./pages/home/Home";
import Login from "./pages/form/Login";
import Register from "./pages/form/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AuthRoute from "./Auth";

function App() {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full">
          <Router>
            <ToastContainer />
            <Routes>
              <Route
                path="/login"
                element={!auth.currentUser ? <Login /> : <Home />}
              />
              <Route
                path="/register"
                element={!auth.currentUser ? <Register /> : <Home />}
              />
              <Route
                path="/"
                element={
                  <AuthRoute>
                    <Home />
                  </AuthRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
