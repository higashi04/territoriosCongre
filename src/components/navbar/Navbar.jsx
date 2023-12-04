import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsPinMapFill } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { logout, reset } from "../../redux/auth/authSlice";

const Navibar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(user === null) {
      navigate("/")
    }
  }, [user, navigate])

  const [scroll, setScroll] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    localStorage.removeItem('user')
    navigate("/");
  };
  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={
          scroll ? "navib navbar-light bg-light" : "navib navbar-light"
        }
      >
        <Container>
          <Navbar.Brand>
              {" "}
              <BsPinMapFill />{" Aplicación de Territorios "} 
           
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user && (
                <>
                <Nav.Link href="/Territorios">Territorios</Nav.Link>
                <Nav.Link href="/Congregacion">Alta de Congregaciones</Nav.Link>
                <Nav.Link href="/Register">Alta de Usuarios</Nav.Link>
                </>
              )}
            </Nav>
            {user ? (
              <>
              <Link to='/perfil' className="btn btn-dark me-2" reloadDocument> <FaUser/> {user.username}</Link>
                <button className="btn btn-dark" onClick={onLogout}>
                  <FaSignOutAlt /> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-success" to="/" reloadDocument>
                  <FaSignInAlt /> Iniciar Sesión
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
export default Navibar;