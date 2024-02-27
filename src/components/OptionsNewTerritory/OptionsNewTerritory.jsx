import React from 'react'

const OptionsNewTerritory = ({coordinates, onCornerSelection}) => {

    const handleBtnClick =(letter) => {
       onCornerSelection(letter, coordinates)
    }

  return (
    <div>
      <div className="row">
        <button className="btn btn-dark my-2" onClick={() => handleBtnClick("A")}>Esquina A</button>
        <button className="btn btn-dark my-2" onClick={() => handleBtnClick("B")}>Esquina B</button>
        <button className="btn btn-dark my-2" onClick={() => handleBtnClick("C")}>Esquina C</button>
        <button className="btn btn-dark my-2" onClick={() => handleBtnClick("D")}>Esquina D</button>
      </div>
    </div>
  )
}

export default OptionsNewTerritory
