import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import MapBio from "../../components/MapBio/MapBio";
// import Geocode from "../../components/Geocoding/Geocoding";
import ModalSearchTerritorios from "../../components/ModalSearchTerritorios/ModalSearchTerritorios";

import "./Territorios.css";

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
  const [horario, setHorario] = useState("0");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  // useEffect(() => {
  //   try {
  //     if (
  //       coordinatesA.lng !== 0 &&
  //       coordinatesB.lng !== 0 &&
  //       coordinatesC.lng !== 0 &&
  //       coordinatesD.lng !== 0
  //     ) {
  //       const lngSum =
  //         coordinatesA.lng +
  //         coordinatesB.lng +
  //         coordinatesC.lng +
  //         coordinatesD.lng;
  //       const latSum =
  //         coordinatesA.lat +
  //         coordinatesB.lat +
  //         coordinatesC.lat +
  //         coordinatesD.lat;

  //       const centeredLng = lngSum / 4;
  //       const centeredLat = latSum / 4;

  //       setCenterLat(centeredLat);
  //       setCenterLng(centeredLng);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [coordinatesA, coordinatesB, coordinatesC, coordinatesD]);

  useEffect(() => {
    if (coordinatesA.lng !== 0 && coordinatesB.lng !== 0) {
      setLines((prevArray) => [
        ...prevArray,
        {
          latOne: coordinatesA.lat,
          lngOne: coordinatesA.lng,
          latTwo: coordinatesB.lat,
          lngTwo: coordinatesB.lng,
          horario,
          id: uuidv4(),
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

      const json = await response.json();

      setTerritorioName(json.nombre);
      setTerritoryId(json._id);
      console.log(json);
    } catch (error) {
      try {
        const err = await error.json();
        alert(err.messasge);
      } catch (errorTwo) {
        console.error(errorTwo);
        alert(error);
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
    setHorario("0");
  };

  const handleTerritorySelection = (chosenTerritory) => {
    console.log(chosenTerritory);
    try {
      // setCoordinatesA({
      //   lat: chosenTerritory.esquinaLatitudA,
      //   lng: chosenTerritory.esquinaLongitudA,
      //   title: "A",
      // });
      // setCoordinatesB({
      //   lat: chosenTerritory.esquinaLatitudB,
      //   lng: chosenTerritory.esquinaLongitudB,
      //   title: "B",
      // });

      setTerritorioName(chosenTerritory.nombre);
      setTerritoryId(chosenTerritory._id);
      setBrandedHouses(chosenTerritory.marcados);
      setBlockNumbers(chosenTerritory.blocks);
      setLines(chosenTerritory.lineas);
      setHorario(chosenTerritory.horario);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="territorioBody">
      <div className="row my-5">
        <div className="col-8">
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
        <div className="col-4">
          {user?.isAdmin || user?.canWrite ? (
            <>
              <button
                className="btn btn-success btnTerritorio mx-2 mb-2"
                onClick={() => {
                  setEditable(false);
                }}
              >
                Crear
              </button>
              <button className="btn btn-dark mx-2 mb-2" disabled>
                Editar
              </button>
              <button
                className="btn btn-secondary mx-2 mb-2"
                disabled={editable}
                onClick={() => handleCleanForm()}
              >
                Cancelar
              </button>
              <button className="btn btn-danger mx-2 mb-2" disabled>
                Eliminar
              </button>
              {!editable && (
                <button
                  className="btn btn-primary mx-2 mb-2"
                  onClick={() => handleSaveChanges()}
                >
                  Guardar Cambios
                </button>
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
