const columns = (sortedInfo, filteredInfo) => [
  {
    title: "Tank Code",
    dataIndex: "tankcode",
    key: "tankcode"
  },
  {
    title: "Product Code",
    dataIndex: "productcode",
    key: "productcode"
  },
  {
    title: "Tank Product",
    dataIndex: "productname",
    key: "productname"
  },
  {
    title: "Opening Stock",
    dataIndex: "openingstock",
    key: "openingstock",
    sorter: (a, b) => a.openingstock - b.openingstock,
    sortOrder: sortedInfo.columnKey === "openingstock" && sortedInfo.order
  },
  {
    title: "Receipts to Site",
    dataIndex: "receiptsvol",
    key: "receiptsvol",
    sorter: (a, b) => a.receiptsvol - b.receiptsvol,
    sortOrder: sortedInfo.columnKey === "receiptsvol" && sortedInfo.order
  },
  {
    title: "Total Acc",
    dataIndex: "accnttot",
    key: "accnttot",
    sorter: (a, b) => a.accnttot - b.accnttot,
    sortOrder: sortedInfo.columnKey === "accnttot" && sortedInfo.order
  },
  {
    title: "To Transfer for Offsite",
    dataIndex: "transfervol",
    key: "transfervol",
    sorter: (a, b) => a.transfervol - b.transfervol,
    sortOrder: sortedInfo.columnKey === "transfervol" && sortedInfo.order
  },
  {
    title: "Book Balance",
    dataIndex: "bookbalance",
    key: "bookbalance",
    sorter: (a, b) => a.bookbalance - b.bookbalance,
    sortOrder: sortedInfo.columnKey === "bookbalance" && sortedInfo.order
  },
  {
    title: "Closing Stock",
    dataIndex: "closingstock",
    key: "closingstock",
    sorter: (a, b) => a.closingstock - b.closingstock,
    sortOrder: sortedInfo.columnKey === "closingstock" && sortedInfo.order
  },
  {
    title: "Gain/(Loss)",
    dataIndex: "gainloss",
    key: "gainloss",
    sorter: (a, b) => a.gainloss - b.gainloss,
    sortOrder: sortedInfo.columnKey === "gainloss" && sortedInfo.order
  }
];

export default columns;
