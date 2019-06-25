import React from "react";
import generate from "../../utils/generateOptions";

const handleConversion = (value, unit) => {
  value = parseInt(value);

  if (unit === "Litres") {
    return isNaN(value) ? "0" : value.toFixed(2);
  }

  if (unit === "Cubic Metre") {
    const result = String((value / 1000).toFixed(2));
    return isNaN(result) ? "0" : result;
  }

  if (unit === "Imperial Gallon") {
    const result = String((value / 4.546).toFixed(2));
    return isNaN(result) ? "0" : result;
  }

  if (unit === "U.S Gallon") {
    const result = String((value / 3.785).toFixed(2));
    return isNaN(result) ? "0" : result;
  }

  if (unit === "Imperial Barrel") {
    const result = String((value / 0.0061).toFixed(2));
    return isNaN(result) ? "0" : result;
  }

  if (unit === "U.S Barrel") {
    const result = String((value / 158.987).toFixed(2));
    return isNaN(result) ? "0" : result;
  }
};

const columns = (data, unit) => [
  {
    title: "Meter Code",
    dataIndex: "metercode",
    key: "metercode",
    sorter: (a, b) => a.metercode - b.metercode,
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Meter Type",
    dataIndex: "metertype",
    key: "metertype",
    filters: generate(data, "metertype"),
    onFilter: (value, record) => record.metertype.includes(value)
  },
  {
    title: "Meter Type Name",
    dataIndex: "metertypename",
    key: "metertypename",
    filters: generate(data, "metertypename"),
    onFilter: (value, record) => record.metertypename.includes(value)
  },
  {
    title: "Observed Volume",
    dataIndex: "observedvolume",
    key: "observedvolume",
    sorter: (a, b) => a.observedvolume - b.observedvolume,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Standard Volume",
    dataIndex: "standardvolume",
    key: "standardvolume",
    sorter: (a, b) => a.standardvolume - b.standardvolume,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Mass",
    dataIndex: "mass",
    key: "mass",
    sorter: (a, b) => a.mass - b.mass,
    render: value => <span>{handleConversion(value, unit)}</span>
  }
];

export default columns;
