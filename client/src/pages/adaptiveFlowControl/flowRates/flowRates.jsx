import React from "react";
import { Table } from "antd";
import _ from "lodash";
import columns from "./columns";

const summary = base => {
  return (
    <div className="flow-rate-summary">
      <p>
        <span>Tank Flowrate (LPM): </span>
        {_.sumBy(base, "flow_contribution")} Litres
      </p>
      <p>
        <span>Tank Maximum (LPM): </span>
        {0} Litres
      </p>
    </div>
  );
};

const title = base => {
  return (
    <div className="flow-rate-title">
      <span>Base Product: </span>
      {base[0].base_code}
    </div>
  );
};

const FlowRates = base => {
  return <Table columns={columns} dataSource={base.tankList} pagination={false} rowKey="tank_code" title={title} footer={summary} />;
};

export default FlowRates;
