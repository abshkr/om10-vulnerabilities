import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Tank",
    dataIndex: "tank_code",
    key: "tank_code",
    width: 150,
    filters: generate(data, "tank_code"),
    onFilter: (value, record) => record.tank_code.includes(value)
  },
  {
    title: "Location",
    dataIndex: "tank_location",
    key: "tank_location",
    width: 150,
    filters: generate(data, "tank_location"),
    onFilter: (value, record) => record.tank_location.includes(value)
  },
  {
    title: "Product Name",
    dataIndex: "base_name",
    key: "base_name",
    width: 130,
    filters: generate(data, "base_name"),
    onFilter: (value, record) => record.base_name.includes(value)
  },
  {
    title: "Level (mm)",
    dataIndex: "tank_prod_lvl",
    key: "tank_prod_lvl",
    width: 130,
    sorter: (a, b) => a.tank_prod_lvl - b.tank_prod_lvl
  },
  {
    title: "Temp",
    dataIndex: "tank_temp",
    key: "tank_temp",
    width: 160,
    sorter: (a, b) => a.tank_temp - b.tank_temp,
    render: text => text + "°C"
  },
  {
    title: "Standard Volume (CorL)",
    dataIndex: "netvol",
    key: "netvol",
    width: 160,
    sorter: (a, b) => a.netvol - b.netvol
  },
  {
    title: "Observed Volume (ObsL)",
    dataIndex: "grossvol",
    key: "grossvol",
    width: 160,
    sorter: (a, b) => a.grossvol - b.grossvol
  },
  {
    title: "Pumpable Volume (ObsL)",
    dataIndex: "pumpablevol",
    key: "pumpablevol",
    width: 160,
    sorter: (a, b) => a.pumpablevol - b.pumpablevol
  },
  {
    title: "Opening Stock (CorL)",
    dataIndex: "usablevol",
    key: "usablevol",
    width: 160,
    sorter: (a, b) => a.usablevol - b.usablevol
  },
  {
    title: "Book Balance (CorL)",
    dataIndex: "bookbalance",
    key: "bookbalance",
    width: 160,
    sorter: (a, b) => a.bookbalance - b.bookbalance
  }
];

export default columns;
