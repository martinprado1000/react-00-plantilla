import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthUserProvider } from "./contexts/AuthUserContext";
import { UsersProvider } from "./contexts/UsersContext";

import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";

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
import { SessionRoute } from "./ProtectedRoute/SessionRoute";

function App() {
  return (
    <>
      <AuthUserProvider>
        <UsersProvider>
          <BrowserRouter>
            <Routes> {/* Indicamos que vas a ser multiples rutas */}
              <Route element={<SessionRoute />}>  {/* element: indica que use el dicho componente antes de continuar con la ruta solicitada */}
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/recoveryPassword" element={<RecoveryPasswordPage />}
                ></Route>
              </Route>

              <Route element={<ProtectedRoute rol="USER" />}>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
              </Route>

              <Route element={<ProtectedRoute rol="ADMIN" />}>
                <Route path="/users" element={<UsersPage />}></Route>
                <Route path="/usersAdd" element={<UsersAddPage />}></Route>
                <Route path="/users/:id" element={<UsersEditPage />}></Route>
              </Route>
              
              <Route path="/errorPage" element={<ErrorPage />}></Route>
              <Route
                path="/fatalErrorPage"
                element={<FatalErrorPage />}
              ></Route>
              <Route path="/test" element={<Test />}></Route>
              <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
          </BrowserRouter>
        </UsersProvider>
      </AuthUserProvider>
    </>
  );
}

export default App;
