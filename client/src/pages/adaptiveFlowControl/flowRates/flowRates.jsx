import React from "react";
import { Table } from "antd";
import _ from "lodash";
import columns from "./columns";

const summary = (arms, tank) => {
  return (
    <div className="flow-rate-summary">
      <p>
        <span>Tank Max Flow Rate: </span>
        {tank.max.toFixed(2)} LPM
      </p>
      <p>
        <span>Actual Tank Flowrate: </span>
        {_.sumBy(arms, "current_flow_rate").toFixed(2)} LPM
      </p>
      <p>
        <span>Flow Contribution: </span>
        {_.sumBy(arms, "flow_contribution").toFixed(2)} LPM
      </p>
    </div>
  );
};

const FlowRates = tank => {
  return <Table size="middle" columns={columns} dataSource={tank.arms} pagination={false} title={arms => summary(arms, tank)} rowKey="baa_code" className="nested-table" />;
};

export default FlowRates;
