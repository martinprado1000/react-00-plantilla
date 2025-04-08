import { useAuthContext } from "../../contexts/AuthUserContext";
import ListGroup from "react-bootstrap/ListGroup";

function BodyProfile() {
  
  const { userAuth } = useAuthContext();

  return (
    <>
      <ListGroup className="container my-3">
        <ListGroup.Item variant="dark">Nombre: {userAuth.name}</ListGroup.Item>
        <ListGroup.Item variant="dark">Apellidos: {userAuth.lastname}</ListGroup.Item>
        <ListGroup.Item variant="dark">Edad: {userAuth.age}</ListGroup.Item>
        <ListGroup.Item variant="dark">Email: {userAuth.email}</ListGroup.Item>
        <ListGroup.Item variant="dark">Nombre de usuario: {userAuth.username}</ListGroup.Item>
        <ListGroup.Item variant="dark">Rol: {userAuth.rol}</ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default BodyProfile;
