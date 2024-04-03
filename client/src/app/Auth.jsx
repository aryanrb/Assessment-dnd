import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Auth = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth);
  const location = useLocation();
  if (!isLoggedIn.currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default Auth;
