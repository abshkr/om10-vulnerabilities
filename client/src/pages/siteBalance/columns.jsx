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

  if (unit === "Kilogram") {
    const result = String((value / 0.9).toFixed(2));
    return isNaN(result) ? "0" : result;
  }
};

const columns = (data, unit) => [
  {
    title: "Tank Code",
    dataIndex: "tankcode",
    key: "tankcode",
    filters: generate(data, "tankcode"),
    onFilter: (value, record) => record.tankcode.includes(value),
    // eslint-disable-next-line
    render: text => <a>{text}</a>
  },
  {
    title: "Product Code",
    dataIndex: "productcode",
    key: "productcode",
    sorter: (a, b) => a.productcode - b.productcode
  },
  {
    title: "Tank Product",
    dataIndex: "productname",
    key: "productname",
    filters: generate(data, "productname"),
    onFilter: (value, record) => record.productname.indexOf(value) === 0
  },
  {
    title: "Opening Stock",
    dataIndex: "openingstock",
    key: "openingstock",
    sorter: (a, b) => a.openingstock - b.openingstock,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Receipts to Site",
    dataIndex: "receiptsvol",
    key: "receiptsvol",
    sorter: (a, b) => a.receiptsvol - b.receiptsvol,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Total Acc",
    dataIndex: "accnttot",
    key: "accnttot",
    sorter: (a, b) => a.accnttot - b.accnttot,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "To Transfer for Offsite",
    dataIndex: "transfervol",
    key: "transfervol",
    sorter: (a, b) => a.transfervol - b.transfervol,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Book Balance",
    dataIndex: "bookbalance",
    key: "bookbalance",
    sorter: (a, b) => a.bookbalance - b.bookbalance,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Closing Stock",
    dataIndex: "closingstock",
    key: "closingstock",
    sorter: (a, b) => a.closingstock - b.closingstock,
    render: value => <span>{handleConversion(value, unit)}</span>
  },
  {
    title: "Gain/(Loss)",
    dataIndex: "gainloss",
    key: "gainloss",
    sorter: (a, b) => a.gainloss - b.gainloss,
    render: value => <span>{handleConversion(value, unit)}</span>
  }
];

export default columns;
