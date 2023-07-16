import { isExpired } from "react-jwt";
import { notify } from '../../utils/notify';
import { clearUserData } from "../../utils/clearUserData";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const isMyTokenExpired = isExpired(token);
    if (!isMyTokenExpired) {
      return true;
    } else {
      clearUserData();
      window.dispatchEvent(new Event("token_update"));
      notify("error","Session expired, Please login again", {
        autoClose: 3000,
        position: "bottom-right",
      });
      return false;
    }
  };

  return isTokenValid() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;