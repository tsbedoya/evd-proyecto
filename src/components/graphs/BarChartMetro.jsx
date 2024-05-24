import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";

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
      text: "Top 5 estaciones más cercanas",
    },
  },
  animation: {
    y: { from: 500 },
  },
};

export const BarChartMetro = () => {
  const { estacionesMetroCercanas, setHideMainGrpah, hideMainGrpah } =
    useContext(AppContext);
  const [dataReporte, setDataReporte] = useState({});

  useEffect(() => {
    if (!estacionesMetroCercanas.length) return;

    const mappedReporteAirbnb = {
      labels: estacionesMetroCercanas.map((item) => item.nombre),
      datasets: [
        {
          label: "Distancia en KM",
          data: estacionesMetroCercanas.map((item) =>
            parseFloat(item.distance_kilometers).toFixed(2)
          ).sort((d1, d2) => d2 - d1),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    setDataReporte(mappedReporteAirbnb);
    setHideMainGrpah(true);
  }, [estacionesMetroCercanas]);

  return hideMainGrpah && Object.keys(dataReporte).length ? (
    <Bar options={options} data={dataReporte} className="bar-hart" />
  ) : null;
};
