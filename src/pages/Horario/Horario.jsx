import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/err/alertSlice";
import "./Horario.css";

import ColorPicker from "../../components/ColorPicker/ColorPicker";
import ModalGetHorarios from "../../components/ModalGetHorarios/ModalGetHorarios";

const Horario = () => {
  const [disableControls, setDisableControls] = useState(true);
  const [horario, setHorario] = useState("");
  const [colorPick, setColorPick] = useState("");
  const [horarioId, setHorarioId] = useState("");

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

  const handleScheduleSelection = (row) => {
    setHorario(row.horario);
    setColorPick(row.rgba);
    setHorarioId(row._id);
  }

  const handleCleanForm = () => {
    setHorario("");
    setColorPick("");
    setHorarioId("");
    setDisableControls(true);
  }

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
      
      setHorario(json.horario.horario);
      setColorPick(json.horario.rgba);
      setHorarioId(json.horario._id);

    } catch (error) {
      const err = await error.json();
      dispatch(showAlert({ message: err.message, type: "error" }));
    }
  };

  const updateHorario = async() => {
    try {
      const data = {
        _id: horarioId,
        horario,
        rgba: colorPick,
      }
      

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}horarios/update`,
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
          message: "Horario actualizado correctamente",
          type: "success",
        })
      );

    } catch (error) {
      const err = await error.json();
      dispatch(showAlert({ message: err.message, type: "error" }));
    }
  }

  const handleHttpRequest = async() => {
    if(horarioId.length === 0) {
      await crearHorario();
    } else {
      await updateHorario();
    }
  }
  return (
    <div className="container-fluid mt-5">
      <div className="HorarioTitle  mx-5 row">Horarios de Predicación</div>
      <div className="row m-4 pb-2">
        <div className="input-group">
          <ModalGetHorarios 
            onScheduleSelection={(schedule) => handleScheduleSelection(schedule)}
            disable={!disableControls} />
          <button 
            className="btn btn-success" 
            onClick={handleHttpRequest} 
            disabled={disableControls}
          >
            Grabar
          </button>
          <button
            className="btn btn-dark"
            onClick={() => setDisableControls((value) => !value)}
          >
            {disableControls ? "Habilitar Botones" : "Deshabilitar Botones"}
          </button>
          <button className="btn btn-secondary" onClick={handleCleanForm} disabled={disableControls}>Limpiar Campos</button>
        </div>
      </div>
      <div className="row m-4">
        <div className="col mb-3">
          <div className="input-group">
            <span className="input-group-text">Horario</span>
            <input
              type="text"
              className="form-control"
              value={horario}
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
