import React, { useState,useRef,useEffect } from "react";
import { GoogleMap, LoadScript, Marker ,Autocomplete } from "@react-google-maps/api";

const Map = ({getLocation,showLocation,lat,lng}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [mapCenter, setMapCenter] = useState({
    lat: lat,
    lng: lng,
  });

  const mapContainerStyle = {
    width: "auto",
    height: "400px",
  };
  const autocompleteRef = useRef(null);

  const onPlaceSelected = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const location = new window.google.maps.LatLng(lat, lng);
    setSelectedLocation(location);
    setMapCenter({ lat, lng });
    reverseGeocode(lat, lng);
  };

  const onSelect = (location) => {
    console.log("location from map", location.lat)
    getLocation(location); 
    setSelectedLocation(location);
    reverseGeocode(location.lat(), location.lng()); 
  };

   const reverseGeocode = async (lat, lng) => {
    console.log("reverseGeocode")

    const geocoder = new window.google.maps.Geocoder();
    try {
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            setSelectedAddress(address);
          } else {
            reject("Geocode was not successful for the following reason: " + status);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
   
  
  const handleLocationSelection = () => {
    if (selectedLocation) {
      return selectedLocation;
    } else {
      return null;
    }
  };
  
  const renderMap = () => (
    <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
        onClick={(e) => onSelect(e.latLng)}
        onCenterChanged={() => setMapCenter(mapCenter)}
      >
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: 'white', padding: '5px', borderRadius: '4px' }}>
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
              onPlaceSelected(autocompleteRef.current.getPlace());
              onSelect(selectedLocation)
            }}
          >
            <input
              type="text"
              placeholder="Search for a location"
              style={{ width: '300px' }}
            />
          </Autocomplete>
        </div>
        {selectedLocation && (
          <Marker
            position={selectedLocation}
            onClick={() => onSelect(selectedLocation)}
          />
        )}
      </GoogleMap>
  );

  
  useEffect(() => {
    if (selectedLocation) {
      onSelect(selectedLocation);
    }
  }, [selectedLocation]);

  console.log("showLocation", showLocation);

  useEffect(() => {
    // Check if the map has been loaded
    if (!mapLoaded) {
      setMapLoaded(true); // Mark the map as loaded
    }
  }, [mapLoaded]);
  return (
    // <div>
    //   {showLocation && window.google === undefined ? 
    //   (<LoadScript googleMapsApiKey="AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4"  libraries={["places"]} 
    //  onLoad={() => console.log("Loaded")}
    //  onError={(error) => console.error("Error:", error)}>{renderMap()}</LoadScript>) : showLocation ? (renderMap()
    //   )
    //   : null}
    // </div>)

    <div>
      {/* {!mapLoaded && (
        <LoadScript
          googleMapsApiKey="AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4" // Replace with your API key
          libraries={['places']}
          onLoad={() => {
            console.log('Google Maps API loaded.');
          }}
          onError={(error) => console.error('Error:', error)}
        >
          {renderMap()}
        </LoadScript>
      )} */}

      {showLocation && mapLoaded && renderMap()}
    </div>



    // window.google === undefined ?
    //  <LoadScript
    //   googleMapsApiKey="AIzaSyARCLd9vG36eaSnJ3TLywJRObxzuFgeBu4"
    //   libraries={['places']}
    //   onLoad={() => {
    //     // The Google Maps API is fully loaded here, and the 'google' object is accessible.
    //     console.log('Google Maps API loaded.');
    //   }}
    //   onError={(error) => console.error('Error:', error)}
    //   >

    //   <GoogleMap
    //     mapContainerStyle={mapContainerStyle}
    //     center={mapCenter}
    //     zoom={15}
    //     onClick={(e) => onSelect(e.latLng)}
    //     onCenterChanged={() => setMapCenter(mapCenter)}
    //   >
    //     <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: 'white', padding: '5px', borderRadius: '4px' }}>
    //       <Autocomplete
    //         onLoad={(autocomplete) => {
    //           autocompleteRef.current = autocomplete;
    //         }}
    //         onPlaceChanged={() => {
    //           onPlaceSelected(autocompleteRef.current.getPlace());
    //         }}
    //       >
    //         <input
    //           type="text"
    //           placeholder="Search for a location"
    //           style={{ width: '300px' }}
    //         />
    //       </Autocomplete>
    //     </div>
    //     {selectedLocation && (
    //       <Marker
    //         position={selectedLocation}
    //         onClick={() => onSelect(selectedLocation)}
    //       />
    //     )}
    //   </GoogleMap>
    //   {selectedAddress && (
    //   <div>
    //     <p>Selected Address: {selectedAddress}</p>
    //   </div>
    //   )};

    // </LoadScript> :
    // renderMap()

)};

export default Map;
