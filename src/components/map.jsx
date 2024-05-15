import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import LayerAirbnb from "./layer-airbnb";
import LayerPoligonos from "./layer-poligonos";

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
  const mapRef = useRef();
  const [dataAirbnb, setDataAirbnb] = useState([]);
  const [dataPoligonos, setDataPoligonos] = useState([]);

  const fetchDataAirbnb = async () => {
    const response = await fetch("http://localhost:3001/layer-airbnb");
    const airbnb = await response.json();
    setDataAirbnb(airbnb);
  };

  const fetchDataPoligonos = async () => {
    const response = await fetch("http://localhost:3001/layer-poligonos");
    const poligonos = await response.json();
    setDataPoligonos(poligonos);
  };

  useEffect(() => {
    Promise.all([fetchDataAirbnb(), fetchDataPoligonos()])
  }, []);

  return (
    <div className="wrap-map">
      <MapContainer center={defaultLocation} zoom={13} ref={mapRef}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Mapa openstreetmap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Mapa ArcGIS">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Airbnb ubicaciones">
            <LayerGroup>
              {dataAirbnb.map((item) => (
                <LayerAirbnb key={item.id} item={item} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Poligonos barrios">
            <LayerGroup>
              {dataPoligonos.map((item) => (
                <LayerPoligonos key={item.id} item={item} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
