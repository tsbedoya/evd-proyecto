import React, { useState, useEffect, useContext, useRef } from "react";
import { Popup, GeoJSON } from "react-leaflet";
import Slider from "react-slick";
import L from "leaflet";
import { AppContext } from "../../App";

const sliderSettings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function LayerAirbnb({ item, mapRef, routingControlRef }) {
  const popupRef = useRef();
  const { setHideMainGrpah, setEstacionesMetroCercanas } = useContext(AppContext);
  const [startPoint, setStartPoint] = useState(null); // Punto inicial fijo
  const [endPoint, setEndPoint] = useState(null); // Punto final dinámico

  useEffect(() => {
    const popup = popupRef.current;
    if (popup) {
      popup.on("remove", () => {
        setHideMainGrpah(false);
      });
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (endPoint) {
      // Actualizar waypoints
      L.Routing.control({
        createMarker: () => null,
        waypoints: [
          L.latLng(startPoint[0], startPoint[1]),
          L.latLng(endPoint[0], endPoint[1]),
        ],
        show: false,
      }).addTo(mapRef.current);
    }
  }, [endPoint]);

  const onEachFeature = (feature, layer) => {
    layer.on("click", async () => {
      const [lng, lat] = feature.coordinates;
      setStartPoint([lat, lng]);
      // console.log(feature, layer)
      const response = await fetch(
        `http://localhost:3001/estaciones-mas-cercana?lat=${lat}&lng=${lng}`
      );
      const estacionesMetro = await response.json();

      setEstacionesMetroCercanas(estacionesMetro);
      setHideMainGrpah(true)

      const [endLng, endLat] = estacionesMetro[0].geometry.coordinates;
      setEndPoint([endLat, endLng]);
    });
  };

  return (
    <>
      <GeoJSON data={item.geometry} onEachFeature={onEachFeature}>
        <Popup maxWidth="400" ref={popupRef}>
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
