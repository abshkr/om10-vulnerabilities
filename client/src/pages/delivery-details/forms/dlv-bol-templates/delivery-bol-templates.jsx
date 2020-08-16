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
import { Button, Form, Select, notification, Row, Col } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';

const DeliveryBolTemplates = ({
  pageState,
  supplier,
  loadNumber,
  loadType,
  templates,
}) => {
  // const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [templateItem, setTemplateItem] = useState(undefined);

  // console.log("DeliveryBolTemplates - values: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DLV_BOL_TEMPLATES}?dd_supp_code=${supplier}&dd_tripord_no=${loadNumber}&dd_ld_type=${loadType}`
    , { revalidateOnFocus: false }
  );

  let data = payload?.records;
  const isLoading = isValidating || !data;
  
  const onCreate = async (line) => {
    await api
    .post(DELIVERY_DETAILS.DELV_BOL_CREATE, line)
    .then((response) => {
      tableAPI.updateRowData({ add: [line] });
      setTemplateItem(undefined);
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
    .post(DELIVERY_DETAILS.DELV_BOL_UPDATE, line)
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
    .post(DELIVERY_DETAILS.DELV_BOL_DELETE, line)
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
      nextNo += 1;
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
      db_action: '+',
      db_supp_code: supplier,
      db_supp_name: '', // TODO
      db_ld_type: loadType,
      db_load_typename: '', // TODO
      db_tripord_no: loadNumber,
      db_templ_id: !templateItem?.template_code ? '' : templateItem?.template_code,
      editable: false,
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
      items[0].editable = false;
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
    console.log('DeliveryBolTemplates: onCellUpdate', value);

    let payload = value.data;

    if (value?.newValue !== value?.oldValue) {
      onUpdate(payload);
      // tableAPI.updateRowData({ update: [payload] });
    }

    //setSelected([payload]);
    handleItemSelect([payload]);
  };

  const onClick = (value, record) => {
    setTemplateItem(record?.item);
  };

  useEffect(() => {
    if (payload) {
      setSize(payload?.records?.length);
    }
  }, [payload, setSize]);

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
        placeholder={!templateItem ? t('placeholder.selectBolTemplate') : null}
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

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={size === 0}
        onClick={handleItemRemoveAll}
        style={{ marginBottom: 10 }}
      >
        {t('operations.removeAll')}
      </Button>

      <Form.Item name="ddb_items">
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

export default DeliveryBolTemplates;
