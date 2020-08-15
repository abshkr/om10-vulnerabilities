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
import { Button, Form, Input, notification } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';

const DddAdditionalInfo = ({
  form,
  value,
  pageState,
  supplier,
  loadNumber,
  loadType,
}) => {
  const [selected, setSelected] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [additionalField, setAdditionalField] = useState(undefined);

  // console.log("values in DddAdditionalInfo: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating, revalidate } = useSWR(
    `${DELIVERY_DETAILS.DDD_ADDL_INFO_READ}?dd_number=${value?.ddd_dd_number}&dd_supp_code=${value?.ddd_dd_supp_code}&dd_tripord_no=${value?.ddd_dd_tripord_no}&dd_ld_type=${value?.ddd_dd_ld_type}&ddd_templ_id=${value?.ddd_templ_id}`
    , { revalidateOnFocus: false }
  );

  const data = payload?.records;
  const isLoading = isValidating || !data;
  
  const onCreate = async (line) => {
    await api
    .post(DELIVERY_DETAILS.DDD_ADDL_INFO_CREATE, line)
    .then((response) => {
      // tableAPI.updateRowData({ add: [line] });
      revalidate();

      notification.success({
        message: t('messages.createSuccess'),
        description: t('descriptions.createSuccess'),
      });
    })
    .catch((errors) => {
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
    .post(DELIVERY_DETAILS.DDD_ADDL_INFO_UPDATE, line)
    .then((response) => {
      // tableAPI.updateRowData({ update: [line] });
      revalidate();

      notification.success({
        message: t('messages.updateSuccess'),
        description: t('messages.updateSuccess'),
      });
    })
    .catch((errors) => {
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
    .post(DELIVERY_DETAILS.DDD_ADDL_INFO_DELETE, line)
    .then((response) => {
      // tableAPI.updateRowData({ remove: line });
      revalidate();

      notification.success({
        message: t('messages.deleteSuccess'),
        description: t('messages.deleteSuccess'),
      });
    })
    .catch((errors) => {
      _.forEach(errors.response.data.errors, (error) => {
        notification.error({
          message: error.type,
          description: error.message,
        });
      });
    });
  };

  const handleItemAdd = () => {
    const length = size + 1;

    const line = {
      ddd_addl_action: '+',
      ddd_dd_supp_code: value?.ddd_dd_supp_code, // supplier
      ddd_dd_supp_name: value?.ddd_dd_supp_name,
      ddd_dd_ld_type: value?.ddd_dd_ld_type, // loadType,
      ddd_dd_load_typename: value?.ddd_dd_load_typename,
      ddd_dd_tripord_no: value?.ddd_dd_tripord_no, //loadNumber,
      ddd_dd_number: value?.ddd_dd_number,
      ddd_templ_id: value?.ddd_templ_id,
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
    onDelete(selected);
    // tableAPI.updateRowData({ remove: selected });
  };

  const handleItemSelect = (items) => {
    // console.log('handleItemSelect', items);
    if (items && items[0]) {
      items[0].editable = true;
      if (!items?.[0]?.ddd_dd_number) {
        items[0].ddd_dd_number = value?.ddd_dd_number;
      }
    }
    // console.log('handleItemSelect222', items);
    setSelected(items);
  };

  const onEditingFinished = (value) => {
    let payload = value.data;

    console.log('onEditingFinished', value, value.colDef);

    onUpdate(payload);
    // tableAPI.updateRowData({ update: [payload] });

    //setSelected([payload]);
    handleItemSelect([payload]);
  };

  const handleValueChange = (event) => {
    setAdditionalField(event?.target?.value);
  }

  return (
    <>
      <Input
        placeholder={t('placeholder.dddAddiFldInfo')}
        onChange={handleValueChange}
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
        style={{ marginBottom: 10 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Form.Item name="ddd_addl_items">
        <DataTable
          columns={fields}
          data={data}
          isLoading={isLoading}
          parentHeight="50vh"
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

export default DddAdditionalInfo;
