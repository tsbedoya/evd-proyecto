import React from "react";
import Map from "../components/map";
import Graphs from "../components/graphs"

export default function ContentMap() {
  return (
    <div className="row">
      <div className="col">
        <h2>GRAFICAS....</h2>
        <Graphs />
      </div>
      <div className="col" style={{ paddingRight: 0 }}>
        <Map />
      </div>
    </div>
  );
}
