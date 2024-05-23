import React from "react";
import L from "leaflet";
import { Popup, GeoJSON } from "react-leaflet";

import icono from "../../icono_metro.png";

var iconoMetro = L.icon({
  iconUrl: icono,
  iconSize: [24, 24],
  className: "icono-metro"
});

export default function LayerEstacionesMetro({ item }) {
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, { icon: iconoMetro });
  };

  return (
    <GeoJSON data={item.geometry} pointToLayer={pointToLayer}>
      <Popup maxWidth="400">
        <div className="modal-info">
          <p className="name-airbnb">{item.nombre_bar}</p>
          <p>Linea: {item.linea}</p>
          <p>Nombre estación: {item.nombre}</p>
          <p>Tipo estación: {item.tipo_est}</p>
        </div>
      </Popup>
    </GeoJSON>
  );
}
