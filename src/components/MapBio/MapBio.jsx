import React, { useEffect, useState } from 'react'
import ReactMapGl from 'react-map-gl';
import { PiMapPinLineBold } from "react-icons/pi";
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapBio.css'

import MapLines from '../MapLines/MapLines';

const MapBio = ({markers, lng, lat}) => {
    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongtitude] = useState(lng);
    const [zoom, setZoom] = useState(18);


    useEffect(() => {
      setLatitude(lat)
      setLongtitude(lng)
    }, [lat, lng])

    const handleMapMove = (viewPort) => {
      setLatitude(viewPort.latitude)
      setLongtitude(viewPort.longitude)
    }
  
    
  return (
    <>
    <div id='mapHolder'>
      <ReactMapGl
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        mapboxAccessToken= {process.env.REACT_APP_MAPBOX_KEY}
        width="100%"
        height="100%"
        transitionDuration='200'
        mapStyle={process.env.REACT_APP_MAP_STYLE}
        interactive={true}
        onMove={evt => handleMapMove(evt.viewState)}
      >
        
        <MapLines markerOne={markers[0]} markerTwo={markers[1]} />
        <MapLines markerOne={markers[1]} markerTwo={markers[3]} />
        <MapLines markerOne={markers[0]} markerTwo={markers[2]} />
        <MapLines markerOne={markers[2]} markerTwo={markers[3]} />

      </ReactMapGl>
    </div>
    <div className="row mt-3 me-5">
      <div id='mapBio_zoom' className="input-group">
        <span className="form-label">Zoom {zoom}</span>
        <input type="range" 
          className='form-range' 
          min={1} max={25} step={1}
          onChange={(e) => {setZoom(parseInt(e.target.value))}}
          defaultValue={zoom}
        />
      </div>
    </div>
    </>
  )
}

export default MapBio
