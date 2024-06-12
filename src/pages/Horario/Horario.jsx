import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/err/alertSlice";
import "./Horario.css";

import ColorPicker from "../../components/ColorPicker/ColorPicker";

const Horario = () => {
  const [disableControls, setDisableControls] = useState(true);
  const [horario, setHorario] = useState("");
  const [colorPick, setColorPick] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null && !user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  const getRgbaObject = (value) => {
    setColorPick(value);
  };

  const crearHorario = async () => {
    try {
      const data = {
        horario,
        rgba: colorPick,
        congregacion: user.congregacion,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}horarios/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw response;
      }
      dispatch(
        showAlert({
          message: "Horario creado correctamente",
          type: "success",
        })
      );
      const json = await response.json();
      console.log(json)
    } catch (error) {
        const err = await error.json();
      dispatch(showAlert({ message: err.message, type: "error" }));
    }
  };
  return (
    <div className="container-fluid mt-5">
      <div className="HorarioTitle  mx-5 row">Horarios de Predicación</div>
      <div className="row m-4 pb-2">
        <div className="input-group">
          <button className="btn btn-primary" disabled={!disableControls}>
            Buscar
          </button>
          <button className="btn btn-success" onClick={crearHorario}>Grabar</button>
          <button
            className="btn btn-dark"
            onClick={() => setDisableControls((value) => !value)}
          >
            Habilitar Botones
          </button>
        </div>
      </div>
      <div className="row m-4">
        <div className="col mb-3">
          <div className="input-group">
            <span className="input-group-text">Horario</span>
            <input
              type="text"
              className="form-control"
              onChange={(event) => setHorario(event.target.value)}
              disabled={disableControls}
            />
          </div>
        </div>
        <div className="col mb-3">
          <ColorPicker rgbaString={colorPick} returnString={getRgbaObject} />
        </div>
      </div>
    </div>
  );
};

export default Horario;
