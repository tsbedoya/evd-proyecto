import React from "react";
import Map from "../components/map";
import { Graphs, GraphsPieChart } from "../components/graphs";
import "../App.css";

export default function Dashboard() {
  return (
    <div className="row bg-body-tertiary ">
      <div className="col ">
        <GraphsPieChart />
        <br></br>
        <Graphs />
      </div>
      <div className="col" style={{ paddingRight: 0 }}>
        <Map />
      </div>
    </div>
  );
}
