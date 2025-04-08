import { useEffect } from "react";
import { useForm } from "react-hook-form"; //IMPORTAMOS el hook del formulario
import { useNavigate, useParams } from "react-router-dom";
import { useUsersContext } from "../../contexts/UsersContext";
const URL_BACK = import.meta.env.VITE_URL_BACK;

//Bootstrap
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function BodyUsersAddEdit() {
  const { actionUser } = useUsersContext();
  const navigate = useNavigate();

  // Register useForm
  const {
    register,
    formState: { errors }, // Son los valores del objeto error
    watch, // Guarda el valor actual de los inputps
    handleSubmit,
    reset, // resetea TODO el formulario cuando lo llamo
    resetField, // restea el input seleccionado, ej: setValue("password")
    setValue, // Le asigna el valor que le asignemos a un input, ej: setValue("email","")
  } = useForm({
    defaultValues: {
      // Con defaultValues le podemos asignar valores por defecto al campo que deseamos, si no queremos asignar ningun valor por defecto ejecuto el useForm sin ningun valor: useForm();
      // name: "juan"
    },
  });

  const params = useParams();
  const id = params.id;

  useEffect(() => { // Cargo el usuario
    if (id) {// Si existe un id cargo los datos en el formulario para editar.
      getUserId(id);
    }
  }, []);

  const getUserId = async (id) => {
    console.log(`Editar usuario con id: ${id}`);
    try {
      const res = await actionUser("getByTerm", null, id);
      if (res.message) {
        Swal.fire({
          title: res.message,
          icon: "warning",
          timer: 4000,
          timerProgressBar: true,
        });
      } else {
        setValue("name", res.name);
        setValue("lastname", res.lastname);
        setValue("email", res.email);
        setValue("roles", res.roles);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error inesperado en el sistema",
        icon: "error", // succes , warning , info , question, error
        timerProgressBar: true,
      });
      navigate("/fatalErrorPage");
    }
  };

  const submitUser = async (data) => {
    let res;
    try {
      if (!id) {  // Si no hay id hay que crear un usuario.
        // ************************** CREATE USER ******************************************************************
        res = await actionUser("add", data);
      } else {
        // ************************** EDIT USER ********************************************************************
        if (data.password == "" && data.confirmPassword == "") {
          // Si no envian ningun password elimino las propiedades password y password repeat para que no las envia al backend como un string vacio.
          delete data.password;
          delete data.confirmPassword;
        }
        res = await actionUser("edit", data, id);
      }

      if (res.message) {
        Swal.fire({
          title: res.message,
          icon: "warning",
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
        setTimeout(() => {
          navigate("/users");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error inesperado en el sistema",
        icon: "error", // succes , warning , info , question, error
        timerProgressBar: true,
      });
      navigate("/fatalErrorPage");
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitUser)} className="container mt-4">
      <Row className="mb-1">
        <Form.Group as={Col} md="6">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre"
            {...register("name", {
              required: {
                value: true,
                message: "La campo nombre es requerido",
              },
              pattern: {
                value: /^[A-Za-zñÑ]+$/,
                message:
                  "El campo nombre solo puede contener letras sin espacios ni caracteres especiales",
              },
              minLength: {
                value: id ? 0 : 2,
                message: "El campo nombre debe tener mas de 2 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El campo nombre debe tener menos de 20 caracteres",
              },
            })}
          />
          {errors.name && (
            <p className="text-danger mt-1">{errors.name.message}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el apellido"
            {...register("lastname", {
              required: {
                value: true,
                message: "La campo apellido es requerido",
              },
              pattern: {
                value: /^[A-Za-zñÑ]+$/,
                message:
                  "El campo apellido solo puede contener letras sin espacios ni caracteres especiales",
              },
              minLength: {
                value: 2,
                message: "El campo apellido debe tener mas de 2 caracteres",
              },
              maxLength: {
                value: 20,
                message: "El campo apellido debe tener menos de 20 caracteres",
              },
            })}
          />
          {errors.lastname && (
            <p className="text-danger mt-1">{errors.lastname.message}</p>
          )}
        </Form.Group>

        {/* <Form.Group as={Col} md="4">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese la edad"
            {...register("age", {
              required: {
                value: true,
                message: "La campo edad es requerido",
              },
              maxLength: {
                value: 3,
                message: "El campo edad debe tener menos de 3 caracteres",
              },
            })}
          />
          {errors.age && (
            <p className="text-danger mt-1">{errors.age.message}</p>
          )}
        </Form.Group> */}
      </Row>

      <Row className="mt-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              type="text" //Lo hago tipo text para no levante el error email de html
              placeholder="Ingrese el email"
              aria-describedby="inputGroupPrepend"
              {...register("email", {
                required: {
                  value: true,
                  message: "La campo email es requerido",
                },
                pattern: {
                  // pattern es para validar expresiones regulares
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Email inválido",
                },
              })}
              disabled={id} //Deshabilito el campo email si existe un id
            />
          </InputGroup>
          {errors.email && (
            <p className="text-danger mt-1">{errors.email.message}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder={id ? "******" : "Ingrese una contraseña"}
            {...register("password", {
              required: {
                value: id ? false : true,
                message: "La campo contraseña es requerido",
              },
              minLength: {
                value: 6,
                message: "El campo contraseña debe tener mas de 6 caracteres",
              },
              maxLength: {
                value: 20,
                message:
                  "El campo contraseña debe tener menos de 20 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
              },
            })}
          />
          {errors.password && (
            <p className="text-danger mt-1">{errors.password.message}</p>
          )}
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder={id ? "******" : "Confirme la contraseña"}
            {...register("confirmPassword", {
              required: {
                value: id ? false : true,
                message: "El campo confirmar contraseña es requerido",
              },
              validate: (value) =>
                value == watch("password") || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-danger mt-1">{errors.confirmPassword.message}</p>
          )}
        </Form.Group>
      </Row>

      <Row className="mt-3">
        <Form.Group as={Col} md="3">
          <Form.Label>Rol de usuario</Form.Label>
          <Form.Select
            md="3"
            {...register("roles", {
              required: {
                value: true,
                message: "La campo rol es requerido",
              },
            })}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Selecciona un rol
            </option>
            <option value="USER">USUARIO</option>
            <option value="OPERATOR">OPERADOR</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </Form.Select>
          {errors.roles && (
            <p className="text-danger mt-1">{errors.roles.message}</p>
          )}
        </Form.Group>
      </Row>
      <Button type="submit" className="mt-4">
        Enviar
      </Button>
    </Form>
  );
}

export default BodyUsersAddEdit;
