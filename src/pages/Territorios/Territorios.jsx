import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/err/alertSlice";

import MapBio from "../../components/MapBio/MapBio";
import ModalSearchTerritorios from "../../components/ModalSearchTerritorios/ModalSearchTerritorios";
import ModalGetHorarios from "../../components/ModalGetHorarios/ModalGetHorarios";

import "./Territorios.css";
const defaultHorario = {
  horario: "0",
  rgba: "rgba(3, 170, 238, 0.5)"
}

const Territorios = () => {
  const [territorioName, setTerritorioName] = useState("nombre de territorio");
  const [coordinatesA, setCoordinatesA] = useState({ lng: 0, lat: 0 });
  const [coordinatesB, setCoordinatesB] = useState({ lng: 0, lat: 0 });
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);
  const [editable, setEditable] = useState(true);
  const [territoryId, setTerritoryId] = useState("");
  const [brandedHouses, setBrandedHouses] = useState([]);
  const [blockNumbers, setBlockNumbers] = useState([]);
  const [lines, setLines] = useState([]);
  const [horario, setHorario] = useState(defaultHorario);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    try {
      if (lines.length > 0) {
        const {totalLatitudes, totalLongitudes} = lines.reduce(
          (accumulated, line) => {
            accumulated.totalLatitudes += line.latOne + line.latTwo;
            accumulated.totalLongitudes += line.lngOne + line.lngTwo;
            return accumulated;
          },
          {totalLatitudes: 0, totalLongitudes: 0}
        )
        
        const numberOfPoints = lines.length * 2;
        const centeredLng = totalLongitudes / numberOfPoints;
        const centeredLat = totalLatitudes / numberOfPoints;

        setCenterLat(centeredLat);
        setCenterLng(centeredLng);
      }
    } catch (error) {
      console.error(error);
    }
  }, [lines]);

  useEffect(() => {
    if (coordinatesA.lng !== 0 && coordinatesB.lng !== 0) {
      setLines((prevArray) => [
        ...prevArray,
        {
          latOne: coordinatesA.lat,
          lngOne: coordinatesA.lng,
          latTwo: coordinatesB.lat,
          lngTwo: coordinatesB.lng,
          _id: uuidv4(),
        },
      ]);

      setCoordinatesA({ lng: 0, lat: 0 });
      setCoordinatesB({ lng: 0, lat: 0 });
    }
  }, [coordinatesA, coordinatesB, horario]);

  const handleCoordinatesChange = (inputName, newCoordinates) => {
    try {
      switch (inputName) {
        case "A":
          setCoordinatesA(newCoordinates);
          break;
        case "B":
          setCoordinatesB(newCoordinates);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const data = {
        nombre: territorioName,

        congregacion: user.congregacion,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}territorios/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw response;
      }
      dispatch(showAlert({message: "Territorio creado correctamente", type: "success"}))
      const json = await response.json();

      setTerritorioName(json.nombre);
      setTerritoryId(json._id);
      console.log(json);
    } catch (error) {
      try {
        const err = await error.json();
        dispatch(showAlert({message: err.message, type: "error"}))
      } catch (errorTwo) {
        console.error(errorTwo);
        dispatch(showAlert({message: error.message, type: "error"}))
      }
    }
  };

  const handleCleanForm = () => {
    setEditable(true);

    setTerritorioName("");
    setTerritoryId("");
    setBrandedHouses([]);
    setBlockNumbers([]);
    setLines([]);
    setHorario(defaultHorario);
  };

  const handleTerritorySelection = (chosenTerritory) => {
    try {

      setTerritorioName(chosenTerritory.nombre);
      setTerritoryId(chosenTerritory._id);
      setBrandedHouses(chosenTerritory.marcados);
      setBlockNumbers(chosenTerritory.blocks);
      setLines(chosenTerritory.lineas);
      setHorario(chosenTerritory.horario);
      setEditable(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveHorario = async(horario, schedule) => {
    try {
      const data = {
        horario,
        territory: territoryId
      }
      const response = await fetch(`${process.env.REACT_APP_API_SERVER}territorios/setSchedule`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });

      if(!response.ok) {
        throw response;
      }

      dispatch(showAlert({message: `Horario ${schedule} asignado al territorio ${territorioName} correctamente`, type: "success"}));
    } catch (error) {
      try {
        const err = await error.json();
        dispatch(showAlert({message: err.message, type: "error"}));
      } catch (errorTwo) {
        console.error(errorTwo);
        dispatch(showAlert({message: error.message, type: "error"}));
      }
    }
  }

  const handleScheduleSelection = async(horarioClicked) => {
    setHorario(horarioClicked);
    await saveHorario(horarioClicked._id, horarioClicked.horario);
  }

  const handleSaveLines = async() => {
    try {
      if(lines.length === 0) {
        dispatch(showAlert({message: "Necesita dibujar al menos una linea en el territorio", type: "warning"}));
        return;
      }

      const data ={
        lines,
        territoryId,
        congregacion: user.congregacion
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}lines/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if(!response.ok) {
        throw response;
      } else {
        dispatch(showAlert({message: "Líneas guardadas correctamente", type: "success"}));
      }

    } catch (error) {
      try {
        const err = await error.json();
        dispatch(showAlert({message: err.message, type: "error"}));
      } catch (errorTwo) {
        console.error(errorTwo);
        dispatch(showAlert({message: error.message, type: "error"}));
      }
    }
  }


  return (
    <div id="territorioBody">
      <div className="row my-5">
        <div className="col-4">
          <div className="row my-3">
            <div className="input-group">
              <label className="input-group-text">Territorio:</label>
              <input
                type="text"
                className="form-control"
                value={territorioName}
                disabled={editable}
                onChange={(e) => setTerritorioName(e.target.value)}
              />
              <ModalSearchTerritorios
                onTerritorySelection={(chosenTerritory) => {
                  handleTerritorySelection(chosenTerritory);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-8">
          {user?.isAdmin || user?.canWrite ? (
            <>
              <button
                className="btn btn-success btnTerritorio mx-2 mb-2"
                onClick={() => {
                  setEditable(false);
                }}
                disabled={!editable}
              >
                Crear
              </button>
              {/* <button className="btn btn-dark mx-2 mb-2" disabled={editable}>
                Editar
              </button> */}
              <button
                className="btn btn-secondary mx-2 mb-2"
                disabled={editable}
                onClick={() => handleCleanForm()}
              >
                Cancelar
              </button>
              {/* <button className="btn btn-danger mx-2 mb-2" disabled>
                Eliminar
              </button> */}
              {!editable && (
                <>
                <button
                  className="btn btn-primary mx-2 mb-2"
                  onClick={() => handleSaveChanges()}
                >
                  Guardar Cambios
                </button>
                <button 
                  className="btn btn-primary mx-2 mb-2"
                  onClick={() => handleSaveLines()}
                >
                  Guardar Líneas
                </button>
                <button  className="btn mb-2"> 
                  <ModalGetHorarios onScheduleSelection={(row) => handleScheduleSelection(row)} />
                </button>
                </>
              )}
            </>
          ) : (
            <>
              <button
                className="btn btn-secondary mx-2 mb-2"
                disabled={editable}
                onClick={() => handleCleanForm()}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
      <div id="territorioMap" className="mb-3">
        <MapBio
          // markers={[coordinatesA, coordinatesB, coordinatesC, coordinatesD]}
          lines={lines}
          horario={horario}
          lng={centerLng}
          lat={centerLat}
          brandedHouses={brandedHouses}
          blocks={blockNumbers}
          parentTerritory={territoryId}
          onBrandedEdit={(territory) => handleTerritorySelection(territory)}
          territoryId={territoryId}
          onBrandedSave={(territory) => handleTerritorySelection(territory)}
          onBlockSave={(territory) => handleTerritorySelection(territory)}
          onCornerSelection={(corner, coordinates) =>
            handleCoordinatesChange(corner, coordinates)
          }
        />
      </div>

      <div className="row">
        <div className="col-6"></div>
      </div>
    </div>
  );
};

export default Territorios;
