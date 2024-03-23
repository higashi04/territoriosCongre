import React, { useEffect, useState } from "react";
import { Marker } from "react-map-gl";

import "./MarkerBlockNumber.css";
import { RiMapPin3Line } from "react-icons/ri";
import ModalEditBlockNumber from "../ModalEditBlockNumber/ModalEditBlockNumber";

const MarkerBlockNumber = ({ block, onMarkerClick, parentTerritoryId, onBlockSave }) => {
  const [worked, setWorked] = useState(false);

  useEffect(() => {
    setWorked(block.worked);
  }, [block, worked]);

  return (
    <div>
      <Marker
        latitude={parseFloat(block.lat)}
        longitude={parseFloat(block.lng)}
      >
        <ModalEditBlockNumber
          block={block}
          ClickedMarker={(event) => onMarkerClick(event)}
          parentTerritoryId={parentTerritoryId}
          onBlockSave={onBlockSave}
          btnText={
            <>
              <span
                className={`blockName ${
                  worked ? "blockWorked" : "blockNotWorked"
                }`}
              >
                {block.name}
                <br />
                <RiMapPin3Line />
              </span>
            </>
          }
        />
      </Marker>
    </div>
  );
};

export default MarkerBlockNumber;
