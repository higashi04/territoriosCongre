import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MapBio from "../../components/MapBio/MapBio";
import Geocode from "../../components/Geocoding/Geocoding";
import ModalSearchTerritorios from "../../components/ModalSearchTerritorios/ModalSearchTerritorios";
import ModalAddBrandedHouses from "../../components/ModalAddBrandedHouses/ModalAddBrandedHouses";

import "./Territorios.css";

const Territorios = () => {
  const [territorioName, setTerritorioName] = useState("nombre de territorio");
  const [coordinatesA, setCoordinatesA] = useState({ lng: 0, lat: 0 });
  const [coordinatesB, setCoordinatesB] = useState({ lng: 0, lat: 0 });
  const [coordinatesC, setCoordinatesC] = useState({ lng: 0, lat: 0 });
  const [coordinatesD, setCoordinatesD] = useState({ lng: 0, lat: 0 });
  const [centerLat, setCenterLat] = useState(0);
  const [centerLng, setCenterLng] = useState(0);
  const [editable, setEditable] = useState(true);
  const [territoryId, setTerritoryId] = useState("");
  const [brandedHouses, setBrandedHouses] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    try {
      if (
        coordinatesA.lng !== 0 &&
        coordinatesB.lng !== 0 &&
        coordinatesC.lng !== 0 &&
        coordinatesD.lng !== 0
      ) {
        const lngSum =
          coordinatesA.lng +
          coordinatesB.lng +
          coordinatesC.lng +
          coordinatesD.lng;
        const latSum =
          coordinatesA.lat +
          coordinatesB.lat +
          coordinatesC.lat +
          coordinatesD.lat;

        const centeredLng = lngSum / 4;
        const centeredLat = latSum / 4;

        setCenterLat(centeredLat);
        setCenterLng(centeredLng);
      }
    } catch (error) {
      console.error(error);
    }
  }, [coordinatesA, coordinatesB, coordinatesC, coordinatesD]);

  const handleCoordinatesChange = (inputName, newCoordinates) => {
    // Update the respective coordinate state variable
    try {
      switch (inputName) {
        case "A":
          setCoordinatesA(newCoordinates);
          break;
        case "B":
          setCoordinatesB(newCoordinates);
          break;
        case "C":
          setCoordinatesC(newCoordinates);
          break;
        case "D":
          setCoordinatesD(newCoordinates);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    const data = {
      nombre: territorioName,
      esquinaLatitudA: coordinatesA.lat,
      esquinaLatitudB: coordinatesB.lat,
      esquinaLatitudC: coordinatesC.lat,
      esquinaLatitudD: coordinatesD.lat,
      esquinaLongitudA: coordinatesA.lng,
      esquinaLongitudB: coordinatesB.lng,
      esquinaLongitudC: coordinatesC.lng,
      esquinaLongitudD: coordinatesD.lng,
      congregacion: user.congregacion,
    };
    await fetch(process.env.REACT_APP_API_SERVER + "territorios/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("ok");
        } else {
          throw res;
        }
      })
      .catch(async (err) => {
        const error = await err.json();
        console.error(error);
      });
  };

  const handleCleanForm = () => {
    setEditable(true);
    setCoordinatesA({ lng: 0, lat: 0 });
    setCoordinatesB({ lng: 0, lat: 0 });
    setCoordinatesC({ lng: 0, lat: 0 });
    setCoordinatesD({ lng: 0, lat: 0 });
    setTerritorioName("");
    setTerritoryId("");
    setBrandedHouses([]);
    setCenterLat(0);
    setCenterLng(0);
  };

  const handleTerritorySelection = (chosenTerritory) => {
    // console.log(chosenTerritory)
    try {
      setCoordinatesA({
        lat: chosenTerritory.esquinaLatitudA,
        lng: chosenTerritory.esquinaLongitudA,
        title: "A",
      });
      setCoordinatesB({
        lat: chosenTerritory.esquinaLatitudB,
        lng: chosenTerritory.esquinaLongitudB,
        title: "B",
      });
      setCoordinatesC({
        lat: chosenTerritory.esquinaLatitudC,
        lng: chosenTerritory.esquinaLongitudC,
        title: "C",
      });
      setCoordinatesD({
        lat: chosenTerritory.esquinaLatitudD,
        lng: chosenTerritory.esquinaLongitudD,
        title: "D",
      });

      setTerritorioName(chosenTerritory.nombre);
      setTerritoryId(chosenTerritory._id);
      setBrandedHouses(chosenTerritory.marcados);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="territorioBody">
      <div className="row my-5">
        <div className="col-8">
          <h3> {`Territorio ${territorioName}`}</h3>
          <ModalSearchTerritorios
            onTerritorySelection={(chosenTerritory) => {
              handleTerritorySelection(chosenTerritory);
            }}
          />
          {(territoryId !== "" && user.canWrite)&& (
            <ModalAddBrandedHouses
              parentTerritory={territoryId}
              onBrandedSave={(territory) => handleTerritorySelection(territory)}
            />
          )}
        </div>
        <div className="col-4">
          {user.isAdmin || user.canWrite ? (
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
          markers={[coordinatesA, coordinatesB, coordinatesC, coordinatesD]}
          lng={centerLng}
          lat={centerLat}
          brandedHouses={brandedHouses}
          parentTerritory={territoryId}
          onBrandedEdit={(territory) => handleTerritorySelection(territory)}
        />
      </div>
      <div className="row mb-3">
        <div className="input-group">
          <label className="input-group-text">Territorio:</label>
          <input
            type="text"
            className="form-control"
            value={territorioName}
            disabled={editable}
            onChange={(e) => setTerritorioName(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6"></div>
      </div>
      {user.canWrite && editable && (
        <>
          <div className="row mb-5 me-5">
            <div className="col-sm-12 territorioGeocode">
              <Geocode
                inputName="A"
                editable={editable}
                onCoordinatesChange={(newCoordinates) => {
                  handleCoordinatesChange("A", newCoordinates);
                }}
              />
              <Geocode
                inputName="B"
                editable={editable}
                onCoordinatesChange={(newCoordinates) => {
                  handleCoordinatesChange("B", newCoordinates);
                }}
              />
            </div>
            <div className="col-sm-12 territorioGeocode">
              <Geocode
                inputName="C"
                editable={editable}
                onCoordinatesChange={(newCoordinates) => {
                  handleCoordinatesChange("C", newCoordinates);
                }}
              />
              <Geocode
                inputName="D"
                editable={editable}
                onCoordinatesChange={(newCoordinates) => {
                  handleCoordinatesChange("D", newCoordinates);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Territorios;
