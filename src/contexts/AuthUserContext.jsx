import { createContext, useContext, useState } from "react";
const URL_BACK = import.meta.env.VITE_URL_BACK;

const AuthUserContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useAuthContext() {
  return useContext(AuthUserContext);
}

// Provider
export function AuthUserProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  let res;

  const userAction = async (data, action) => {
    switch (action) {
      case "login":
      case "register": {
        res = await fetch(`${URL_BACK}/api/auth/${action}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        break;
      }

      case "checkUserAuth": {
        const userSession = JSON.parse(sessionStorage.getItem("user"));
        res = await fetch(`${URL_BACK}/api/auth/${action}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userSession.token}`,
            "Content-Type": "application/json",
          },
        });
        break;
      }
    }

    const responsBackend = await res.json(); //Transformo a JSON la respuesta
    if (res.status !== 201 && res.status !== 200) { // Usuario no registrado
      setIsAuth(false);
      setUserAuth(false);
      setLoading(true);
      sessionStorage.removeItem("user");
      return responsBackend;
    } else {
      //setUserAuth({rol:responsBackend.rol}) // Cargo el valor del rol para poder direccionar a la ruta indicada
      //responsBackend.rol == "user" ? navigate("/home") : navigate("/products");
      setIsAuth(true);
      setUserAuth(responsBackend);
      setLoading(false);
      sessionStorage.setItem("user", JSON.stringify(responsBackend));
      return;
    }
  };

  const userLogOut = () => {
    setIsAuth(false);
    setUserAuth(false);
    setLoading(true);
    sessionStorage.removeItem("user");
    return;
  };

  return (
    <AuthUserContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userAuth,
        setUserAuth,
        loading,
        userAction,
        userLogOut,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
}
