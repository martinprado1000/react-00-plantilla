import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthUserContext";

export function ProtectedRoute({ rol }) {
  const { getUserAuth, isAuth, userAuth, loading } = useAuthContext();
  const location = useLocation();

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Lógica de roles (usando currentUser)
  const isAllowed = () => {
    const roleHierarchy = {
      SUPERADMIN: ["SUPERADMIN"],
      ADMIN: ["SUPERADMIN", "ADMIN"],
      USER: ["SUPERADMIN", "ADMIN", "USER"],
    };
    return roleHierarchy[rol]?.some((r) => currentUser.roles?.includes(r));
  };

  return isAllowed() ? <Outlet /> : <Navigate to="/" replace />;

  //const userSession = JSON.parse(sessionStorage.getItem("user"));

  // if (!userSession) {
  //   return <Navigate to="/login" replace />; // replace, borra el historial de navegación.
  // }

  // switch (rol) {
  //   case "SUPERADMIN":
  //     if (userSession.roles.includes("SUPERADMIN")) {
  //       return <Outlet />;
  //     }
  //     break;

  //   case "ADMIN":
  //     if (
  //       userSession.roles.includes("SUPERADMIN") ||
  //       userSession.roles.includes("ADMIN")
  //     ) {
  //       return <Outlet />;
  //     }
  //     break;

  //   case "USER":
  //     if (
  //       userSession.roles.includes("SUPERADMIN") ||
  //       userSession.roles.includes("ADMIN") ||
  //       userSession.roles.includes("USER")
  //     ) {
  //       return <Outlet />;
  //     }

  //     break;
  // }
  // console.log({ Error: "No puede consumir este recurso" });
  // return <Navigate to="/login" replace />;
}
