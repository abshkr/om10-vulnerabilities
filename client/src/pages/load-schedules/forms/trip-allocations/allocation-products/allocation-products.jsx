import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import columns from './columns';
import AllocationPeriods from './allocation-periods';
//import { AdaptiveFlowSummary } from '../styles';
import { ExpansionContainer } from './style';

const AllocationProducts = ({ allocation, t, config }) => {
  console.log(allocation);

  const getRowKey = (record) => {
    return `${record?.aitem_index}-${record?.aitem_type}-${record?.aitem_cmpycode}-${record?.aitem_prodcode}-${record?.aitem_suppcode}`;
  };

  return (
    <ExpansionContainer>
      <Table
        size="small"
        columns={columns(t)}
        dataSource={allocation.products}
        pagination={false}
        expandable={{ expandedRowRender: (product) => AllocationPeriods({ product, t, config }) }}
        // title={(arms) => summary(arms, tank, t)}
        rowKey={getRowKey}
      />
    </ExpansionContainer>
  );
};

export default AllocationProducts;
