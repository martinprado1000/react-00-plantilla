import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthUserContext";
import { Link, NavLink } from "react-router-dom";

function NavBarLoggedIn() {
  const navigate = useNavigate();
  const { userLogOut } = useAuthContext();

  const userSession = JSON.parse(sessionStorage.getItem("user"));

  const handleLogOut = async () => {
    userLogOut();
    navigate("/login");
  };

  function LoggedIn() {
    return (
      <NavDropdown title={userSession.name} id="collapsible-nav-dropdown">
        {/* {userAuth.roles == "ADMIN" || userAuth.roles == "SUPERADMIN" ? ( */}
        {
          !userSession.roles.includes("USER") && (
            //  (
            <NavDropdown.Item
              disabled
              className="text-primary"
            >{`Usuario: ${userSession.roles}`}</NavDropdown.Item>
          )
          // ) : (
          //   <NavDropdown.Item as={Link} to={`/cart/${userSession.cart}`}>
          //     Mi carrito
          //   </NavDropdown.Item>
          // )
        }
        <NavDropdown.Item as={Link} to="/profile">
          Perfil
        </NavDropdown.Item>{" "}
        {/* as={Link} = Le indica a la etiqueta NavDropdown.Item  que se comporte como un Link, esto tambien sirve para NavLink */}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogOut}>
          Cerrar sesión
        </NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">MP</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/home"
              className="nav-link"
              activeclassname="active"
            >
              Home
            </NavLink>
            { (userSession.roles.includes("ADMIN") ||
              userSession.roles.includes("SUPERADMIN")) && (
                <NavLink
                  to="/users"
                  className="nav-link"
                  activeclassname="active"
                >
                  Usuarios
                </NavLink>
              )}
          </Nav>
          <Nav>
            {/* {userSession ? ( */}
            <LoggedIn />
            {/* ) : (
              <NavLink to="/login">Iniciar sesión</NavLink>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarLoggedIn;
