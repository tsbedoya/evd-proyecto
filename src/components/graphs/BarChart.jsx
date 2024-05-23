import React, { useState, useEffect } from "react";
import { Bar} from "react-chartjs-2";
import Loading from "../../loading.gif";

// Opciones para el gráfico de pastel
const options = {
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

export const GraphBarChart = () => {
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
      <Bar options={options} data={dataReporte2} className="bar-hart" />
    ) : <img src={Loading} alt="loading..." width="80px"/>;
  };