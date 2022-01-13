import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  
  const { center, zoom } = props;

  // const beaches = [{ lat: 36.5419274, lng: 10.8415317 },{ lat: 36.889947, lng: 10.319128 },{lat : 37.2813941,lng:9.8659659},{lat : 35.7641473,lng:10.7827762},{lat : 33.4538645,lng:9.0268982}];

  const myMap = async ()=> {
    const map =await  new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });

    for (let i = 0; i < props.cords.length; i++) {
      new window.google.maps.Marker({ position: props.cords[i], map: map,icon:__dirname + "./photos/search/marker.png" });
    }
  }

  useEffect(() => {


    myMap()
   
  }, [center, zoom]);  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
