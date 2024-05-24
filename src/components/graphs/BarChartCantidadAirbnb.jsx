import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import Loading from "../../loading.gif";

import { AppContext } from "../../App";

// Opciones para el gráfico de pastel
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top 10 - Precio Promedio del Alojamiento x Barrio ($USD)",
    },
  },
  animation: {
    y: { from: 500 },
  },
};

export const BarChartCantidadAirbnb = () => {
  const { hideMainGrpah } = useContext(AppContext);
  const [dataReporte, setDataReporte] = useState({});

  const fetchDataReporteAirbnb = async () => {
    const response = await fetch(
      "http://localhost:3001/reporte-precioPromedio-airbnb"
    );
    const reporteAirbnb = await response.json();
    const mappedReporteAirbnb = {
      labels: reporteAirbnb.map((item) => item.nombre_bar),
      datasets: [
        {
          label: "Precio Promedio Airbnb",
          data: reporteAirbnb.map((item) => parseInt(item.precio_promedio)),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    setDataReporte(mappedReporteAirbnb);
  };

  useEffect(() => {
    fetchDataReporteAirbnb();
  }, []);

  return !hideMainGrpah ? (
    Object.keys(dataReporte).length ? (
      <Bar options={options} data={dataReporte} className="bar-hart" />
    ) : (
      <img src={Loading} alt="loading..." width="80px" />
    )
  ) : null;
};
