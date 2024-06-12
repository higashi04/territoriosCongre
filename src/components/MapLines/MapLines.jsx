import React, { useState, useEffect } from 'react';
import { Source, Layer} from 'react-map-gl';

const MapLines = ({latOne, latTwo, lngOne, lngTwo, horario}) => {
  const [lineColor, setLineColor] = useState("rgba(3, 170, 238, 0.5)");

  useEffect(() => {
    if(horario) {
      setLineColor(horario.rgba)
    } else {
      setLineColor("rgba(3, 170, 238, 0.5)");
    }
  }, [horario])

    const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [lngOne === null ? 0 : lngOne, latOne === null ? 0 : latOne],
            [lngTwo === null ? 0 : lngTwo, latTwo === null ? 0 : latTwo]
          ]
        }
      };

  return (

    <Source  type='geojson' data={dataOne}>
    <Layer 
    //   id='lineLayer' 
      type='line'
      source="my-data"
      layout={{
        "line-join": "round",
        "line-cap": "round"
      }}
      paint={{
        "line-color": lineColor,
        "line-width": 5,
        "line-dasharray": [2, 2] 
      }}
    />
  </Source>
  )
}

export default MapLines
