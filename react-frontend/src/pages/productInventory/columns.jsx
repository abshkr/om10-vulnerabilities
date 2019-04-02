const columns = data => [
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
    sorter: (a, b) => a.netvol - b.netvol
  },
  {
    title: "Gross Volume",
    dataIndex: "grossvol",
    key: "grossvol",
    sorter: (a, b) => a.grossvol - b.grossvol
  },
  {
    title: "Usable Volume",
    dataIndex: "usablevol",
    key: "usablevol",
    sorter: (a, b) => a.usablevol - b.usablevol
  },
  {
    title: "Book Balance",
    dataIndex: "bookbalance",
    key: "bookbalance",
    sorter: (a, b) => a.bookbalance - b.bookbalance
  }
];

export default columns;
