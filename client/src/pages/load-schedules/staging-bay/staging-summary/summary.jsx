import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Checkbox, Form } from 'antd';
import useSWR from 'swr';
// import _ from 'lodash';

import { DataTable } from '../../../../components';
import { LOAD_SCHEDULES, STAGING_BAY } from '../../../../api';

import compartmentColumns from './compartment-columns';
import productColumns from './product-columns';
import { PreloadEditor } from './fields';
import { useConfig } from '../../../../hooks';

const Summary = ({ form, value, setInit }) => {
  const { setFieldsValue } = form;

  const [hideProd, setHidProd] = useState(false);
  const [compartments, setCompartments] = useState([]);
  // const [tableAPI, setTableAPI] = useState(null);
  const config = useConfig();

  const { data: products } = useSWR(
    value
      ? `${STAGING_BAY.PRODUCTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { data: compartmentsPayload } = useSWR(
    value
      ? `${STAGING_BAY.COMPARTMENTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { t } = useTranslation();

  const compartmentFields = compartmentColumns(t, form, config);
  const productFields = productColumns(t, config);

  const onChange = (v) => {
    setHidProd(v.target.checked);
  };

  /* const getProductDetailsByCompartments = (cmpts) => {
    const products = [];
    for (let i=0; i<cmpts?.length; i++) {
      const cmpt = cmpts?.[i];
      console.log('.................cmpt...', i, cmpt?.qty_scheduled, cmpt?.qty_loaded, cmpt?.qty_preload);
      const item = _.find(products, (o) => (o?.prod_code === cmpt?.prod_code));
      if (!item) {
        products.push({
          prod_code: cmpt?.prod_code,
          prod_name: cmpt?.prod_name,
          unit_name: cmpt?.unit_name,
          qty_scheduled: _.isNaN(cmpt?.qty_scheduled) ? 0 : _.toNumber(cmpt?.qty_scheduled),
          qty_loaded: _.isNaN(cmpt?.qty_loaded) ? 0 : _.toNumber(cmpt?.qty_loaded),
          qty_preloaded: _.isNaN(cmpt?.qty_preload) ? 0 : _.toNumber(cmpt?.qty_preload),
        });
      } else {
        item.qty_scheduled += _.isNaN(cmpt?.qty_scheduled) ? 0 : _.toNumber(cmpt?.qty_scheduled);
        item.qty_loaded += _.isNaN(cmpt?.qty_loaded) ? 0 : _.toNumber(cmpt?.qty_loaded);
        item.qty_preloaded += _.isNaN(cmpt?.qty_preload) ? 0 : _.toNumber(cmpt?.qty_preload);
      }
    }
    return products;
  } */

  useEffect(() => {
    if (value && compartmentsPayload) {
      setCompartments(compartmentsPayload.records);
      if (setInit) {
        setInit(compartmentsPayload.records);
      }
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
