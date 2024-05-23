import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar el plugin

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

// Opciones para el gráfico de barras
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top 10 cantidad Airbnb por barrio",
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      backgroundColor:'white',
      formatter: (value, context) => {
        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
        const percentage = ((value / total) * 100).toFixed(2) + '%';
        return `${value} (${percentage})`;
      },
      color: 'black',
      font: {
        size:8},
    },
    canvas: {
      padding: {
        left: 80,
        right: 80,
        top: 80,
        bottom: 80,
      },

    },
  },
};

// Componente Graphs
const GraphsPieChart = () => {
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
          backgroundColor: reporteAirbnb.map((item, index) => {
            const defaultColors = [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ];
            // Asigna el color gris a "Otros"
            return item.nombre_bar === "Otros Barrios de Medellín" ? 'rgba(178, 186, 187)' : defaultColors[index % defaultColors.length];
          }),
        },
      ],
    };
    setDataReporte1(mappedReporteAirbnb);
  };

  useEffect(() => {
    fetchDataReporteAirbnb();
  }, []);

  return Object.keys(dataReporte1).length ? (
    <Pie options={options} data={dataReporte1} style={{width:300, height:300}}/>
  ) : null;
};

// Opciones para el gráfico de pastel
export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Top 10 promedio Airbnb por barrio",
    },
  },
};

// Componente GraphsPieChart
const Graphs = () => {
  const [dataReporte2, setDataReporte2] = useState({});

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
    setDataReporte2(mappedReporteAirbnb);
  };

  useEffect(() => {
    fetchDataReporteAirbnb();
  }, []);

  return Object.keys(dataReporte2).length ? (
    <Bar options={options1} data={dataReporte2} />
  ) : null;
};

// Exportación de componentes
export { Graphs, GraphsPieChart };
