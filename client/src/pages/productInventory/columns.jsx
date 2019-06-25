import React from "react";

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
    title: "Product Code",
    dataIndex: "base_code",
    key: "base_code"
  },
  {
    title: "Product Name",
    dataIndex: "base_name",
    key: "base_name"
  },
  {
    title: "Net Volume",
    dataIndex: "netvol",
    key: "netvol",
    sorter: (a, b) => a.netvol - b.netvol,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Gross Volume",
    dataIndex: "grossvol",
    key: "grossvol",
    sorter: (a, b) => a.grossvol - b.grossvol,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Usable Volume",
    dataIndex: "usablevol",
    key: "usablevol",
    sorter: (a, b) => a.usablevol - b.usablevol,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Book Balance",
    dataIndex: "bookbalance",
    key: "bookbalance",
    sorter: (a, b) => a.bookbalance - b.bookbalance,
    render: value => <span>{handleConversion(value, unit)}</span>
  }
];

export default columns;
