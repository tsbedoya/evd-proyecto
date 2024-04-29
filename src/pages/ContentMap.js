import React from "react";
import Map from "../components/map";

export default function ContentMap() {
  return (
    <div className="row">
      <div className="col">
        <h2>GRAFICAS....</h2>
      </div>
      <div className="col" style={{ paddingRight: 0 }}>
        <Map />
      </div>
    </div>
  );
}
