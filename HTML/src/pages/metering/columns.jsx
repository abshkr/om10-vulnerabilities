import Generate from "../../utils/generateOptions";

const columns = (sortedInfo, filteredInfo, data) => [
  {
    title: "Meter Code",
    dataIndex: "metercode",
    key: "metercode",
    sorter: (a, b) => a.metercode - b.metercode,
    sortOrder: sortedInfo.columnKey === "metercode" && sortedInfo.order
  },
  {
    title: "Meter Type",
    dataIndex: "metertype",
    key: "metertype",
    filters: Generate(data, "metertype"),
    filteredValue: filteredInfo.metertype || null,
    onFilter: (value, record) => record.metertype.includes(value),
    sortOrder: sortedInfo.columnKey === "metertype" && sortedInfo.order
  },
  {
    title: "Meter Type Name",
    dataIndex: "metertypename",
    key: "metertypename",
    filters: Generate(data, "metertypename"),
    filteredValue: filteredInfo.metertypename || null,
    onFilter: (value, record) => record.metertypename.includes(value),
    sortOrder: sortedInfo.columnKey === "metertypename" && sortedInfo.order
  },
  {
    title: "Observed Volume",
    dataIndex: "observedvolume",
    key: "observedvolume",
    sorter: (a, b) => a.observedvolume - b.observedvolume,
    sortOrder: sortedInfo.columnKey === "observedvolume" && sortedInfo.order
  },
  {
    title: "Standard Volume",
    dataIndex: "standardvolume",
    key: "standardvolume",
    sorter: (a, b) => a.standardvolume - b.standardvolume,
    sortOrder: sortedInfo.columnKey === "standardvolume" && sortedInfo.order
  },
  {
    title: "Mass",
    dataIndex: "mass",
    key: "mass",
    sorter: (a, b) => a.mass - b.mass,
    sortOrder: sortedInfo.columnKey === "mass" && sortedInfo.order
  }
];

export default columns;
