import React, { useContext } from "react";
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
import {
  GraphPieChart,
  BarChartCantidadAirbnb,
  BarChartMetro,
  BarChartPromedioPrecio,
} from "./graphs/index";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { AppContext } from "../App";

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

export default function Graphs() {
  const { hideMainGrpah, promedioPrecioBarrio } = useContext(AppContext);

  return (
    <div className="wrap-graph">
      <div className="inner-scroll">
        {hideMainGrpah && promedioPrecioBarrio.nombreBarrio && (
          <h3>
            El Alojamiento seleccionado esta en el barrio: <br />
            <b>{promedioPrecioBarrio.nombreBarrio}</b>
          </h3>
        )}
        <br></br>
        <BarChartMetro />
        <br></br>
        <BarChartPromedioPrecio />
        <br></br>
        <GraphPieChart />
        <br></br>
        <BarChartCantidadAirbnb />
        <br></br>
      </div>
    </div>
  );
}
