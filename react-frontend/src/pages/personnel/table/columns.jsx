import Generate from "../../../utils/generateOptions";

const columns = data => [
  {
    title: "Code",
    dataIndex: "per_code",
    key: "per_code",
    width: 100,
    fixed: "left"
  },
  {
    title: "Name",
    dataIndex: "per_name",
    key: "per_name",
    width: 200,
    filters: Generate(data, "per_name"),
    onFilter: (value, record) => record.per_name.indexOf(value) === 0
  },
  {
    title: "Employer Code",
    dataIndex: "cmpy_code",
    key: "cmpy_code",
    filters: Generate(data, "cmpy_code"),
    onFilter: (value, record) => record.cmpy_code.indexOf(value) === 0
  },
  {
    title: "Employer",
    dataIndex: "cmpy_name",
    key: "cmpy_name",
    filters: Generate(data, "cmpy_name"),
    onFilter: (value, record) => record.cmpy_name.indexOf(value) === 0
  },
  {
    title: "Role",
    dataIndex: "per_auth",
    key: "per_auth",
    filters: Generate(data, "per_auth"),
    onFilter: (value, record) => record.per_auth.indexOf(value) === 0
  },
  {
    title: "Licence No.",
    dataIndex: "per_licence_no",
    key: "per_licence_no"
  },
  {
    title: "DET Expiry",
    dataIndex: "expire_time",
    key: "expire_time"
  },
  {
    title: "Driving Licence",
    dataIndex: "per_last_dmy",
    key: "per_last_dmy"
  },
  {
    title: "Medical",
    dataIndex: "kya_psnl_name",
    key: "kya_psnl_name"
  },
  {
    title: "Area Access",
    dataIndex: "kya_role_name",
    key: "kya_role_name",
    filters: Generate(data, "kya_role_name"),
    onFilter: (value, record) => String(record.kya_role_name).indexOf(value) === 0
  },
  {
    title: "Status",
    dataIndex: "per_lock",
    key: "per_lock",
    filters: Generate(data, "per_lock"),
    onFilter: (value, record) => String(record.per_lock).indexOf(value) === 0
  },
  {
    title: "Department",
    dataIndex: "per_terminal",
    key: "per_terminal",
    filters: Generate(data, "per_terminal"),
    onFilter: (value, record) => String(record.per_terminal).indexOf(value) === 0
  },
  {
    title: "Email",
    dataIndex: "kya_supp_name",
    key: "kya_supp_name",
    filters: Generate(data, "kya_supp_name"),
    onFilter: (value, record) => String(record.kya_supp_name).indexOf(value) === 0
  },
  {
    title: "Last Modified",
    dataIndex: "kya_supp_name",
    key: "kya_supp_name",
    filters: Generate(data, "kya_supp_name"),
    onFilter: (value, record) => String(record.kya_supp_name).indexOf(value) === 0
  },
  {
    title: "Last Used",
    dataIndex: "user_last_reason",
    key: "user_last_reason",
    filters: Generate(data, "user_last_reason"),
    onFilter: (value, record) => String(record.user_last_reason).indexOf(value) === 0
  }
];
export default columns;
