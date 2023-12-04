import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import MapBio from '../../components/MapBio/MapBio';
import Geocode from '../../components/Geocoding/Geocoding';
import ModalSearchTerritorios from '../../components/ModalSearchTerritorios/ModalSearchTerritorios';

import './Territorios.css';

const Territorios = () => {

    const [territorioName, setTerritorioName] = useState("nombre de territorio");
    const [coordinatesA, setCoordinatesA] = useState(null);
    const [coordinatesB, setCoordinatesB] = useState(null);
    const [coordinatesC, setCoordinatesC] = useState(null);
    const [coordinatesD, setCoordinatesD] = useState(null);
    const [centerLat, setCenterLat] = useState(0);
    const [centerLng, setCenterLng] = useState(0);
    const [editable, setEditable] = useState(true);

    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
  
    useEffect(() => {
      if(user === null) {
        navigate("/")
      }
    }, [user, navigate])

    const handleCoordinatesChange = (inputName, newCoordinates) => {
      // Update the respective coordinate state variable
      switch (inputName) {
        case 'A':
          setCoordinatesA(newCoordinates);
          break;
        case 'B':
          setCoordinatesB(newCoordinates);
          break;
        case 'C':
          setCoordinatesC(newCoordinates);
          break;
        case 'D':
          setCoordinatesD(newCoordinates);
          break;
        default:
          break;
      }
    };

    const handleCenter = () => {
      if(coordinatesA && coordinatesB && coordinatesC && coordinatesD) {
        const lngSum = coordinatesA.lng + coordinatesB.lng + coordinatesC.lng + coordinatesD.lng;
        const latSum = coordinatesA.lat + coordinatesB.lat + coordinatesC.lat + coordinatesD.lat;
        
        const centerLng = lngSum / 4;
        const centerLat = latSum / 4;

        console.log(centerLng)
        console.log(centerLat)

        setCenterLat(centerLat)
        setCenterLng(centerLng)
        // return {
        //   lng: centerLng,
        //   lat: centerLat
        // }

      }
    }


    const handleSaveChanges = async() => {
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
        congregacion: "65469cf0df48930f2ed9552b"
      }
      await fetch(process.env.REACT_APP_API_SERVER + "territorios/create", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(
        res => {
          if(res.ok) {
            alert("ok")
          } else {
            throw res
          }
        }
      ).catch(async err => {
        const error = await err.json()
        console.error(error)
      })
    }

    const handleCleanForm = () => {
      setEditable(true)
      setCoordinatesA(null)
      setCoordinatesB(null)
      setCoordinatesC(null)
      setCoordinatesD(null)
      setTerritorioName("")
    }

    const handleTerritorySelection = (chosenTerritory) => {
      setCoordinatesA(
        {
          lat: chosenTerritory.esquinaLatitudA, 
          lng: chosenTerritory.esquinaLongitudA,
          title: "A"
        }
      );
      setCoordinatesB({
        lat: chosenTerritory.esquinaLatitudB,
        lng: chosenTerritory.esquinaLongitudB,
        title: "B"
      });
      setCoordinatesC({
        lat: chosenTerritory.esquinaLatitudC,
        lng: chosenTerritory.esquinaLongitudC,
        title: "C"
      })
      setCoordinatesD({
        lat: chosenTerritory.esquinaLatitudD,
        lng: chosenTerritory.esquinaLongitudD,
        title: "D"
      });

      handleCenter()
      setTerritorioName(chosenTerritory.nombre)
    }

  return (
    <div id='territorioBody'>

        <div className="row my-5">
          <div className="col-8">
            <h3> {`Territorio ${territorioName}`}</h3>
            <ModalSearchTerritorios  
              onTerritorySelection={
                (chosenTerritory) => {
                  handleTerritorySelection(chosenTerritory)
                }
              } 
              />
            </div>
          <div className="col-4">
            <button className='btn btn-success btnTerritorio mx-2 mb-2' onClick={
              () => {
                setEditable(false)
            }}>Crear</button>
            <button className='btn btn-secondary mx-2 mb-2' disabled={editable} onClick={() => handleCleanForm()}>Cancelar</button>
            <button className='btn btn-dark mx-2 mb-2' disabled>Editar</button>
            <button className='btn btn-danger mx-2 mb-2' disabled>Eliminar</button>
            {!editable && <button className='btn btn-primary mx-2 mb-2' onClick={() => handleSaveChanges()}>Guardar Cambios</button>}
          </div>
        </div>
        <div id="territorioMap" className='mb-3'>
          <MapBio
            markers={[coordinatesA, coordinatesB, coordinatesC, coordinatesD]}
            lng={centerLng}
            lat={centerLat}
          />
        </div>
        <div className="row mb-3">
          <div className="input-group">
            <label className='input-group-text'>Territorio:</label>
            <input type="text" className='form-control' value={territorioName} disabled={editable} onChange={(e) => setTerritorioName(e.target.value)} />
          </div>
        </div>
        <div className="row mb-5 me-5">
          <div className="col-sm-12 territorioGeocode">
            <Geocode 
              inputName = "A"
              editable={editable}
            onCoordinatesChange={(newCoordinates) => {
              handleCoordinatesChange('A', newCoordinates)
            }}
            />
            <Geocode 
              inputName = "B"
              editable={editable}
            onCoordinatesChange={(newCoordinates) => {
              handleCoordinatesChange('B', newCoordinates)
            }}
            />
          </div>
          <div className="col-sm-12 territorioGeocode">
            <Geocode 
              inputName = "C"
              editable={editable}
            onCoordinatesChange={(newCoordinates) => {
              handleCoordinatesChange('C', newCoordinates)
            }}
            />
            <Geocode 
              inputName = "D"
              editable={editable}
            onCoordinatesChange={(newCoordinates) => {
              handleCoordinatesChange("D", newCoordinates)
            }}
            />
          </div>
          {/* <div>
        <h2>Coordinates</h2>
        <div>
          Input A: {coordinatesA ? `Latitude: ${coordinatesA.lat}, Longitude: ${coordinatesA.lng}` : 'No coordinates'}
        </div>
        <div>
          Input B: {coordinatesB ? `Latitude: ${coordinatesB.lat}, Longitude: ${coordinatesB.lng}` : 'No coordinates'}
        </div>
        <div>
          Input C: {coordinatesC ? `Latitude: ${coordinatesC.lat}, Longitude: ${coordinatesC.lng}` : 'No coordinates'}
        </div>
        <div>
          Input D: {coordinatesD ? `Latitude: ${coordinatesD.lat}, Longitude: ${coordinatesD.lng}` : 'No coordinates'}
        </div>
        <div>
        width: {window.innerWidth}, height: {window.innerHeight}
        </div>
      </div> */}

        </div>
    </div>
  )
}

export default Territorios
