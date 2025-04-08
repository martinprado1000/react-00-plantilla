import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const URL_BACK = import.meta.env.VITE_URL_BACK  

// bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//Sweet Alert 2
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function BodyCartId() {
  const [cart, setCart] = useState(false);
  const [productsInCart, setproductsInCart] = useState([]);
  const [editQuantity, setEditQuantity] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const cartId = params.id;

  const getCart = async () => {
    try {
      let res = await fetch(`${URL_BACK}/api/carts/${cartId}`, {
        credentials: "include",
      });

      let responsBackend = await res.json();
      if (responsBackend.status !== 200) {
        throw new Error({ error: responsBackend });
      }

      setCart(responsBackend.data);
      setproductsInCart(responsBackend.data.products);
      console.log(responsBackend.data.products);
      return;
    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      window.location.href = "/fatalErrorPage";
      return;
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleSubmitEditQuantity = async (e, editProduct) => {
    e.preventDefault();
    console.log(editQuantity);
    if (editQuantity < 1) {
      Swal.fire({
        title: "La cantidad debe ser mayos a 0",
        icon: "warning", // succes , warning , info , question, error
        timer: 1500,
        timerProgressBar: true,
      });
    } else {
      try {
        let res = await fetch(
          `${URL_BACK}/api/carts/${cartId}/product/${editProduct}`,
          {
            method: "PUT",
            credentials: "include", // Permito que el backend cargue y elimine las cookie en el front
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: editQuantity }),
          }
        );
        if (!res.ok) {
          throw {
            error: true,
            status: res.status,
            statusText: !res.statusText
              ? "Ocurrio un error en el sistema"
              : res.statusText,
          };
        }

        let responsBackend = await res.json(); //Transformo a JSON la respuesta
        console.log(responsBackend);

        if (responsBackend.status != 201) {
          console.log(responsBackend);
          Swal.fire({
            title: responsBackend.data[0].msg
              ? responsBackend.data[0].msg
              : responsBackend.data,
            icon: "warning", // succes , warning , info , question, error
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          Swal.fire({
            title: responsBackend.data[0].msg
              ? responsBackend.data[0].msg
              : responsBackend.data,
            icon: "success", // succes , warning , info , question, error
            timer: 2000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            getCart();
            setEditQuantity("");
          }, 2000);
        }
      } catch (error) {
        console.log(`Error inesperado en el sistema: ${error}`);
        navigate("/errorPage");
      }
    }
  };

  const handleDelite = async (deleteProduct) => {
    console.log(deleteProduct);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let res = await fetch(
            `${URL_BACK}/api/carts/${cartId}/product/${deleteProduct}`,
            {
              method: "DELETE",
              credentials: "include", // Permito que el backend cargue y elimine las cookie en el front
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          let responsBackend = await res.json();
          console.log(responsBackend);
          if (responsBackend.status != 204) {
            // Si no se pudo eliminar
            Swal.fire({
              title: responsBackend.data,
              icon: "warning", // succes , warning , info , question, error
              timer: 3000,
              timerProgressBar: true,
            });
            return;
          } else {
            setproductsInCart(
              productsInCart.filter(
                (prod) => prod.product._id !== deleteProduct
              )
            ); // Elimino del front el producto.
            return;
          }
        } catch (error) {
          console.log(`Error inesperado en el sistema: ${error}`);
          navigate("/errorPage");
          return;
        }
      }
    });
  };

  const handleBuyProducts = async () => {
    console.log(cart.id);
    Swal.fire({
      text: "¿Confirmar la compra?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("hola");
          let res = await fetch(
            `${URL_BACK}/api/cartsBuyConfirm/${cart.id}`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log(res);
          let responsBackend = await res.json();
          console.log(responsBackend);
          if (responsBackend.status == 204) {
            Swal.fire({
              title: `${responsBackend.data}`,
              icon: "success",
              timer: 2000,
              timerProgressBar: true,
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          } else {
            Swal.fire({
              title: `${responsBackend.data}`,
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
            });
          }
        } catch (error) {
          console.log(`Error inesperado en el sistema: ${error}`);
          navigate("/errorPage");
          return;
        }
      } else {
        Swal.fire({
          text: "Operación cancelada",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  return (
    <div className="mt-3 mx-4">
      {!cart || cart == "" || productsInCart == "" ? (
        <p className="mx-3 mt-3 row text-center alert h4">
          No existen productos en tu carrito
        </p>
      ) : (
        <>
          <Table striped bordered hover variant="dark" className="">
            <thead>
              <tr className="row">
                <th className="col-2">Título</th>
                <th className="col-2">Descripción</th>
                <th className="col-1">Código</th>
                <th className="col-1">Precio</th>
                <th className="col-1">Categoria</th>
                <th className="col-1">Stock</th>
                <th className="col-1">Cantidad en el carrito</th>
                <th className="col-2">Modificar cantidad</th>
                <th className="col-1"></th>
              </tr>
            </thead>

            <tbody>
              {productsInCart &&
                productsInCart.map((products) => (
                  <tr className="row" key={products._id}>
                    <td className="col-2">{products.product.title}</td>
                    <td className="col-2">{products.product.description}</td>
                    <td className="col-1">{products.product.code}</td>
                    <td className="col-1">{products.product.price}</td>
                    <td className="col-1">{products.product.category}</td>
                    <td className="col-1">{products.product.stock}</td>
                    <td className="col-1">{products.quantity}</td>
                    <td className="col-2">
                      <Form
                        onSubmit={(e) =>
                          handleSubmitEditQuantity(e, products.product._id)
                        }
                      >
                        <InputGroup size="sm">
                          <Form.Control
                            value={editQuantity || ""} // agrego || '' para que no arroje error al renderizar si editQuantity no tiene ningun valor.
                            type="number"
                            placeholder="Cantidad"
                            onChange={(e) => setEditQuantity(e.target.value)}
                          />
                          <Button type="submit" className="btn-info">
                            Editar cantidad
                          </Button>
                        </InputGroup>
                      </Form>
                    </td>
                    <td className="col-1">
                      <button
                        className="btn btn-danger btn-sm d-block mx-auto"
                        onClick={() => handleDelite(products.product._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button
            type="submit"
            className="btn-success"
            onClick={handleBuyProducts}
          >
            Comprar productos
          </Button>
        </>
      )}
    </div>
  );
}

export default BodyCartId;
