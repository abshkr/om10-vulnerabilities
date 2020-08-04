import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable } from '../../../../components';

import compartmentColumns from './compartment-columns';
import productColumns from './product-columns';
import useSWR from 'swr';
import { LOAD_SCHEDULES } from '../../../../api';
import { Switch, Checkbox } from 'antd';

const Summary = ({ value }) => {
  const [hideProd, setHidProd] = useState(false);

  const { data: products } = useSWR(
    value
      ? `${LOAD_SCHEDULES.PRODUCTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { data: compartments } = useSWR(
    value
      ? `${LOAD_SCHEDULES.COMPARTMENTS}?shls_trip_no=${value?.shls_trip_no}&supplier_code=${value?.supplier_code}`
      : null
  );

  const { t } = useTranslation();

  const compartmentFields = compartmentColumns(t);
  const productFields = productColumns(t);

  const onChange = (v) => {
    setHidProd(v.target.checked)
  }

  return (
    <div>
      <Checkbox onChange={onChange}>{t("operations.hideSpecProd")}</Checkbox>
      <div style={{ display: 'flex', width: '100%' }}>
        {/* <div style={{display:'block'}}> */}
        
        {!hideProd && <div style={{ width: '50%', marginRight: 10 }}>
          <DataTable data={products?.records} columns={productFields} parentHeight="300px" minimal />
        </div>
        }
        <div div style={{ width: hideProd ? '100%' : '50%' }}>
          <DataTable data={compartments?.records} columns={compartmentFields} parentHeight="300px" minimal />
        </div>
      </div>
    </div>
  );
};

export default Summary;
