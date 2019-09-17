import React, { useState, useEffect, useCallback } from 'react';

import { tankerList } from '../../../../api';
import columns from './columns';
import { Table } from 'antd';
import axios from 'axios';
import _ from 'lodash';

const BulkEdit = ({ form, value, t }) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getFieldDecorator, setFieldsValue } = form;

  const fetch = useCallback(() => {
    setIsLoading(true);
    axios.all([tankerList.tankers()]).then(
      axios.spread(response => {
        if (value.eqpt_title !== '') {
          const matches = _.filter(response.data.records, ['eqpt_title', value.eqpt_title]);
          setdata(matches);
          setIsLoading(false);
        }
        setIsLoading(false);
      })
    );
  }, [value]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setFieldsValue({
        bulk_edit: selectedRows
      });
    }
  };

  getFieldDecorator('bulk_edit');

  return (
    <Table
      size="middle"
      bordered
      rowKey="eqpt_code"
      pagination={false}
      title={() => t('descriptions.expiryDateTable')}
      rowSelection={rowSelection}
      columns={columns(t)}
      dataSource={data}
      loading={isLoading}
    />
  );
};

export default BulkEdit;
