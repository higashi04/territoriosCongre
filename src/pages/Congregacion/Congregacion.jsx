import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import ModalSearchCongregaciones from "../../components/ModalSearchCongregaciones/ModalSearchCongregaciones";

const Congregacion = () => {
  const [congregationName, setCongregationName] = useState("");
  const [isCongregationActive, setIsCongregationActive] = useState(false);
  const [congregationId, setCongregationId] = useState("");
  const [editionActive, setEditionActive] = useState(true);

  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null && !user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate])

  const handleCongregationActiveCheck = () => {
    setIsCongregationActive(!isCongregationActive);
  };

  const handleCongregationSelection = (congregation) => {
    setCongregationName(congregation.nombre);
    setIsCongregationActive(congregation.activo);
    setCongregationId(congregation._id);
  };

  const handleNewCongregation = () => {
    setCongregationId("");
    setCongregationName("");
    setIsCongregationActive(false);
    setEditionActive(false);
  };

  const handleHttpRequest = async () => {
    try {
      const data = {
        nombre: congregationName,
        activo: isCongregationActive,
        _id: congregationId,
      };
      let url = "";
      if (data._id !== "" && data._id.length > 0) {
        //process to edit
        console.log("edition not ready yet");
      } else {
        url = process.env.REACT_APP_API_SERVER + "congregaciones/create";
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("ok");
        //remember to add validation and error handling ui elements lol
      }
    } catch (error) {
      console.error(error);
    } finally{
        handleNewCongregation()
    }
  };

  return (
    <div className="mt-5 ms-5">
      <div className="container mt-5">
        <div className="row">
          <h1>Congregaciones</h1>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="input-group my-3">
              <span className="input-group-text">Nombre</span>
              <input
                type="text"
                className="form-control"
                value={congregationName}
                onInput={(e) => setCongregationName(e.target.value)}
                disabled={editionActive}
              />
            </div>
            <div className="form-check form-switch my-3">
              <input
                type="checkbox"
                className="form-check-input"
                role="switch"
                id="isCongregationActiveCheck"
                checked={isCongregationActive}
                onChange={handleCongregationActiveCheck}
                disabled={editionActive}
              />
              <label
                htmlFor="isCongregationActiveCheck"
                className="form-check-label"
              >
                {" "}
                {isCongregationActive
                  ? "Congregación Activada"
                  : "Congregación Desactivada"}{" "}
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="my-3">
              <button className="btn btn-primary" disabled={!editionActive}>
                <ModalSearchCongregaciones
                  onCongregationSelection={(congre) =>
                    handleCongregationSelection(congre)
                  }
                  btnTxt={"Buscar"}
                />
              </button>
              <button
                className="btn btn-secondary mx-3"
                onClick={handleNewCongregation}
              >
                Prender Escritura
              </button>
              <button
                className="btn btn-success"
                onClick={handleHttpRequest}
                disabled={editionActive}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congregacion;
