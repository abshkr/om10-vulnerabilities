import React, { useState, useEffect } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, Select, Drawer, Tooltip, notification } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';
import cells from './cells';
import DdiAdditionalInfo from '../ddi-addl-info';

const DeliveryDetailItems = ({
  form,
  value,
  supplier,
  loadNumber,
  loadType,
  supplierName,
  loadTypeName,
  deliveryNumber,
  products,
  pageState,
  tableAPI,
  setTableAPI,
}) => {
  const [selected, setSelected] = useState(null);
  // const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [data, setData] = useState([]);
  const [productItem, setProductItem] = useState(undefined);
  const [ddiAddlInfoVisible, setDdiAddlInfoVisible] = useState(false);

  // console.log("values: ", value);
  // console.log('......................[]+1', ([]+1));

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DD_ITEMS}?dd_number=${value?.dd_number}&dd_supp_code=${value?.dd_supp_code}&dd_tripord_no=${value?.dd_tripord_no}&dd_ld_type=${value?.dd_ld_type}`
    , { revalidateOnFocus: false }
  );

  // const data = payload?.records;
  const isLoading = isValidating || !data;

  const getNextLineNo = () => {
    let nextNo = 0;
    tableAPI.forEachNode((rowNode, index) => {
      if (nextNo < _.toNumber(rowNode?.data?.ddi_line_item_num)) {
        nextNo = _.toNumber(rowNode?.data?.ddi_line_item_num);
      }
    });
    return nextNo + 1;
  };

  const addOneLine = (productItem) => {
    const length = getNextLineNo();

    const line = {
      ddi_action: '+',
      ddi_line_item_num: String(length),
      ddi_dd_supp_code: supplier,
      ddi_prod_cmpyname: supplierName, // TODO
      ddi_dd_ld_type: loadType,
      ddi_dd_tripord_no: loadNumber,
      ddi_dd_number: !value ? deliveryNumber : value?.dd_number,
      ddi_item_cat: '',
      ddi_cmpt_num: !productItem?.ddi_cmpt_num ? '' : productItem?.ddi_cmpt_num,
      ddi_cmpy_code: !productItem?.ddi_cmpy_code ? supplier: productItem?.ddi_cmpy_code,
      ddi_prod_code: !productItem?.ddi_prod_code ? '' : productItem?.ddi_prod_code,
      ddi_prod_name: !productItem?.ddi_prod_name ? '' : productItem?.ddi_prod_name,
      ddi_qty: !productItem?.ddi_qty ? '' : productItem?.ddi_qty,
      ddi_unit: !productItem?.ddi_unit ? '5' : productItem?.ddi_unit,
      ddi_unit_name: !productItem?.ddi_unit_name ? 'l(amb)' : productItem?.ddi_unit_name,
      ddi_item_desc: !productItem?.ddi_prod_name ? '' : productItem?.ddi_prod_name,
      ddi_duty_code: '',
      ddi_excise_lic_num: '',
      ddi_ref_doc_num: '',
      ddi_site_capacity: '',
      ddi_tank_code: '',
      editable: true,
      cellClass: 'editable-ag-grid-cell',
    };

    setSize(length);

    tableAPI.updateRowData({ add: [line] });
  };

  const handleItemAdd = () => {
    // setLineDeleteDisabled(true);
    // setLineEditDisabled(true);

    const length = getNextLineNo();
    if (length > 1) {
      addOneLine(productItem);
    } else {
      _.forEach(products?.records, (item) => {
        addOneLine(item);
      });
    }
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  const handleItemSelect = (items) => {
    // console.log('handleItemSelect', items);
    if (items && items[0]) {
      items[0].editable = true; // items?.[0]?.mvitm_status === 0 && !items?.[0]?.mvitm_completed;
      if (!items?.[0]?.ddi_dd_number) {
        items[0].ddi_dd_number = !value ? deliveryNumber : value?.dd_number;
      }
    }
    // console.log('handleItemSelect222', items);
    setSelected(items);
  };

  const onCellValidation = (input, line, rule) => {
    /*
      rule:
      {
        code: 'ddi_dd_number',
        label: t('fields.ddiDdNumber'),
        dataType: 'STRING',
        maxLength: 40,
        editable: false,
        required: true,
        precision: null,
        min: null,
        max: null,
      }
    */
    const errors = [];

    if ((rule.required && input === '') || (rule.required && !input)) {
      errors.push({
        key: String(line) + ':' + rule.code + '_required',
        field: rule.label + ' [' + t('fields.line') + ' ' + line + ']',
        message: `${t('validate.set')} ─ ${rule.label}`
      });
    }

    const len = (new TextEncoder().encode(input)).length;
    if ((rule.maxLength !== undefined && rule.maxLength !== null) && input && len > rule.maxLength) {
      errors.push({
        key: String(line) + ':' + rule.code + '_maxlen',
        field: rule.label + ' [' + t('fields.line') + ' ' + line + ']',
        message: `${t('placeholder.maxCharacters')}: ${rule.maxLength} ─ ${t('descriptions.maxCharacters')}`
      });
    }

    if (rule.dataType === 'STRING') {

    }

    if (rule.dataType === 'NUMBER') {
      const number = _.toNumber(input);
      const invalid = _.isNaN(number);
  
      const decimals = _.toString(number).split('.')[1]?.length || 0;
      
      if (input && input !== '' && invalid) {
        errors.push({
          key: String(line) + ':' + rule.code + '_invalid',
          field: rule.label + ' [' + t('fields.line') + ' ' + line + ']',
          message: `${t('validate.wrongType')}: ${t('validate.mustBeNumber')}`
        });
      }
  
      if (rule.precision !== undefined && rule.precision !== null && decimals > rule.precision) {
        errors.push({
          key: String(line) + ':' + rule.code + '_precision',
          field: rule.label + ' [' + t('fields.line') + ' ' + line + ']',
          message: `${t('validate.decimalPlacesExceeded')} ${rule.precision} ─ ${t('descriptions.invalidDecimals')}`
        });
      }
  
      if (rule.max !== undefined && rule.max !== null && input !== '' && !invalid && number > rule.max) {
        errors.push({
          key: String(line) + ':' + rule.code + '_maximum',
          field: rule.label + ' [' + t('fields.line') + ' ' + line + ']',
          message: `${t('validate.outOfRangeMax')} ${rule.max} ─ ${t('descriptions.maxNumber')}`
        });
      }
  
      if (rule.min !== undefined && rule.min !== null && input !== '' && !invalid && number < rule.min) {
        errors.push({
          key: String(line) + ':' + rule.code + '_minimum',
          field: rule.label + ' [' + t('fields.line') + ' ' + line + ']',
          message: `${t('validate.outOfRangeMin')} ${rule.min} ─ ${t('descriptions.minNumber')}`
        });
      }
  
    }

    _.forEach(errors, error => {
      notification.error({
        message: error.field,
        description: error.message,
        key: error.key
      });
    });

    return errors;
  };

  const onEditingFinished = (value) => {
    let payload = value.data;

    console.log('onEditingFinished', value, value.colDef);

    const rule = _.find(cells(t), (o) => (o.code ===value.colDef.field));
    console.log('onEditingFinished, rule', rule);

    const errors = onCellValidation(payload[value.colDef.field], payload?.ddi_line_item_num, rule);

    if (errors.length > 0) {
      payload[value.colDef.field] = '';
    }

    tableAPI.updateRowData({ update: [payload] });

    //setSelected([payload]);
    handleItemSelect([payload]);
  };

  const onClick = (value, record) => {
    setProductItem(record?.item);
  };

  useEffect(() => {
    if (payload) {
      setData(payload?.records);
      setSize(payload?.records?.length);
    }
  }, [payload, setData, setSize]);

  return (
    <>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        disabled={false}
        onChange={onClick}
        style={{width: '50%'}}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDdiProduct') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {products?.records?.map((item, index) => (
          <Select.Option key={index} value={item.ddi_prod_code} item={item}>
            {item.item_desc}
          </Select.Option>
        ))}
      </Select>

      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        // disabled={!(productItem || size===0)}
        disabled={!productItem && (productItem || !(products?.records?.length>0) || size>0)}
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
        style={{ marginBottom: 10, marginRight: 5 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Tooltip 
        placement="topLeft" 
        title={t('tabColumns.ddiAddlInfo')}
      >
        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ float: 'right', marginRight: 5 }}
          disabled={disabled || selected?.[0]?.ddi_action==='+'}
          onClick={() => setDdiAddlInfoVisible(true)}
        >
          {t('operations.additionalInfo')}
        </Button>
      </Tooltip>

      {ddiAddlInfoVisible && (
        <Drawer
          title={t('tabColumns.ddiAddlInfo')}
          placement="right"
          bodyStyle={{ paddingTop: 40, paddingRight: 30 }}
          onClose={() => setDdiAddlInfoVisible(false)}
          visible={ddiAddlInfoVisible}
          width="50vw"
        >
          <DdiAdditionalInfo
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

      <Form.Item name="ddi_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          parentHeight="20vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          apiContext={setTableAPI}
          selectionMode="single"
          minimal
          autoColWidth
          onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default DeliveryDetailItems;
