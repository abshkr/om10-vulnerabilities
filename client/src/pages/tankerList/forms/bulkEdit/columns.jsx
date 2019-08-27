const columns = t => [
  {
    title: t("fields.code"),
    dataIndex: "tnkr_code",
    key: "tnkr_code",
    align: "center"
  },
  {
    title: t("fields.equipmentType"),
    dataIndex: "tnkr_etp",
    key: "tnkr_etp",
    align: "center"
  },
  {
    title: t("fields.owner"),
    dataIndex: "tnkr_owner",
    key: "tnkr_owner",
    align: "center"
  },
  {
    title: t("fields.owner"),
    dataIndex: "tnkr_owner_name",
    key: "tnkr_owner_name",
    align: "center"
  }
];

export default columns;
