import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import '../mapa.css';

export default function Map() {
  return (
    <MapContainer center={[6.2443677, -75.6636145]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
