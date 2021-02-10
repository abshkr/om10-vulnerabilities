import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { AXLE_WEIGHTS } from '../../../../api';
import columns from './columns';

const Axles = ({ form, value }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [offsets, setOffsets] = useState([]);

  const { setFieldsValue } = form;

  // const { data: payload, isValidating } = useSWR(`${AXLE_WEIGHTS.GET_TNKR_AXLE_WEIGHTS}?eqpt_id=${value?.eqpt_id}`, { revalidateOnFocus: false });

  const fetchAxles = useCallback(
    (id) => {
      setLoading(true);

      api.get(`${AXLE_WEIGHTS.GET_TNKR_AXLE_WEIGHTS}?tnkr_code=${id}`).then((response) => {
        setData(response.data.records);
        setOffsets(calcOffsets(response.data.records));
        setFieldsValue({ axles: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );

  const calcOffsets = (records) => {
    const values = [];
    _.forEach(records, (item) => {
      values.push(item.user_weight_limit - item.axle_weight_limit);
    });
    return values;
  };

  useEffect(() => {
    console.log('.........edit1 tanker', value, data);
    if (value) {
      console.log('.........edit2 tanker', value, data);
      fetchAxles(value?.tnkr_code);
    }
  }, [value, fetchAxles]);

  useEffect(() => {
    const values = columns(t, offsets, 1);
    setFields(values);
  }, [t, offsets]);

  return (
    <Form.Item name="axles" label="">
      <DataTable
        minimal
        columns={fields}
        data={data}
        isLoading={isLoading}
        parentHeight={data?.length > 0 ? `${data?.length * 25 + 90}px` : '135px'}
        selectionMode="single"
        editType={false}
      />
    </Form.Item>
  );
};

export default Axles;
