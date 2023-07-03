import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import columns from './columns';
//import { AdaptiveFlowSummary } from '../styles';
import { ExpansionContainer } from './style';
import '../antd-table-rows.css';

const AllocationProducts = ({ allocation, t, config }) => {
  console.log(allocation);

  const getRowKey = (record) => {
    return `${record?.aitem_index}-${record?.aitem_type}-${record?.aitem_cmpycode}-${record?.aitem_prodcode}-${record?.aitem_suppcode}`;
  };

  return (
    <ExpansionContainer>
      <Table
        size="small"
        columns={columns(t, config)}
        dataSource={allocation.products}
        pagination={false}
        // expandable={{expandedRowRender: (product) => AllocationPeriods({product, t, config})}}
        // title={(arms) => summary(arms, tank, t)}
        rowKey={getRowKey}
        rowClassName={(record, index) => {
          // return record?.aitem_qty_enough ? 'antd-table-row-pass' : 'antd-table-row-warn';
          return record?.aitem_qty_enough ? null : 'antd-table-row-warn';
        }}
      />
    </ExpansionContainer>
  );
};

export default AllocationProducts;
