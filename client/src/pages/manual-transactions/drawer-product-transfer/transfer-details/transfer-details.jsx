import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import { DataTable } from '../../../../components';
import columns from './columns';
import { MANUAL_TRANSACTIONS } from '../../../../api';
import useSWR from 'swr';

const TransferDetails = ({ form, type, selected }) => {
  const url =
    selected && selected?.arm_code !== 'Select Arm Code'
      ? `${MANUAL_TRANSACTIONS.BASE_DETAILS}?prod_cmpy=${selected?.prod_cmpy}&prod_code=${selected?.prod_code}&arm_code=${selected?.arm_code}`
      : null;

  const { data: payload } = useSWR(url, { params: 'test' }, { swr: 'test' });

  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const fields = columns(t);

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
    }
  }, [payload]);

  return (
    <>
      <DataTable data={data} height="80vh" columns={fields} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <div style={{ marginRight: 20 }}>
          <strong>Base Obsered Total: {500}</strong>
        </div>
      </div>
    </>
  );
};

export default TransferDetails;
