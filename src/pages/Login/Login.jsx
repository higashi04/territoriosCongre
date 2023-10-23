import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../redux/auth/authSlice";


import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggle, setToggle] = useState(false);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const {user, isError, isSuccess ,message} = useSelector((state) => state.auth)
  
    useEffect(() => {
      document.body.style.backgroundColor = "#669BC7";
      if (isError) {
        console.error(message)
      }
      if (isSuccess || user) {
        navigate('/')
      }
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]);
    const onSubmit = (e) => {
      e.preventDefault();
      const userData = {
        email: email,
        password: password
      }
      dispatch(login(userData))
    };
    
    const handleToggleClick = () => {
      setToggle((previousToggle) => !previousToggle);
    };
    return (
      <>
        <h1 className="login-title">
          Ingrese sus datos
        </h1>
        <section>
          <div className="container contact-box">
            <form onSubmit={onSubmit}>
              <div className="form-floating pb-2 contact-input">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating pb-2 contact-input">
                <input
                  type={toggle ? "text" : "password"}
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password">Contraseña</label>
                {toggle ? (
                  <FaEyeSlash
                    className="eyeToggler"
                    onClick={handleToggleClick}
                  />
                ) : (
                  <FaEye className="eyeToggler" onClick={handleToggleClick} />
                )}
              </div>
              <button className="btn btn-success"> <FaSignInAlt className="me-3" />Iniciar Sesión</button>
            </form>
          </div>
        </section>
      </>
    );
}

export default Login
