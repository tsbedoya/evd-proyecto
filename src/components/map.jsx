import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
import LayerAirbnb from "./layers/layer-airbnb";
import LayerPoligonos from "./layers/layer-poligonos";
import LayerPoligonosAirbnb from "./layers/layer-poligonos-airbnb";
import LayerEstacionesMetro from "./layers/layer-estaciones-metro";

import "./mapa.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import icon from "../icono_airbnb.jpeg";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  iconSize: [18, 18],
  className: "icono-airbnb"
});

// medellin
const defaultLocation = [6.2492358,-75.6016402];
export default function Map() {
  const mapRef = useRef();
  const routingControlRef = useRef(null);
  const [dataAirbnb, setDataAirbnb] = useState([]);
  const [dataPoligonos, setDataPoligonos] = useState([]);
  const [dataEstacionesMetro, setEstacionesMetro] = useState([]);

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

  const fetchDataMetro = async () => {
    const response = await fetch("http://localhost:3001/layer-metro");
    const estacionesMetro = await response.json();
    setEstacionesMetro(estacionesMetro);
  };

  useEffect(() => {
    Promise.all([fetchDataAirbnb(), fetchDataPoligonos(), fetchDataMetro()]);
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

          <LayersControl.BaseLayer name="Mapa Alidade Smooth">
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Esri DeLorme">
            <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Open Topop Map">
            <TileLayer url="https://tile.opentopomap.org/{z}/{x}/{y}.png" />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Airbnb ubicaciones">
            <LayerGroup>
              {dataAirbnb.map((item) => (
                <LayerAirbnb
                  key={item.id}
                  item={item}
                  mapRef={mapRef}
                  routingControlRef={routingControlRef}
                />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Poligonos barrios">
            <LayerGroup>
              {dataPoligonos.map((item) => (
                <LayerPoligonos key={item.id} item={item} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Estaciones metro">
            <LayerGroup>
              {dataEstacionesMetro.map((item) => (
                <LayerEstacionesMetro key={item.id} item={item} />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          {/*<LayersControl.Overlay name="Poligonos con más Airbnb">
            <LayerGroup>
              <LayerPoligonosAirbnb />
            </LayerGroup>
          </LayersControl.Overlay>*/}
        </LayersControl>
      </MapContainer>
    </div>
  );
}
