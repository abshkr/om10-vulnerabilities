import React from "react";
import { folioSummary } from "../../../../api";

const columns = id => [
  {
    title: "Report",
    dataIndex: "value",
    key: "value",
    // eslint-disable-next-line
    render: value => <a onClick={() => window.open(folioSummary.openFolioReports(id, value), "_blank")}>{value}</a>
  }
];

export default columns;
