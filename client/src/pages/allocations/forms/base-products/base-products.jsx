import React, { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import columns from './columns';
import { allocations } from '../../../../api';
import { DataTable } from '../../../../components';

const BaseProducts = ({ form, t, value }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { getFieldDecorator, setFieldsValue } = form;

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .all([allocations.items(value)])
      .then(
        axios.spread(payload => {
          setData(payload.data.records);
          setLoading(false);
        }),
      )
      .catch(errors => {
        setLoading(false);
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }, [value]);

  const handleEdit = value => {
    const payload = [...data];

    payload.splice(value.rowIndex, 1, value.data);

    setData(payload);

    setFieldsValue({
      alloc_items: payload,
    });
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  getFieldDecorator('alloc_items');

  return (
    <DataTable
      columns={columns(t)}
      data={data}
      isLoading={isLoading}
      t={t}
      height="37vh"
      onEditingFinished={handleEdit}
    />
  );
};

export default BaseProducts;
