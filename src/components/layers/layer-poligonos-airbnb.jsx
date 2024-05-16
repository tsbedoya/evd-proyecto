import React, { useState, useEffect } from "react";
import { Popup, GeoJSON } from "react-leaflet";

export default function LayerPoligonosAirbnb({ item }) {
  const [dataPoligonosAirbnb, setDataPoligonosAirbnb] = useState([]);

  const fetchDataPoligonosAirbnb = async () => {
    const response = await fetch(
      "http://localhost:3001/layer-poligonos-airbnb"
    );
    const poligonosAirbnb = await response.json();
    setDataPoligonosAirbnb(poligonosAirbnb);
  };

  useEffect(() => {
    fetchDataPoligonosAirbnb();
  }, []);

  const Poligonos = () => {
    return dataPoligonosAirbnb.map((item) => (
      <GeoJSON key={item.id} data={item.geometry} />
    ));
  }

  const Airbnbs = () => {
    let airbnbs = []
    for (const poligono of dataPoligonosAirbnb) {
      const result = poligono.airbnbs.map((item) => (
        <GeoJSON key={item.id} data={item.point_geom} />
      ));
      airbnbs.push([...result])
    }

    return airbnbs;
  }

  return <>
    <Poligonos />
    <Airbnbs />
  </>
}
