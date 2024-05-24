import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AppContext } from "../../App";

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
    if (!Array.isArray(estacionesMetroCercanas) || !estacionesMetroCercanas.length) return;

    const mappedReporteAirbnb = {
      labels: estacionesMetroCercanas.map((item) => item.nombre),
      datasets: [
        {
          label: "Distancia en KM",
          data: estacionesMetroCercanas.map((item) =>
            parseFloat(item.distance_kilometers).toFixed(2)
          ),
          backgroundColor: "rgba(96, 60, 232, 0.40)",
        },
      ],
    };
    setDataReporte(mappedReporteAirbnb);
    setHideMainGrpah(true);
  }, [estacionesMetroCercanas, setHideMainGrpah]);

  return hideMainGrpah && Object.keys(dataReporte).length ? (
    <Bar options={options} data={dataReporte} className="bar-hart" aria-label="Bar chart displaying the top 5 closest metro stations by distance in kilometers" />
  ) : null;
};
