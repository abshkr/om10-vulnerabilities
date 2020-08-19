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
import { Button, Form, Input, notification, Row, Col } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';

const DdiAdditionalInfo = ({
  form,
  value,
  pageState,
  supplier,
  loadNumber,
  loadType,
  supplierName,
  loadTypeName,
}) => {
  // const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [additionalField, setAdditionalField] = useState('');

  // console.log("values in DdiAdditionalInfo: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating, revalidate } = useSWR(
    `${DELIVERY_DETAILS.DDI_ADDL_INFO_READ}?dd_number=${value?.ddi_dd_number}&dd_supp_code=${value?.ddi_dd_supp_code}&dd_tripord_no=${value?.ddi_dd_tripord_no}&dd_ld_type=${value?.ddi_dd_ld_type}&ddi_line_item_num=${value?.ddi_line_item_num}`
    , { revalidateOnFocus: false }
  );

  let data = payload?.records;
  const isLoading = isValidating || !data;
  
  const onCreate = async (line) => {
    await api
    .post(DELIVERY_DETAILS.DDI_ADDL_INFO_CREATE, line)
    .then((response) => {
      tableAPI.updateRowData({ add: [line] });
      setAdditionalField('');
      // revalidate();
      // adjustPayload();
      setDataSize();

      notification.success({
        message: t('messages.createSuccess'),
        description: t('descriptions.createSuccess'),
      });
    })
    .catch((errors) => {
      setDataSize();
      _.forEach(errors.response.data.errors, (error) => {
        notification.error({
          message: error.type,
          description: error.message,
        });
      });
    });
  };
  
  const onUpdate = async (line) => {
    await api
    .post(DELIVERY_DETAILS.DDI_ADDL_INFO_UPDATE, line)
    .then((response) => {
      tableAPI.updateRowData({ update: [line] });
      // revalidate();
      // adjustPayload();
      setDataSize();

      notification.success({
        message: t('messages.updateSuccess'),
        description: t('messages.updateSuccess'),
      });
    })
    .catch((errors) => {
      setDataSize();
      _.forEach(errors.response.data.errors, (error) => {
        notification.error({
          message: error.type,
          description: error.message,
        });
      });
    });
  };
  
  const onDelete = async (line) => {
    await api
    .post(DELIVERY_DETAILS.DDI_ADDL_INFO_DELETE, line)
    .then((response) => {
      tableAPI.updateRowData({ remove: [line] });
      // revalidate();
      // adjustPayload();
      setDataSize();

      notification.success({
        message: t('messages.deleteSuccess'),
        description: t('messages.deleteSuccess'),
      });
    })
    .catch((errors) => {
      setDataSize();
      _.forEach(errors.response.data.errors, (error) => {
        notification.error({
          message: error.type,
          description: error.message,
        });
      });
    });
  };

  const adjustPayload = () => {
    const payload = [];
    tableAPI.forEachNode((rowNode, index) => {
      payload.push(rowNode?.data);
    });
    data = payload; // setData(payload);
  };

  const getNextLineNo = () => {
    let nextNo = 0;
    tableAPI.forEachNode((rowNode, index) => {
      if (nextNo < _.toNumber(rowNode?.data?.addi_fld_line_no)) {
        nextNo = _.toNumber(rowNode?.data?.addi_fld_line_no);
      }
    });
    return nextNo + 1;
  };

  const setDataSize = () => {
    let size = 0;
    
    tableAPI.forEachNode((rowNode, index) => {
      size = size + 1;
    });
    setSize(size);
  };

  const handleItemAdd = () => {
    const length = getNextLineNo();

    const line = {
      ddi_addl_action: '+',
      ddi_dd_supp_code: value?.ddi_dd_supp_code, // supplier,
      ddi_dd_supp_name: value?.ddi_dd_supp_name, // supplierName,
      ddi_dd_ld_type: value?.ddi_dd_ld_type, // loadType,
      ddi_dd_load_typename: value?.ddi_dd_load_typename, // loadTypeName,
      ddi_dd_tripord_no: value?.ddi_dd_tripord_no, //loadNumber,
      ddi_dd_number: value?.ddi_dd_number,
      ddi_line_item_num: value?.ddi_line_item_num,
      addi_fld_line_no: length,
      addi_fld_info: additionalField,
      editable: true,
      cellClass: 'editable-ag-grid-cell',
    };

    setSize(length);

    onCreate(line);
    // tableAPI.updateRowData({ add: [line] });
  };

  const handleItemRemove = () => {
    onDelete(selected?.[0]);
    // tableAPI.updateRowData({ remove: selected });
  };

  const handleItemRemoveAll = () => {
    tableAPI.forEachNode((rowNode, index) => {
      onDelete(rowNode?.data);
    });
    // tableAPI.updateRowData({ remove: selected });
  };

  const handleItemSelect = (items) => {
    // console.log('handleItemSelect', items);
    if (items && items[0]) {
      items[0].editable = true;
      if (!items?.[0]?.ddi_dd_number) {
        items[0].ddi_dd_number = value?.ddi_dd_number;
      }
    }
    // console.log('handleItemSelect222', items);
    setSelected(items);
  };

  /* const onEditingFinished = (value) => {
    let payload = value.data;

    console.log('onEditingFinished', value, value.colDef);

    onUpdate(payload);
    // tableAPI.updateRowData({ update: [payload] });

    //setSelected([payload]);
    handleItemSelect([payload]);
  }; */

  const validateString = (required, input, type, maxLength, label, line) => {
    const errors = [];

    if ((required && input === '') || (required && !input)) {
      errors.push({
        key: String(line) + ':' + label,
        field: label + ' [' + t('fields.line') + ' ' + line + ']',
        message: `${t('validate.set')} ─ ${label}`
      });
    }

    const len = (new TextEncoder().encode(input)).length;
    if (maxLength != undefined && input && len > maxLength) {
      errors.push({
        key: String(line) + ':' + label,
        field: label + ' [' + t('fields.line') + ' ' + line + ']',
        message: `${t('placeholder.maxCharacters')}: ${maxLength} ─ ${t('descriptions.maxCharacters')}`
      });
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

  const onCellUpdate = (value) => {
    console.log('DdiAdditionalInfo: onCellUpdate', value);

    let payload = value.data;

    const errors = validateString(true, value?.newValue, 'text', 420, t('fields.dddAddiFldInfo'), payload?.addi_fld_line_no);

    if (value?.newValue !== value?.oldValue && errors.length === 0) {
      onUpdate(payload);
      // tableAPI.updateRowData({ update: [payload] });
    }

    //setSelected([payload]);
    handleItemSelect([payload]);
  };

  const handleValueChange = (event) => {
    setAdditionalField(event?.target?.value);
  }

  useEffect(() => {
    if (payload) {
      setSize(payload?.records?.length);
    }
  }, [payload, setSize]);

  return (
    <>
      <Row gutter={[8, 10]}>
        <Col span={8}>
          {t('fields.ddiDdSuppCode') + ' : ' + value?.ddi_dd_supp_code}
        </Col>
        <Col span={8}>
          {t('fields.ddiDdSuppName') + ' : ' + value?.ddi_dd_supp_name}
        </Col>
        <Col span={8}>
          {t('fields.ddiDdLoadTypeName') + ' : ' + value?.ddi_dd_load_typename}
        </Col>
      </Row>
      <Row gutter={[8, 10]}>
        <Col span={8}>
          {t('fields.ddiDdTripOrdNo') + ' : ' + value?.ddi_dd_tripord_no}
        </Col>
        <Col span={8}>
          {t('fields.ddiDdNumber') + ' : ' + value?.ddi_dd_number}
        </Col>
        <Col span={8}>
          {t('fields.ddiLineItemNum') + ' : ' + value?.ddi_line_item_num}
        </Col>
      </Row>

      <Input
        style={{width: '40%'}}
        placeholder={t('fields.ddiAddiFldInfo')}
        onChange={handleValueChange}
        value={additionalField}
      />

      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        disabled={!additionalField}
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

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={size === 0 || !data}
        onClick={handleItemRemoveAll}
        style={{ marginBottom: 10 }}
      >
        {t('operations.removeAll')}
      </Button>

      <Form.Item name="ddi_addl_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          // parentHeight="15vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          apiContext={setTableAPI}
          selectionMode="single"
          minimal
          // onEditingFinished={onEditingFinished}
          onCellUpdate={(value) => onCellUpdate(value)}
        />
      </Form.Item>
    </>
  );
};

export default DdiAdditionalInfo;
