import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../../contexts/UsersContext";

// bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function BodyUsers() {
  const navigate = useNavigate();

  const { getUsers, users, setUsers, actionUser } = useUsersContext();

  const [search, setSearch] = useState("");

  const handleAdd = () => {
    navigate("/usersAdd");
  };

  const handleEdit = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await actionUser("delete", null, id);
          if (res) {
            Swal.fire({
              title: res.message,
              icon: "warning", // succes , warning , info , question, error
              timer: 4000,
              timerProgressBar: true,
            });
          } else {
            Swal.fire({
              title: "Operación exitosa",
              icon: "success",
              timer: 1000,
              timerProgressBar: true,
            });
            setUsers(users.filter((user) => user.id !== id)); // Elimino del front el usuario. Retorna todos los usuarios menos el eliminada.
            return;
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error inesperado en el sistema",
            icon: "error", // succes , warning , info , question, error
            timerProgressBar: true,
          });
          navigate("/fatalErrorPage");
          return;
        }
      } else {
        Swal.fire({
          title: "Operación cancelada",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };
  const filteredUsers = !search
    ? users
    : users.filter(
        (data) =>
          data.name.toLowerCase().includes(search.toLocaleLowerCase()) || // toLowerCase para que no discrimine entre mayuscula y minuscula en la busqueda
          data.lastname.toLowerCase().includes(search.toLocaleLowerCase()) ||
          //data.roles.toLowerCase().includes(search.toLocaleLowerCase()) ||
          data.roles.join(",").toLowerCase().includes(search.toLowerCase()) ||
          data.email.includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mt-3">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} className="col-4">
            <Button md="4" className="col-3 form-control" onClick={handleAdd}>
              Crear usuario
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <input
              md="auto"
              value={search}
              onChange={searcher}
              type="text"
              placeholder="Buscar"
              className="col-5 form-control"
            />
          </Form.Group>
        </Row>
      </Form>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="row">
            <th className="col-2">Nombre</th>
            <th className="col-2">Apellido</th>
            <th className="col-4">Email</th>
            {/* <th className="col-1">Edad</th> */}
            <th className="col-2">Rol</th>
            <th className="col-1"></th>
            <th className="col-1"></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <tr className="row" key={user.id}>
                <td className="col-2">{user.name}</td>
                <td className="col-2">{user.lastname}</td>
                <td className="col-4">{user.email}</td>
                {/* <td className="col-1">{user.age}</td> */}
                <td className="col-2">{user.roles}</td>
                <td className="col-1">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(user.id)}
                  >
                    Editar
                  </button>
                </td>
                <td className="col-1">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BodyUsers;