import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <h1 className="container mt-5">ErrorPage: URL no encontrado</h1>
        <button className="btn btn-primary mt-3" onClick={()=>navigate("/")}>Volver al inicio</button>
      </div>
    </>
  );
}
