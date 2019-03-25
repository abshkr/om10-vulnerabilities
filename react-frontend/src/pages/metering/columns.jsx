import generate from "../../utils/generateOptions";

const columns = data => [
  {
    title: "Meter Code",
    dataIndex: "metercode",
    key: "metercode",
    sorter: (a, b) => a.metercode - b.metercode
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
    sorter: (a, b) => a.observedvolume - b.observedvolume
  },
  {
    title: "Standard Volume",
    dataIndex: "standardvolume",
    key: "standardvolume",
    sorter: (a, b) => a.standardvolume - b.standardvolume
  },
  {
    title: "Mass",
    dataIndex: "mass",
    key: "mass",
    sorter: (a, b) => a.mass - b.mass
  }
];

export default columns;
