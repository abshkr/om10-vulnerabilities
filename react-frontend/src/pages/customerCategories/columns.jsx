const columns = (sortedInfo, filteredInfo) => [
  {
    title: "Category Code",
    dataIndex: "category_code",
    key: "category_code"
  },
  {
    title: "Category Name",
    dataIndex: "category_name",
    key: "category_name"
  },
  {
    title: "Total Customers/Category",
    dataIndex: "category_count",
    key: "category_count"
  }
];

export default columns;
