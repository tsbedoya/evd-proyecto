import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top 5 cantidad Airbnb por barrio",
    },
  },
};

export default function Graphs() {
  const [dataReporte1, setDataReporte1] = useState({});

  const fetchDataReporteAirbnb = async () => {
    const response = await fetch(
      "http://localhost:3001/reporte-cantidad-airbnb"
    );
    const reporteAirbnb = await response.json();
    const mappedReporteAirbnb = {
      labels: reporteAirbnb.map((item) => item.nombre_bar),
      datasets: [
        {
          label: "Cantidad Airbnb",
          data: reporteAirbnb.map((item) => parseInt(item.cantidad)),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        }
      ],
    };
    setDataReporte1(mappedReporteAirbnb);
  };

  useEffect(() => {
    fetchDataReporteAirbnb();
  }, []);

  return Object.keys(dataReporte1).length ? (<Bar options={options} data={dataReporte1} />) : null;
}
