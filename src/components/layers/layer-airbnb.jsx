import React, { useState, useEffect, useRef } from "react";
import { Popup, GeoJSON } from "react-leaflet";
import Slider from "react-slick";
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function LayerAirbnb({ item, mapRef, routingControlRef }) {
  // const routingControlRef = useRef(null);
  const [startPoint, setStartPoint] = useState(null); // Punto inicial fijo
  const [endPoint, setEndPoint] = useState(null); // Punto final dinámico

  useEffect(() => {
    if (!mapRef.current) return;

    if (startPoint) {
      // Crear control de enrutamiento
      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(startPoint)],
        routeWhileDragging: true,
      }).addTo(mapRef.current);
    }
  }, [startPoint]);

  useEffect(() => {
    if (endPoint) {
      // Actualizar waypoints
      routingControlRef.current.setWaypoints([L.latLng(startPoint), L.latLng(endPoint)]);
    }
  }, [endPoint, startPoint]);

  const onEachFeature = (feature, layer) => {
    /*layer.on('click', async () => {
      const [lat, lng] = feature.coordinates;
      setStartPoint([lat, lng])
      console.log(feature, layer)
      const response = await fetch(`http://localhost:3001/estaciones-mas-cercana?lat=${lat}&lng=${lng}`);
      const estacionMetro = await response.json();
      
      console.log(estacionMetro)
      setEndPoint(estacionMetro[0].geometry.coordinates)
    });*/
  };
  
  return (
    <>
      <GeoJSON data={item.geometry} onEachFeature={onEachFeature} >
        <Popup maxWidth="400">
          <Slider className="photos-airbnb" {...sliderSettings}>
            {item.photos.map((photo, i) => (
              <img key={i} src={photo.url} height="250px" />
            ))}
          </Slider>
          <div className="modal-info">
            <p className="name-airbnb">{item.name}</p>
            <p>Puntaje: {item.stars}</p>
            <p>Número de invitados: {item.numberOfGuests}</p>
            <p>Tipo habitación: {item.roomType}</p>
          </div>
        </Popup>
      
      </GeoJSON>
    </>
  );
}
