import "./App.css";
import { 
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import { AuthUserProvider } from "./contexts/AuthUserContext";
import { UsersProvider } from "./contexts/UsersContext";

import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import { SessionRoute } from "./ProtectedRoute/SessionRoute";

import { HomePage } from "./pages/HomePage";
import { RecoveryPasswordPage } from "./pages/RecoveryPasswordPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { UsersPage } from "./pages/UsersPage";
import { UsersAddPage } from "./pages/UsersAddPage";
import { UsersEditPage } from "./pages/UsersEditPage";
import { ErrorPage } from "./pages/ErrorPage";
import { FatalErrorPage } from "./pages/FatalErrorPage";
import { Test } from "./pages/Test";

// Configuración del router con future flag y rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthUserProvider>
        <UsersProvider>
            {/* Las rutas específicas se definen en "children" más abajo */}
            <Outlet /> 
        </UsersProvider>
      </AuthUserProvider>
    ),
    children: [
      // Rutas de sesión (públicas)
      {
        element: <SessionRoute />,
        children: [
          { path: "/register", element: <RegisterPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/recoveryPassword", element: <RecoveryPasswordPage /> },
        ],
      },
      // Rutas protegidas para USER
      {
        element: <ProtectedRoute rol="USER" />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
      // Rutas protegidas para ADMIN
      {
        element: <ProtectedRoute rol="ADMIN" />,
        children: [
          { path: "/users", element: <UsersPage /> },
          { path: "/usersAdd", element: <UsersAddPage /> },
          { path: "/users/:id", element: <UsersEditPage /> },
        ],
      },
      // Otras rutas (públicas)
      { path: "/errorPage", element: <ErrorPage /> },
      { path: "/fatalErrorPage", element: <FatalErrorPage /> },
      { path: "/test", element: <Test /> },
      { path: "*", element: <ErrorPage /> }, // 404
    ],
    errorElement: <ErrorPage />, // Manejo global de errores
  },
], {
  future: {
    v7_startTransition: true, // Bandera para el warning
  },
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;