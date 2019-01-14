import Generate from "../../utils/generateOptions";

const columns = (sortedInfo, filteredInfo, data) => [
  {
    title: "Tank",
    dataIndex: "tank_code",
    key: "tank_code"
  },
  {
    title: "Location",
    dataIndex: "tank_location",
    key: "tank_location",
    filters: Generate(data, "tank_location"),
    filteredValue: filteredInfo.tank_location || null,
    onFilter: (value, record) => record.tank_location.includes(value),
    sortOrder: sortedInfo.columnKey === "tank_location" && sortedInfo.order
  },
  {
    title: "Product Name",
    dataIndex: "base_name",
    key: "base_name",
    filters: Generate(data, "base_name"),
    filteredValue: filteredInfo.base_name || null,
    onFilter: (value, record) => record.base_name.includes(value),
    sortOrder: sortedInfo.columnKey === "base_name" && sortedInfo.order
  },
  {
    title: "Level (mm)",
    dataIndex: "tank_prod_lvl",
    key: "tank_prod_lvl",
    sorter: (a, b) => a.tank_prod_lvl - b.tank_prod_lvl,
    sortOrder: sortedInfo.columnKey === "tank_prod_lvl" && sortedInfo.order
  },
  {
    title: "Temp (DegC)",
    dataIndex: "tank_temp",
    key: "tank_temp",
    sorter: (a, b) => a.tank_temp - b.tank_temp,
    sortOrder: sortedInfo.columnKey === "tank_temp" && sortedInfo.order
  },
  {
    title: "Standard Volume (CorL)",
    dataIndex: "netvol",
    key: "netvol",
    sorter: (a, b) => a.netvol - b.netvol,
    sortOrder: sortedInfo.columnKey === "netvol" && sortedInfo.order
  },
  {
    title: "Observed Volume (ObsL)",
    dataIndex: "grossvol",
    key: "grossvol",
    sorter: (a, b) => a.grossvol - b.grossvol,
    sortOrder: sortedInfo.columnKey === "grossvol" && sortedInfo.order
  },
  {
    title: "Pumpable Volume (ObsL)",
    dataIndex: "pumpablevol",
    key: "pumpablevol",
    sorter: (a, b) => a.pumpablevol - b.pumpablevol,
    sortOrder: sortedInfo.columnKey === "pumpablevol" && sortedInfo.order
  },
  {
    title: "Opening Stock (CorL)",
    dataIndex: "usablevol",
    key: "usablevol",
    sorter: (a, b) => a.usablevol - b.usablevol,
    sortOrder: sortedInfo.columnKey === "usablevol" && sortedInfo.order
  },
  {
    title: "Book Balance (CorL)",
    dataIndex: "bookbalance",
    key: "bookbalance",
    sorter: (a, b) => a.bookbalance - b.bookbalance,
    sortOrder: sortedInfo.columnKey === "bookbalance" && sortedInfo.order
  }
];

export default columns;
