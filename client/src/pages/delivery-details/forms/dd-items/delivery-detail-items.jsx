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

const DeliveryDetailItems = ({ form, value, pageState }) => {
  const [selected, setSelected] = useState(null);

  console.log("values: ", value);

  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DD_ITEMS}?dd_number=${value?.dd_number}&dd_supp_code=${value?.dd_supp_code}&dd_tripord_no=${value?.dd_tripord_no}&dd_ld_type=${value?.dd_ld_type}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  return (
    <>
      <Form.Item name="ddi_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          parentHeight="20vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          //apiContext={setTableAPI}
          selectionMode="single"
          minimal
          autoColWidth
          //onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default DeliveryDetailItems;
