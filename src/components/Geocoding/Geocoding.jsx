import React, { useState } from "react";
import "./Geocoding.css";

const Geocode = ({ inputName, onCoordinatesChange, editable }) => {
  const [address, setAdress] = useState({ lat: 0, lng: 0, title: inputName });
  //const [coordinates, setCoordinates] = useState(null);

  // const handleGeocode = async() => {
  //     try {
  //         const response = await fetch(
  //             `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  //       address + ', Nuevo Laredo'
  //     )}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`
  //         )
  //         const data = await response.json();
  //         const firstFeature = data.features[0];

  //         if(firstFeature) {
  //             const [lng, lat] = firstFeature.center;
  //             const title = inputName;
  //             //setCoordinates({lat, lng})
  //             // Send coordinates to the parent component
  //             onCoordinatesChange({ lat, lng, title });
  //         }

  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  const handleCoordinateInput = () => {
    try {
      const parts = address.split(",");
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      const title = inputName;

      console.log(typeof(lat))
      console.log(typeof(parts[1]))

      onCoordinatesChange({ lat, lng, title });
    } catch (error) {
        console.error(error)
    }
  };
  return (
    <>
      <div className="geoCodingDiv input-group">
        <span className="input-group-text geoCodingSpan">
          Esquina {inputName}
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese una esquina"
          value={address}
          onChange={(e) => setAdress(e.target.value)}
          disabled={editable}
        />
        <button
          className="btn btn-dark geoCodingBtn"
          onClick={handleCoordinateInput}
          disabled={editable}
        >
          {" "}
          Calcular {inputName}{" "}
        </button>
      </div>
    </>
  );
};

export default Geocode;
