import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';
import columns from './columns';
//import { AdaptiveFlowSummary } from '../styles';
import { ExpansionContainer } from './style';

const AllocationPeriods = ({ product, t, config }) => {
  console.log(product, config);

  const getRowKey = (record) => {
    return `${record?.aiprd_seq}-${record?.aiprd_type}-${record?.aiprd_cmpycode}-${record?.aiprd_prodcode}-${record?.aiprd_suppcode}-${record?.aiprd_index}`;
  };

  return (
    <ExpansionContainer>
      <Table
        size="small"
        columns={columns(t, config)}
        dataSource={product.periods}
        pagination={false}
        // title={(arms) => summary(arms, tank, t)}
        rowKey={getRowKey}
      />
    </ExpansionContainer>
  );
};

export default AllocationPeriods;
