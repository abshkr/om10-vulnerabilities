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
import { Button, Form, Select, Drawer, Tooltip } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';
import DddAdditionalInfo from '../ddd-addl-info';

const DeliveryNoteTemplates = ({
  form,
  value,
  supplier,
  loadNumber,
  loadType,
  supplierName,
  loadTypeName,
  deliveryNumber,
  pageState,
  tableAPI,
  setTableAPI,
}) => {
  const [selected, setSelected] = useState(null);
  // const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [templateItem, setTemplateItem] = useState(undefined);
  const [templateList, setTemplateList] = useState([]);
  const [dddAddlInfoVisible, setDddAddlInfoVisible] = useState(false);

  // console.log("values: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: templates } = useSWR(`${DELIVERY_DETAILS.TEMPLATES}?tmpl_type=2`);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DD_DN_TEMPLATES}?dd_number=${value?.dd_number}&dd_supp_code=${value?.dd_supp_code}&dd_tripord_no=${value?.dd_tripord_no}&dd_ld_type=${value?.dd_ld_type}`,
    { revalidateOnFocus: false }
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const adjustTemplates = (templates, records) => {
    const list = [];
    _.forEach(templates, (item) => {
      const found = _.find(records, (o) => o.ddd_templ_id === item.template_code);
      if (found !== undefined) {
        item.template_used = true;
      } else {
        item.template_used = false;
      }
      list.push(item);
    });
    return list;
  };

  const adjustRecords = () => {
    let size = 0;
    const payload = [];

    tableAPI.forEachNode((rowNode, index) => {
      size = size + 1;
      payload.push(rowNode?.data);
    });
    setSize(size);
    const list = adjustTemplates(templateList, payload);
    setTemplateList(list);
  };

  const handleItemAdd = () => {
    const length = size + 1;

    const line = {
      ddd_action: '+',
      ddd_dd_supp_code: supplier,
      ddd_dd_supp_name: supplierName,
      ddd_dd_ld_type: loadType,
      ddd_dd_load_typename: loadTypeName,
      ddd_dd_tripord_no: loadNumber,
      ddd_dd_number: !value ? deliveryNumber : value?.dd_number,
      ddd_templ_id: !templateItem?.template_code ? '' : templateItem?.template_code,
      editable: false,
      cellClass: 'editable-ag-grid-cell',
    };

    setSize(length);

    tableAPI.updateRowData({ add: [line] });
    setTemplateItem(undefined);
    adjustRecords();
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
    adjustRecords();
    // setSelected(null);
  };

  const handleItemSelect = (items) => {
    // console.log('handleItemSelect', items);
    if (items && items[0]) {
      items[0].editable = false;
      if (!items?.[0]?.ddd_dd_number) {
        items[0].ddd_dd_number = !value ? deliveryNumber : value?.dd_number;
      }
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

  useEffect(() => {
    if (payload) {
      setSize(payload?.records?.length);
      if (templates) {
        const list = adjustTemplates(templates?.records, payload?.records);
        setTemplateList(list);
      }
    }
  }, [payload, setSize, templates, setTemplateList]);

  return (
    <>
      <Select
        popupMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        value={templateItem?.template_code}
        disabled={false}
        onChange={onClick}
        style={{ width: '50%' }}
        optionFilterProp="children"
        // placeholder={!templateItem ? t('placeholder.selectDnTemplate') : null}
        placeholder={t('placeholder.selectDnTemplate')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {templateList?.map((item, index) => (
          <Select.Option key={index} value={item.template_code} item={item} disabled={item.template_used}>
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

      <Tooltip placement="topLeft" title={t('tabColumns.dddAddlInfo')}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={disabled || selected?.[0]?.ddd_action === '+'}
          onClick={() => setDddAddlInfoVisible(true)}
        >
          {t('operations.additionalInfo')}
        </Button>
      </Tooltip>

      {dddAddlInfoVisible && (
        <Drawer
          title={t('tabColumns.dddAddlInfo')}
          placement="right"
          styles={{ body: { paddingTop: 40, paddingRight: 30 } }}
          onClose={() => setDddAddlInfoVisible(false)}
          open={dddAddlInfoVisible}
          width="50vw"
        >
          <DddAdditionalInfo
            form={form}
            value={selected?.[0]}
            pageState={pageState}
            supplier={supplier}
            loadNumber={loadNumber}
            loadType={loadType}
            supplierName={supplierName}
            loadTypeName={loadTypeName}
          />
        </Drawer>
      )}

      <Form.Item name="ddd_items">
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

export default DeliveryNoteTemplates;
