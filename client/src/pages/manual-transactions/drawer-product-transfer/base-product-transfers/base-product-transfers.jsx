import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Spin } from 'antd';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';
import useSWR from 'swr';

const BaseProductTransfers = ({ form, sourceType, selected, transfers }) => {
  const url =
    selected && selected?.trsf_arm_cd !== 'Select Arm Code'
      ? `${MANUAL_TRANSACTIONS.BASE_DETAILS}?prod_cmpy=${selected?.trsf_prod_cmpy}&prod_code=${selected?.trsf_prod_code}&arm_code=${selected?.trsf_arm_cd}`
      : null;

  const { data: payload, isValidating } = useSWR(url, { params: 'test' }, { swr: 'test' });

  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const isLoading = isValidating || !data;

  const fields = columns(t);

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
    }
  }, [payload]);

  useEffect(() => {
    form.setFieldsValue({
      base_transfers: [],
    });
  }, [sourceType]);

  return (
    <>
    <Spin indicator={null} spinning={isLoading}>
      <Form.Item name="base_transfers">
        <DataTable data={data} height="80vh" columns={fields} />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <div style={{ marginRight: 20 }}>
          <strong>Base Observed Total: {500}</strong>
        </div>
      </div>
    </Spin>
    </>
  );
};

export default BaseProductTransfers;
