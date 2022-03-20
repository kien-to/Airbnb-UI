import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// import { getCenter } from 'geolib';
import "mapbox-gl/dist/mapbox-gl.css";
import * as geolib from 'geolib';
import { Result } from 'postcss';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map(res => ({
      latitude: res.lat,
      longitude: res.long,
  }));

  const center = geolib.getCenter(coordinates);

  const [viewport, setViewport] = useState({
      width: '100%',
      height: '100%',
      latitude: center.latitude,
      longtitude: center.longtitude,
      zoom:11
  });

  return (
    <ReactMapGL
        mapStyle="mapbox://styles/kien-to/cl0yblf2i000e14r78ttk52t4"
        mapboxAccessToken={process.env.mapbox_key}
        initialViewState={{...viewport}}
        onMove={evt => setViewport(evt.viewport)}
    >
        {searchResults.map(result => (
            <div>
                <Marker
                    key={result.long}
                    longitude={result.long}
                    latitude={result.lat}
                >
                    <LocationMarkerIcon 
                        role="img"
                        aria-label="push-pin"
                        onClick={() => setSelectedLocation(result)}
                        className='text-red-300 cursor-pointer h-8 animate-bounce'
                    />
                </Marker>

                {/* The popup that should show if we click on a Marker */}
                {selectedLocation.long === result.long ? (
                    <Popup
                        onClose={() => setSelectedLocation({})}
                        closeOnClick = {true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ):(false)}
            </div>
            )
        )}
    </ReactMapGL>
  )
  
}

export default Map