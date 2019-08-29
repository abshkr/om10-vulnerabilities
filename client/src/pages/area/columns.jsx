import { generateOptions } from "../../utils";

const columns = (data, t) => [
  {
    title: "Area ID",
    dataIndex: "area_k",
    key: "area_k",
    align: "center",
    sorter: (a, b) => a.area_k - b.area_k
  },
  {
    title: "Area Name",
    dataIndex: "area_name",
    key: "area_name",
    align: "center",
    sorter: (a, b) => {
      return a.area_name.localeCompare(b.area_name);
    },
    filters: generateOptions(data, "area_name"),
    onFilter: (value, record) => record.area_name.indexOf(value) === 0
  }
];

export default columns;
