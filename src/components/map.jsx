import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import AirbnbModal from "./airbn-modal";

import "./mapa.css";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// medellin
const defaultLocation = [6.2442872, -75.6224112];
export default function Map() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001");
      const airbnb = await response.json();
      setData(airbnb);
    };

    fetchData();
  }, []);

  return (
    <div className="wrap-map">
      {data.length ? (
        <MapContainer
          center={defaultLocation}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((item) => (
            <AirbnbModal key={item.id} item={item}/>
          ))}
        </MapContainer>
      ) : null}
    </div>
  );
}
