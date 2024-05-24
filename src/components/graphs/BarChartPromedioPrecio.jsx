import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";

import { AppContext } from "../../App";

// Opciones para el gráfico de pastel
const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Promedio de precio barrio vs Precio del alojamiento",
    },
  },
  animation: {
    y: { from: 500 },
  },
};

export const BarChartPromedioPrecio = () => {
  const { hideMainGrpah, promedioPrecioBarrio } = useContext(AppContext);
  const dataReporte = {
    labels: ["Promedio de precio barrio VS Precio del alojamiento ($USD)"],
    datasets: [
      {
        label: "Promedio de precio barrio",
        data: [promedioPrecioBarrio.promedioPrecioBarrio],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Precio del alojamiento",
        data: [promedioPrecioBarrio.precioAirbnb],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return hideMainGrpah && Object.keys(promedioPrecioBarrio).length ? (
    <Bar options={options} data={dataReporte} className="bar-hart" />
  ) : null;
};
