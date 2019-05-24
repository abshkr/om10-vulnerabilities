import React from "react";
import { Table } from "antd";
import _ from "lodash";
import columns from "./columns";

const title = base => {
  return (
    <div className="flow-rate-title">
      <span>Base Product: </span>
      {base[0].base_code}
    </div>
  );
};

const summary = base => {
  return (
    <div className="flow-rate-summary">
      <p>
        <span>Tank Flowrate (LPM): </span>
        {_.sumBy(base, "current_flow_rate").toFixed(2)} Litres
      </p>
      <p>
        <span>Flow Contribution (LPM): </span>
        {_.sumBy(base, "flow_contribution").toFixed(2)} Litres
      </p>
    </div>
  );
};

const FlowRates = base => {
  return <Table size="middle" columns={columns} dataSource={base.tankList} pagination={false} rowKey="baa_code" title={title} footer={summary} className="nested-table" />;
};

export default FlowRates;
