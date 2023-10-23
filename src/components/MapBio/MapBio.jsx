import React, { useState } from 'react'
import ReactMapGl, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapBio.css'

const MapBio = ({markers}) => {
    // const [viewPort, setViewPort] = useState({
    //     latitude: 27.471723410653517,
    //     longitude: -99.49815204023983,
    //     zoom: 13
    // })
    const [latitude, setLatitude] = useState(27.471723410653517);
    const [longitude, setLongtitude] = useState(-99.49815204023983);
    const [zoom, setZoom] = useState(13);

    const handleMapMove = (viewPort) => {
      setLatitude(viewPort.latitude)
      setLongtitude(viewPort.longitude)
    }


  return (
    <>
    <div id='mapHolder'>
      <ReactMapGl
        // {...viewPort}
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
        {markers && markers.map((marker, index) => (
          marker &&
          <Marker
            key={index}
            latitude = {marker.lat}
            longitude = {marker.lng} 
          >
            <div className='marker'>
              {marker.title} hola
            </div>
          </Marker>
        ))}
      </ReactMapGl>
    </div>
    <div className="row mt-3 me-5">
      <div id='mapBio_zoom' className="input-group">
        <span className="form-label">Zoom {zoom}</span>
        <input type="range" 
          className='form-range' 
          min={1} max={15} step={1}
          onChange={(e) => {setZoom(parseInt(e.target.value))}}
          defaultValue={zoom}
        />
      </div>
    </div>
    </>
  )
}

export default MapBio
