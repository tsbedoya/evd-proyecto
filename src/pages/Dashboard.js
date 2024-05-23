import React from "react";
import Map from "../components/map";
import { Graphs, GraphsPieChart } from "../components/graphs";

export default function Dashboard() {
  return (
    <div className="row bg-body-tertiary ">
      <div className="col">
        <div className="wrap-graph">
          <div className="inner-scroll">
            <GraphsPieChart />
            <br></br>
            <Graphs />
            <br></br>
          </div>
        </div>
      </div>
      <div className="col" style={{ paddingRight: 0 }}>
        <Map />
      </div>
    </div>
  );
}
