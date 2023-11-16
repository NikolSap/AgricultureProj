import React,{useState,useEffect,useRef} from 'react';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import locationMarker from '../assets/images/map-marker.png';

const MapWithMarker = ({lat,lng}) => {
   const [address,setAddress]= useState('');

  useEffect(() => {
    getAddressFromLatLng(lat, lng);
  }, [lat, lng]);

  function getAddressFromLatLng(lat, lng) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          console.log('Address:', address);
          setAddress(address);
        } else {
          console.error('No address found for the given coordinates.');
        }
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  }

  return (
    // <LoadScript googleMapsApiKey="AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4" libraries={["places"]}   
    // onError={(error) => console.error("Error:", error)}>


    //https://www.google.com/maps/embed/v1/place?key=AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4&amp;q=Eiffel+Tower+Paris+France
    //https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4}
    <div className="map-responsive">
    <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4&q=${address}`}
      width="600"
      height="330"
      style={{border: 0, width: '100%' }}
      allowFullScreen=""
      title="map"
    ></iframe>    
    </div>
    /* <GoogleMap
        key={`${lat}-${lng}`}
        mapContainerStyle={mapContainerStyle}
        center={location}
        zoom={15}
  >
    <Marker position={location} />
  </GoogleMap> */

    


      //</LoadScript> 
  );
};

export default MapWithMarker;
