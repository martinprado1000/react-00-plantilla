import { Navigate, Outlet } from "react-router-dom";

export function SessionRoute() {

  const userSession = JSON.parse(sessionStorage.getItem("user"));
  if (userSession) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;

}
