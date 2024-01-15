import React from "react";
import { Marker } from "react-map-gl";

import { TbMapPinOff } from "react-icons/tb";

import ModalEditBrandedHouses from "../ModalEditBrandedHouses/ModalEditBrandedHouses";

const MarkerBrandedHouses = ({
  lat,
  lng,
  parentTerritory,
  onBrandedEdit,
  id,
}) => {
  return (
    <Marker latitude={parseFloat(lat)} longitude={parseFloat(lng)}>
      <ModalEditBrandedHouses
        btnText={<TbMapPinOff className="marker-doNotKnock" />}
        parentTerritory={parentTerritory}
        onBrandedEdit={onBrandedEdit}
        id={id}
      />
    </Marker>
  );
};

export default MarkerBrandedHouses;
