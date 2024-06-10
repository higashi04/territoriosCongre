import React from "react";

const OptionsNewTerritory = ({ coordinates, onCornerSelection, setShow }) => {
  const handleBtnClick = (letter) => {
    //console.log(coordinates)
    onCornerSelection(letter, coordinates);
  };

  return (
    <div>
      <div className="row">
        <button
          className="btn btn-dark my-2"
          onClick={() => handleBtnClick("A")}
        >
          Inicio
        </button>
        <button
          className="btn btn-dark my-2"
          onClick={() => handleBtnClick("B")}
        >
          Fin
        </button>
      </div>
    </div>
  );
};

export default OptionsNewTerritory;
