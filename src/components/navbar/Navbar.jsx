import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsPinMapFill } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
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
          scroll ? "navib navbar-light bg-light mb3" : "navib navbar-light bg-light mb-3"
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
                <Link className="btn btn-outline-dark" to="/Territorios">Territorios</Link>
                </>
              )}
               {user?.isAdmin && ( 
                <>
                <Link className="btn btn-outline-dark mx-2" to="/Congregacion">Alta de Congregaciones</Link>
                <Link className="btn btn-outline-dark mx-2" to="/Register"> Administrar Usuarios</Link>
                <Link className="btn btn-outline-dark mx-2" to="/Horario"> Horarios de Predicación</Link>
                </>
              )} 
            </Nav>
            {user && (
              <>
              <a href="https://lighthearted-pie-05c87f.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-dark me-2" >Mapa Completo</a>
              {/* <Link to='/perfil' className="btn btn-dark me-2" reloadDocument> <FaUser/> {user.username}</Link> */}
                <button className="btn btn-dark" onClick={onLogout}>
                  <FaSignOutAlt /> Cerrar Sesión
                </button>
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