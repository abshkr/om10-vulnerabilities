import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import columns from './columns';
import { ALLOCATIONS } from '../../../../api';

import { DataTable } from '../../../../components';

const BaseProducts = ({ form, value }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { getFieldDecorator, setFieldsValue } = form;

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .post(ALLOCATIONS.ITEMS, value)
      .then(
        axios.spread(payload => {
          setData(payload.data.records);
          setLoading(false);
        })
      )
      .catch(errors => {
        setLoading(false);
      });
  }, [value]);

  const handleEdit = value => {
    const payload = [...data];

    payload.splice(value.rowIndex, 1, value.data);

    setData(payload);

    setFieldsValue({
      alloc_items: payload
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
      onEditingFinished={handleEdit}
      height={350}
    />
  );
};

export default BaseProducts;
