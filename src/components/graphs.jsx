import React from "react";
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
import { GraphPieChart, GraphBarChart } from "./graphs/index";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importar el plugin

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
  return (
    <div className="wrap-graph">
      <div className="inner-scroll">
        <GraphPieChart />
        <br></br>
        <GraphBarChart />
        <br></br>
      </div>
    </div>
  );
}
