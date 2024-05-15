import React from "react";
import { Popup, GeoJSON } from "react-leaflet";

export default function LayerPoligonos({ item }) {
  return (
    <GeoJSON data={item.geometry}>
      <Popup maxWidth="400">
        <div className="modal-info">
          <p className="name-airbnb">{item.nombre_bar}</p>
          <p>Comuna código: {item.comuna}</p>
          <p>Nombre comuna: {item.nombre_com}</p>
          <p>Barrio código: {item.barrio}</p>
        </div>
      </Popup>
    </GeoJSON>
  );
}
