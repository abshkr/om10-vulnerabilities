import React from 'react';
import _ from 'lodash';
const columns = [
  {
    title: 'Base Product Name',
    dataIndex: 'base_name',
    key: 'base_name'
  },
  {
    title: 'Number Of Tanks',
    dataIndex: 'tank_count',
    key: 'tank_count',
    align: 'center',
    sorter: (a, b) => _.toInteger(b.tank_count) - _.toInteger(a.tank_count)
  },
  {
    title: 'Total Capacity',
    dataIndex: 'total_capacity',
    key: 'total_capacity',
    align: 'right',
    sorter: (a, b) => _.toInteger(b.total_capacity) - _.toInteger(a.total_capacity),
    render: text => <span>{text.toLocaleString()} ML</span>
  },
  {
    title: 'Observed Quantity',
    dataIndex: 'observed_quantity',
    key: 'observed_quantity',
    align: 'right',
    sorter: (a, b) => _.toInteger(b.observed_quantity) - _.toInteger(a.observed_quantity),
    render: text => <span>{text.toLocaleString()} ML</span>
  },
  {
    title: 'Ullage',
    dataIndex: 'total_ullage',
    key: 'total_ullage',
    align: 'right',
    sorter: (a, b) => _.toInteger(b.total_ullage) - _.toInteger(a.total_ullage),
    render: text => <span>{text.toLocaleString()} ML</span>
  },
  {
    title: 'Full',
    dataIndex: 'total_fill',
    key: 'total_fill',
    align: 'center',
    sorter: (a, b) => _.toInteger(b.total_fill) - _.toInteger(a.total_fill),
    render: text => <span>{text.toFixed(2)} %</span>
  }
];

export default columns;
