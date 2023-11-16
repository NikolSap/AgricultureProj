import React from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapWithMarker = ({lat,lng}) => {
    console.log("at marker", lat," ",lng)
  const location = { lat: lat, lng: lng }; 

  const mapContainerStyle = {
    width: "50%",
    height: "100px",
  };

  return (
     <LoadScript googleMapsApiKey="AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={15} // Adjust the zoom level as needed
      >
        <Marker
          position={location}
        />
      </GoogleMap>
       </LoadScript>
  );
};

export default MapWithMarker;
