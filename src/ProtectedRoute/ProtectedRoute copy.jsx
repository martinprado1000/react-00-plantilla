import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthUserContext";

export function ProtectedRoute({ rol }) {
  const { getUserAuth, isAuth, userAuth, loading } = useAuthContext();

  const userSession = JSON.parse(sessionStorage.getItem("user"));

  if (!userSession) {
    return <Navigate to="/login" replace />; // replace, borra el historial de navegación.
  }

  switch (rol) {
    case "SUPERADMIN":
      if (userSession.roles.includes("SUPERADMIN")) {
        return <Outlet />;
      }
      break;

    case "ADMIN":
      if (
        userSession.roles.includes("SUPERADMIN") ||
        userSession.roles.includes("ADMIN")
      ) {
        return <Outlet />;
      }
      break;

    case "USER":
      if (
        userSession.roles.includes("SUPERADMIN") ||
        userSession.roles.includes("ADMIN") ||
        userSession.roles.includes("USER")
      ) {
        return <Outlet />;
      }

      break;
  }
  console.log({ Error: "No puede consumir este recurso" });
  return <Navigate to="/login" replace />;
}
