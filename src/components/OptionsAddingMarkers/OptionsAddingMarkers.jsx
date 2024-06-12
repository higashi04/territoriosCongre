import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/err/alertSlice";

const OptionsAddingMarkers = ({lat, lng, parentTerritory, onBrandedSave, onBlockSave}) => {
  const [option, setOption] = useState(0);
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");
  const [blockNumber, setBlockNumber] = useState("");

  
  const dispatch = useDispatch();


  const handleBrandedCreation = async () => {
    try {
      const data = {
        lat, //: latitude,
        lng,//: longtitude,
        comments,
        address,
        territory: parentTerritory,
      };
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
      try {
        const err = await error.json();
        console.error(err)
        dispatch(showAlert({message: err.message, type: "error"}));
      } catch (errorTwo) {
        dispatch(showAlert({message: error.message, type: "error"}));
        console.error(errorTwo);
      }
    }
  };

  const handleBlockNumberRegister = async() => {
    try {
      const data = {
        lat,
        lng,
        name: blockNumber,
        territory: parentTerritory,
      }
      const request = await fetch(
        process.env.REACT_APP_API_SERVER + "territorios/addBlock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (request.ok) {
        const response = await request.json();
       onBlockSave(response);
      } else {
        throw request;
      }
    } catch (error) {
      const err = await error.json();
      console.error(err);
    }
  }

  const makeHttpCall = async() => {
    setTimeout(async() => {
    switch (option) {
        case 1:
            await handleBrandedCreation();
            break;
        case 2:
            await handleBlockNumberRegister();
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
        <>
        <div className="row">
          <div className="input-group">
            <label htmlFor="blockNumberInput" className="input-group-text">Número de Manzana</label>
            <input type="text" className="form-control" value={blockNumber} onInput={(event) => setBlockNumber(event.target.value)} />
          </div>
        </div>
        </>
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
