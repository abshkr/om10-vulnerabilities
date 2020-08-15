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

const DeliveryBolTemplates = ({
  form,
  value,
  supplier,
  loadNumber,
  loadType,
  templates,
  pageState 
}) => {
  const [selected, setSelected] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [templateItem, setTemplateItem] = useState(undefined);

  // console.log("values: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DLV_BOL_TEMPLATES}?dd_supp_code=${value?.dd_supp_code}&dd_tripord_no=${value?.dd_tripord_no}&dd_ld_type=${value?.dd_ld_type}`
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const handleItemAdd = () => {
    const length = size + 1;

    const line = {
      db_action: '+',
      db_dd_supp_code: supplier,
      db_dd_supp_name: '', // TODO
      db_dd_ld_type: loadType,
      db_dd_load_typename: '', // TODO
      db_dd_tripord_no: loadNumber,
      db_templ_id: !templateItem?.template_code ? '' : templateItem?.template_code,
      editable: false,
      cellClass: 'editable-ag-grid-cell',
    };

    setSize(length);

    tableAPI.updateRowData({ add: [line] });
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  const handleItemSelect = (items) => {
    // console.log('handleItemSelect', items);
    if (items && items[0]) {
      items[0].editable = false;
    }
    // console.log('handleItemSelect222', items);
    setSelected(items);
  };

  const onEditingFinished = (value) => {
    let payload = value.data;

    console.log('onEditingFinished', value, value.colDef);

    tableAPI.updateRowData({ update: [payload] });

    //setSelected([payload]);
    handleItemSelect([payload]);
  };

  const onClick = (value, record) => {
    setTemplateItem(record?.item);
  };

  return (
    <>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        disabled={false}
        onChange={onClick}
        style={{width: '50%'}}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectBolTemplate') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {templates?.records.filter((o)=>(o.template_type==='1')).map((item, index) => (
          <Select.Option key={index} value={item.template_code} item={item}>
            {item.template_name}
          </Select.Option>
        ))}
      </Select>

      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        disabled={!templateItem}
        onClick={handleItemAdd} 
        style={{ marginRight: 5 }}
      >
        {t('operations.addLineItem')}
      </Button>

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={disabled}
        onClick={handleItemRemove}
        style={{ marginBottom: 10 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Form.Item name="ddb_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          parentHeight="15vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          apiContext={setTableAPI}
          selectionMode="single"
          minimal
          onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default DeliveryBolTemplates;
