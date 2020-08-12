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
import { Button, Form, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';

const DeliveryNoteTemplates = ({
  form,
  value,
  supplier,
  loadNumber,
  loadType,
  templates,
  pageState 
}) => {
  const [selected, setSelected] = useState(null);

  console.log("values: ", value);

  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DD_DN_TEMPLATES}?dd_number=${value?.dd_number}&dd_supp_code=${value?.dd_supp_code}&dd_tripord_no=${value?.dd_tripord_no}&dd_ld_type=${value?.dd_ld_type}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemSelect = (options) => {
    setSelected(options);
    //adjustModifiers(options);
  };

  return (
    <>
      <Form.Item
        name="ddd_templates"
        label=''
      >
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          showSearch
          disabled={false}
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectDnTemplate') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {templates?.records.filter((o)=>(o.template_type==='2')).map((item, index) => (
            <Select.Option key={index} value={item.template_code}>
              {item.template_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="ddd_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          parentHeight="15vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          //apiContext={setTableAPI}
          selectionMode="single"
          minimal
          //onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default DeliveryNoteTemplates;
