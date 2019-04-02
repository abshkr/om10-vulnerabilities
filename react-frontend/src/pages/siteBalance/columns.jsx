import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Tank Code",
    dataIndex: "tankcode",
    key: "tankcode",
    filters: generate(data, "tankcode"),
    onFilter: (value, record) => record.tankcode.includes(value)
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
    sorter: (a, b) => a.openingstock - b.openingstock
  },
  {
    title: "Receipts to Site",
    dataIndex: "receiptsvol",
    key: "receiptsvol",
    sorter: (a, b) => a.receiptsvol - b.receiptsvol
  },
  {
    title: "Total Acc",
    dataIndex: "accnttot",
    key: "accnttot",
    sorter: (a, b) => a.accnttot - b.accnttot
  },
  {
    title: "To Transfer for Offsite",
    dataIndex: "transfervol",
    key: "transfervol",
    sorter: (a, b) => a.transfervol - b.transfervol
  },
  {
    title: "Book Balance",
    dataIndex: "bookbalance",
    key: "bookbalance",
    sorter: (a, b) => a.bookbalance - b.bookbalance
  },
  {
    title: "Closing Stock",
    dataIndex: "closingstock",
    key: "closingstock",
    sorter: (a, b) => a.closingstock - b.closingstock
  },
  {
    title: "Gain/(Loss)",
    dataIndex: "gainloss",
    key: "gainloss",
    sorter: (a, b) => a.gainloss - b.gainloss
  }
];

export default columns;
