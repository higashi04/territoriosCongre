import React, { useState } from "react";

const OptionsAddingMarkers = ({lat, lng, parentTerritory, onBrandedSave}) => {
//   const [latitude, setLatitude] = useState(0);
//   const [longtitude, setLongitude] = useState(0);
  const [option, setOption] = useState(0);
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");

  const handleCoordinateInput = () => {
    // console.log(coordinates)
    // const parts = coordinates.split(",");
    // const lat = parts[1];
    // const lng = parts[0];

    // setLatitude(coordinates.lat);
    // setLongitude(coordinates.lng);
  };

  const handleBrandedCreation = async () => {
    try {
      const data = {
        lat, //: latitude,
        lng,//: longtitude,
        comments,
        address,
        territory: parentTerritory,
      };
      console.log(data);
      const request = await fetch(
        process.env.REACT_APP_API_SERVER + "territorios/createMarked",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (request.ok) {
        const response = await request.json();
        onBrandedSave(response);
      } else {
        throw request;
      }
    } catch (error) {
      const err = await error.json();
      console.error(err);
    }
  };

  const makeHttpCall = async() => {
    handleCoordinateInput();
    setTimeout(async() => {
        
    switch (option) {
        case 1:
            await handleBrandedCreation();
            break;
    
        default:
            break;
    }
    }, 1000);
  }
  return (
    <div className="container">
      <h3>¿Qué desea hacer?</h3>
      <div className="row">
        <div className="form-check ">
          <input
            type="radio"
            name="option"
            className="form-check-input"
            onClick={() => setOption(1)}
          />
          <label>Agregar una casa en la que no hay que tocar.</label>
        </div>
      </div>
      <div className="row">
        <div className="form-check">
          <input
            type="radio"
            name="option"
            className="form-check-input"
            onClick={() => setOption(2)}
          />
          <label>Agregar un contador de manzanas del territorio</label>
        </div>
      </div>
      {option === 1 ? (
        <>
          <div className="row">
            <div className="input-group">
              <label htmlFor="address" className="input-group-text">
                Dirección
              </label>
              <input
                className="form-control"
                type="text"
                name="address"
                onInput={(event) => setAddress(event.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <label htmlFor="address" className="input-group-text">
                Comentarios adicionales
              </label>
              <input
                className="form-control"
                type="text"
                name="comments"
                onInput={(event) => setComments(event.target.value)}
              />
            </div>
          </div>
        </>
      ) : option === 2 ? (
        "este todavía no queda listo"
      ) : (
        ""
      )}
      <div className="row">
        <button className="btn btn-outline-primary" disabled={option === 0} onClick={makeHttpCall}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default OptionsAddingMarkers;
