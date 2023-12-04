import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

import ModalSearchCongregaciones from "../../components/ModalSearchCongregaciones/ModalSearchCongregaciones";

import "./Register.css";

const passwordMsg = [];
const lowerCaseLetterRegex = /[a-z]/g;
const upperCaseLetterRegex = /[A-Z]/g;
const numbersPassword = /[0-9]/g;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [congregacion, setCongregacion] = useState("");
  const [congregacionName, setCongregacionName] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [toggle, setToggle] = useState(false);

  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(user === null) {
      navigate("/")
    }
  }, [user, navigate])

  const handleCongregationSelection = (congre) => {
    setCongregacion(congre._id);
    setCongregacionName(congre.nombre);
  };

  const handleToggleClick = () => {
    setToggle((previousToggle) => !previousToggle);
  };

  const cleanState = () =>{
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setCongregacion("");
    setCongregacionName("");
    setPasswordError("");
  }

  const handleSignUp = async () => {
    try {
      const data = {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        congregacion: congregacion,
      };
      while (passwordMsg.length > 0) {
        passwordMsg.pop();
      }
      if (username === null) {
        passwordMsg.push("Agregar nombre usuario");
      }
      if (
        password.match(lowerCaseLetterRegex) &&
        !password.match(upperCaseLetterRegex)
      ) {
        passwordMsg.push("Agregar al menos una mayúscula.");
      }
      if (!password.match(numbersPassword)) {
        passwordMsg.push("Su contraseña debe de tener al menos un número.");
      }
      if (password.length < 8) {
        passwordMsg.push("Su contraseña debe de ser al menos ocho carácteres.");
      }
      if (password !== confirmPassword) {
        passwordMsg.push("Las contraseñas no coinciden");
      }
      if (passwordMsg.length > 0) {
        setPasswordError(true);
        throw new Error(
          "password validation invalid" +  passwordMsg.join(", ")
        );
      }
      console.log(data);
      await fetch(process.env.REACT_APP_API_SERVER + "usuario/registrarse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    } finally {
      cleanState();
    }
  };

  return (
    <div className="mt-5 ms-5">
      <div id="mainRegister">
        <h1 className="mb-3">Crear Cuenta</h1>

        <div className="row mb-3">
          <div className="col">
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Usuario"
                name="username"
                id="username"
                type="text"
                onInput={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <label htmlFor="username" className="form-label">
                Usuario
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-floating">
              <input
                className="form-control"
                name="password"
                id="password"
                placeholder="Contraseña"
                type={!toggle ? "password" : "text"}
                onInput={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                className="form-control"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Contraseña"
                type={!toggle ? "password" : "text"}
                onInput={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
              <label htmlFor="password" className="form-label">
                Confirmar Contraseña
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            ¿Mostar Contraseña?{" "}
            {toggle ? (
              <FaEyeSlash
                className="eyeToggler-register"
                onClick={handleToggleClick}
              />
            ) : (
              <FaEye
                className="eyeToggler-register"
                onClick={handleToggleClick}
              />
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Nombre"
                name="firstName"
                id="firstName"
                type="text"
                onInput={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <label htmlFor="firstName" className="form-label">
                Nombre
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Apellidos"
                name="lastName"
                id="lastName"
                type="text"
                onInput={(event) => {
                  setLastName(event.target.value);
                }}
              />
              <label htmlFor="username" className="form-label">
                Apellidos
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="form-floating">
              <input
                className="form-control"
                placeholder="Correo Eléctronico"
                name="email"
                id="email"
                type="text"
                onInput={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <label htmlFor="email" className="form-label">
                Correo Eléctronico
              </label>
            </div>
          </div>
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Congregacion"
                value={congregacionName}
                disabled
              />
            </div>
            <button className="btn btn-primary">
              <ModalSearchCongregaciones
                onCongregationSelection={(congre) =>
                  handleCongregationSelection(congre)
                }
                btnTxt={"Congregación"}
              />
            </button>
          </div>
        </div>

        <div className="row mb-3">
          <button className="btn btn-primary" onClick={() => handleSignUp()}>
            Submit
          </button>
        </div>
        <div id="errorMessage" className="row mb-3">
          {/* <ul>
            {passwordError &&
              passwordMsg.map((item) => <ErrorBox listItem={item} />)}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
