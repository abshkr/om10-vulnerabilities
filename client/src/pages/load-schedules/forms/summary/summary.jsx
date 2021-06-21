import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Checkbox, Form } from 'antd';
import useSWR from 'swr';

import { DataTable } from '../../../../components';
import { LOAD_SCHEDULES } from '../../../../api';

import compartmentColumns from './compartment-columns';
import productColumns from './product-columns';
import { PreloadEditor } from './fields';

const Summary = ({ form, value }) => {
  const { setFieldsValue } = form;

  const [hideProd, setHidProd] = useState(false);
  const [compartments, setCompartments] = useState([]);
  // const [tableAPI, setTableAPI] = useState(null);

  const { data: products } = useSWR(
    value
      ? `${LOAD_SCHEDULES.PRODUCTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { data: compartmentsPayload } = useSWR(
    value
      ? `${LOAD_SCHEDULES.COMPARTMENTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { t } = useTranslation();

  const compartmentFields = compartmentColumns(t, form);
  const productFields = productColumns(t);

  const onChange = (v) => {
    setHidProd(v.target.checked);
  };

  useEffect(() => {
    if (value && compartmentsPayload) {
      setCompartments(compartmentsPayload.records);
      setFieldsValue({
        compartments: compartmentsPayload.records,
      });
    }
  }, [value, compartmentsPayload, setFieldsValue]);

  const components = {
    PreloadEditor,
  };

  return (
    <div>
      <Checkbox onChange={onChange}>{t('operations.hideSpecProd')}</Checkbox>
      <div style={{ display: 'flex', width: '100%' }}>
        {/* <div style={{display:'block'}}> */}

        {!hideProd && (
          <div style={{ width: '50%', marginRight: 10 }}>
            <DataTable data={products?.records} columns={productFields} parentHeight="300px" minimal />
          </div>
        )}
        <div style={{ width: hideProd ? '100%' : '50%' }}>
          <Form.Item name="compartments">
            <DataTable
              data={compartments}
              columns={compartmentFields}
              parentHeight="300px"
              components={components}
              minimal
              // apiContext={setTableAPI}
              // rowEditingStopped={rowEditingStopped}
            />
          </Form.Item>
          {/* <DataTable data={compartments?.records} columns={compartmentFields} parentHeight="300px" minimal /> */}
        </div>
      </div>
    </div>
  );
};

export default Summary;
