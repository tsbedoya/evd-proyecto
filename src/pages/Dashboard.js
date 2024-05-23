import React from "react";
import Map from "../components/map";
import Graphs from "../components/graphs";

export default function Dashboard() {
  return (
    <div className="row bg-body-tertiary ">
      <div className="col">
        <Graphs />
      </div>
      <div className="col" style={{ paddingRight: 0 }}>
        <Map />
      </div>
    </div>
  );
}
