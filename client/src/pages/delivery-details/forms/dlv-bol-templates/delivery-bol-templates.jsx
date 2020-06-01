import React, { useState, useEffect } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  EyeOutlined,
  CarryOutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';

const DeliveryBolTemplates = ({ form, value, pageState }) => {
  const [selected, setSelected] = useState(null);

  console.log("values: ", value);

  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DLV_BOL_TEMPLATES}?dd_supp_code=${value?.dd_supp_code}
                                 &dd_tripord_no=${value?.dd_tripord_no}
                                 &dd_ld_type=${value?.dd_ld_type}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  return (
    <>

      <Form.Item name="ddb_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          height="60vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          //apiContext={setTableAPI}
          selectionMode="single"
          //onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default DeliveryBolTemplates;
