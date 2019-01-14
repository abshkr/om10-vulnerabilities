import React from "react";
import MassUnit from "./massUnit";
import VolumeUnit from "./volumeUnit";

const Filters = ({ setMass, setVolume }) => {
  return (
    <div className="filter">
      <MassUnit change={setMass} />
      <VolumeUnit change={setVolume} />
    </div>
  );
};

export default Filters;
