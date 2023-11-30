import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form, Select, notification } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import api, { DELIVERY_DETAILS } from '../../../../api';

import columns from './columns';

const DeliveryBolTemplates = ({ pageState, supplier, loadNumber, loadType, supplierName, loadTypeName }) => {
  // const [data, setData] = useState(undefined);
  const [selected, setSelected] = useState(null);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(0);
  const [templateItem, setTemplateItem] = useState(undefined);
  const [templateList, setTemplateList] = useState([]);
  const [clickedIns, setClickedIns] = useState(false);
  const [clickedDel, setClickedDel] = useState(false);
  const [clickedClr, setClickedClr] = useState(false);

  // console.log("DeliveryBolTemplates - values: ", value);

  const disabled = selected?.length === 0 || !selected;
  const { t } = useTranslation();
  const fields = columns(t, pageState);

  const { data: templates } = useSWR(`${DELIVERY_DETAILS.TEMPLATES}?tmpl_type=1`);

  const { data: payload, isValidating } = useSWR(
    `${DELIVERY_DETAILS.DLV_BOL_TEMPLATES}?dd_supp_code=${supplier}&dd_tripord_no=${loadNumber}&dd_ld_type=${loadType}`,
    { revalidateOnFocus: false }
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
        adjustRecords();

        notification.success({
          message: t('messages.createSuccess'),
          description: t('descriptions.createSuccess'),
        });

        setClickedIns(false);
      })
      .catch((errors) => {
        adjustRecords();
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setClickedIns(false);
      });
  };

  const onUpdate = async (line) => {
    await api
      .post(DELIVERY_DETAILS.DELV_BOL_UPDATE, line)
      .then((response) => {
        tableAPI.updateRowData({ update: [line] });
        // revalidate();
        // adjustPayload();
        adjustRecords();

        notification.success({
          message: t('messages.updateSuccess'),
          description: t('messages.updateSuccess'),
        });
      })
      .catch((errors) => {
        adjustRecords();
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
        adjustRecords();

        notification.success({
          message: t('messages.deleteSuccess'),
          description: t('messages.deleteSuccess'),
        });

        setClickedDel(false);
        setClickedClr(false);
      })
      .catch((errors) => {
        adjustRecords();
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
        setClickedDel(false);
        setClickedClr(false);
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

  const adjustTemplates = (templates, records) => {
    const list = [];
    _.forEach(templates, (item) => {
      const found = _.find(records, (o) => o.db_templ_id === item.template_code);
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
    setClickedIns(true);
    const length = getNextLineNo();

    const line = {
      db_action: '+',
      db_supp_code: supplier,
      db_supp_name: supplierName,
      db_ld_type: loadType,
      db_load_typename: loadTypeName,
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
    setClickedDel(true);
    onDelete(selected?.[0]);
    // tableAPI.updateRowData({ remove: selected });
  };

  const handleItemRemoveAll = () => {
    setClickedClr(true);
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
        // placeholder={!templateItem ? t('placeholder.selectBolTemplate') : null}
        placeholder={t('placeholder.selectBolTemplate')}
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
        disabled={!templateItem || clickedIns}
        onClick={handleItemAdd}
        style={{ marginRight: 5 }}
      >
        {t('operations.addLineItem')}
      </Button>

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={disabled || clickedDel}
        onClick={handleItemRemove}
        style={{ marginBottom: 10, marginRight: 5 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={size === 0 || clickedClr}
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
