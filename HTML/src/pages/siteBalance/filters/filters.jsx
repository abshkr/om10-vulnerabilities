import React from "react";
import VolumeUnit from "./volumeUnit";

const Filters = ({ setMass, setVolume }) => {
  return (
    <div className="filter">
      <VolumeUnit change={setVolume} />
    </div>
  );
};

export default Filters;
