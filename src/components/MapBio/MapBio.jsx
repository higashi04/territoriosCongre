import React, { useState, useEffect } from "react";
import ReactMapGl from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./MapBio.css";

import MapLines from "../MapLines/MapLines";
import MarkerBrandedHouses from "../MarkerBrandedHouses/MarkerBrandedHouses";
import MarkerBlockNumber from "../MarkerBlockNumber/MarkerBlockNumber";
import ModalMapOptions from "../ModalMapOptions/ModalMapOptions";

import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MapBio = ({ lines, horario, lng, lat, brandedHouses, blocks, parentTerritory, onBrandedEdit, territoryId, onBrandedSave, onCornerSelection, onBlockSave}) => {
  const [zoom, setZoom] = useState(18);
  const [coordinates, setCoordinates] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [map, setMap] = useState(null);
  const [showMarkerClick, setShowMarkerClick] = useState(false);
  const [lngValue, setLngValue] = useState(lng);
  const [latValue, setLatValue] = useState(lat);

  useEffect(() => {
    setLatValue(lat);
    setLngValue(lng);
  }, [lng, lat])

  useEffect( () => {
    if(map) {
      map.flyTo({center: [lngValue, latValue]})
    }
  }, [map, lngValue, latValue])

  const handleMapClick = (event) => {
    if(!showMarkerClick){
      
    const { lngLat } = event;
    setCoordinates(lngLat);
    setShowModal(true);
    }
  };

  

  const handleMarkerClick = (bool) => setShowMarkerClick(bool);

  return (
    <>
      <div id="mapHolder">
        <ReactMapGl
          ref={el => setMap(el)}
          zoom={zoom}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          width="100%"
          height="100%"
          transitionDuration="500"
          mapStyle={process.env.REACT_APP_MAP_STYLE}
          onClick={handleMapClick}
          interactive={true}
          dragPan={true}
          dragRotate={true}
          touchZoom={true}
          scrollZoom={{ speed: 1 }}
          touchRotate={true}
        >
          {lines.map(line => <MapLines key={line.id} {...line} />)}

          {brandedHouses.length > 0 &&
            brandedHouses.map((branded) => (
              <MarkerBrandedHouses
                key={branded._id}
                lng={branded.lng}
                lat={branded.lat}
                parentTerritory={parentTerritory}
                onBrandedEdit={onBrandedEdit}
                id={branded._id}
                branded={branded}
                onMarkerClick={event => handleMarkerClick(event)}
              />
            ))}

            {blocks.length > 0 &&
              blocks.map((block) => (
                <MarkerBlockNumber 
                  key={block._id}
                  block={block}
                  onBlockSave={onBlockSave}
                  parentTerritoryId={parentTerritory}
                  onMarkerClick={event => handleMarkerClick(event)}
                />
              ))}
        </ReactMapGl>
      </div>
      <div className="row mt-3 me-5">
        <div id="mapBio_zoom" className="input-group">
          <label className="labelBox">Zoom {zoom}</label>
          <input
            type="range"
            className="form-range"
            min={1}
            max={22}
            step={1}
            onChange={(e) => {
              setZoom(parseInt(e.target.value));
            }}
            defaultValue={zoom}
          />
        </div>
      </div>

      {showModal && territoryId.length !== 0 && (
        <ModalMapOptions 
        coordinates={coordinates}
        showModal={showModal}
        territoryId= {territoryId}
        onModalClose={e => setShowModal(e)} 
        onBrandedSave={onBrandedSave}
        onBlockSave={onBlockSave}
        onCornerSelection={(corner, coordinates) => onCornerSelection(corner, coordinates)}
        />
      )}
    </>
  );
};

export default MapBio;
