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

const DddAdditionalInfo = ({
  form,
  value,
  pageState,
  supplier,
  loadNumber,
  loadType,
}) => {
  // const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [additionalField, setAdditionalField] = useState('');

  // console.log("values in DddAdditionalInfo: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState, form);

  const { data: payload, isValidating, revalidate } = useSWR(
    `${DELIVERY_DETAILS.DDD_ADDL_INFO_READ}?dd_number=${value?.ddd_dd_number}&dd_supp_code=${value?.ddd_dd_supp_code}&dd_tripord_no=${value?.ddd_dd_tripord_no}&dd_ld_type=${value?.ddd_dd_ld_type}&ddd_templ_id=${value?.ddd_templ_id}`
    , { revalidateOnFocus: false }
  );

  let data = payload?.records;
  const isLoading = isValidating || !data;
  
  const onCreate = async (line) => {
    await api
    .post(DELIVERY_DETAILS.DDD_ADDL_INFO_CREATE, line)
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
    .post(DELIVERY_DETAILS.DDD_ADDL_INFO_UPDATE, line)
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
    .post(DELIVERY_DETAILS.DDD_ADDL_INFO_DELETE, line)
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
      if (!items?.[0]?.ddd_dd_number) {
        items[0].ddd_dd_number = value?.ddd_dd_number;
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

  const onCellUpdate = (value) => {
    console.log('DdiAdditionalInfo: onCellUpdate', value);

    let payload = value.data;

    if (value?.newValue !== value?.oldValue) {
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
          {t('fields.dddDdSuppCode') + ' : ' + value?.ddd_dd_supp_code}
        </Col>
        <Col span={8}>
          {t('fields.dddDdSuppName') + ' : ' + value?.ddd_dd_supp_name}
        </Col>
        <Col span={8}>
          {t('fields.dddDdLoadTypeName') + ' : ' + value?.ddd_dd_load_typename}
        </Col>
      </Row>
      <Row gutter={[8, 10]}>
        <Col span={8}>
          {t('fields.dddDdTripOrdNo') + ' : ' + value?.ddd_dd_tripord_no}
        </Col>
        <Col span={8}>
          {t('fields.dddDdNumber') + ' : ' + value?.ddd_dd_number}
        </Col>
        <Col span={8}>
          {t('fields.dddTemplId') + ' : ' + value?.ddd_templ_id}
        </Col>
      </Row>

      <Input
        style={{width: '40%'}}
        placeholder={t('fields.dddAddiFldInfo')}
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
        style={{ marginBottom: 10 }}
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

      <Form.Item name="ddd_addl_items">
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

export default DddAdditionalInfo;
