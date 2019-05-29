import React from "react";
import { Table } from "antd";
import _ from "lodash";
import columns from "./columns";
const summary = (arms, tank) => {
  return (
    <div className="flow-rate-summary">
      <p>
        <span>Tank Max Flow Rate: </span>
        {tank.max} Litres
      </p>
      <p>
        <span>Actual Tank Flowrate (LPM): </span>
        {_.sumBy(arms, "current_flow_rate").toFixed(2)} Litres
      </p>
      <p>
        <span>Flow Contribution (LPM): </span>
        {_.sumBy(arms, "flow_contribution").toFixed(2)} Litres
      </p>
    </div>
  );
};

const FlowRates = tank => {
  return <Table size="middle" columns={columns} dataSource={tank.arms} pagination={false} title={arms => summary(arms, tank)} rowKey="baa_code" className="nested-table" />;
};

export default FlowRates;
