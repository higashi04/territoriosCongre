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
  onMarkerClick,
  branded
}) => {
  return (
    <Marker latitude={parseFloat(lat)} longitude={parseFloat(lng)}>
      <ModalEditBrandedHouses
        btnText={<TbMapPinOff className="marker-doNotKnock" />}
        parentTerritory={parentTerritory}
        onBrandedEdit={onBrandedEdit}
        id={id}
        address={branded.address}
        comments={branded.comments}
        ClickedMarker={event => onMarkerClick(event)}
      />
    </Marker>
  );
};

export default MarkerBrandedHouses;
