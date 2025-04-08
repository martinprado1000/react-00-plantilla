import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthUserContext";

//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

//Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function BodyLogin() {
  const navigate = useNavigate();
  const { userAction } = useAuthContext();

  // Validate useForm
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
      //marca: marcaEdit
      //apellido: '',
    },
  });

  const loginUser = async (data) => {
    try {
      let res = await userAction(data,"login");
      if (!res) {
        navigate("/home");
        return
      }
      Swal.fire({
        title: res.message,
        icon: "warning", // succes , warning , info , question, error
        timer: 3000,
        timerProgressBar: true,
      });
      return
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
    <Form className="container mt-4" onSubmit={handleSubmit(loginUser)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text" //Lo hago tipo text para no levante el error email de html
          placeholder="Ingrese su email"
          aria-describedby="inputGroupPrepend"
          {...register("email", {
            required: {
              value: true,
              message: "El campo email es requerido",
            },
            pattern: {
              // pattern es para validar expresiones regulares
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && (
          <p className="text-danger mt-1">{errors.email.message}</p>
        )}
        <Form.Text className="text-muted">
          Nunca compartiremos su correo electrónico
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese una contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "La campo contraseña es requerido",
            },
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
            maxLength: {
              value: 20,
              message: "La contraseña debe tener menos de 20 caracteres",
            },
          })}
        />
        {errors.password && (
          <p className="text-danger mt-1">{errors.password.message}</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Button variant="primary" type="submit" className="mt-3">
          Enviar
        </Button>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <NavLink to="/recoveryPassword" activeclassname="active">
          ¿Olvidaste tu contraseña?
        </NavLink>
      </Form.Group>
    </Form>
  );
}

export default BodyLogin;
