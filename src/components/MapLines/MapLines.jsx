import React from 'react';
import { Source, Layer} from 'react-map-gl';

const MapLines = ({markerOne, markerTwo}) => {

    const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [markerOne === null ? 0 : markerOne.lng, markerOne === null ? 0 : markerOne.lat],
            [markerTwo === null ? 0 : markerTwo.lng, markerTwo === null ? 0 : markerTwo.lat]
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
        "line-color": "rgba(3, 170, 238, 0.5)",
        "line-width": 5
      }}
    />
  </Source>
  )
}

export default MapLines
