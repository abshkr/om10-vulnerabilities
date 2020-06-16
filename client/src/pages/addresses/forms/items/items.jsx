import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'antd';
import _ from 'lodash';

import { DataTable } from '../../../../components';
import { ADDRESSES } from '../../../../api';

import columns from './columns';

const Items = ({ setTableAPIContext, value, addressCode }) => {
  const [lineAddDisabled, setLineAddDisabled] = useState(false);
  const [lineEditDisabled, setLineEditDisabled] = useState(true);
  const [lineDeleteDisabled, setLineDeleteDisabled] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState(value?.length);

  const { t } = useTranslation();

  const disabled = selected.length === 0;
  const canModifyFurther =
    selected[0]?.address_action === '+' || selected[0]?.address_action === '*' || disabled;
  const fields = columns(value, selected);

  const getNextLineNo = () => {
    let nextNo = 0;
    tableAPI.forEachNode((rowNode, index) => {
      if (nextNo < _.toNumber(rowNode?.data?.db_addrline_no)) {
        nextNo = _.toNumber(rowNode?.data?.db_addrline_no);
      }
    });
    return nextNo + 1;
  };

  const adjustModifiers = (options) => {
    if (options === null || options === undefined || options?.length === 0) {
      setLineDeleteDisabled(true);
      setLineEditDisabled(true);
      return;
    }

    const option = selected[0];

    if (option?.address_action === '+') {
      setLineDeleteDisabled(false);
      setLineEditDisabled(true);
    } else if (option?.address_action === '-') {
      setLineDeleteDisabled(false);
      setLineEditDisabled(true);
    } else if (option?.address_action === '*') {
      setLineDeleteDisabled(false);
      setLineEditDisabled(true);
    } else {
      setLineDeleteDisabled(false);
      setLineEditDisabled(false);
    }
  };

  const handleItemSelect = (options) => {
    setSelected(options);
    adjustModifiers(options);
  };

  const handleItemAdd = () => {
    setLineDeleteDisabled(true);
    setLineEditDisabled(true);

    //setSize(value?.length);
    const length = getNextLineNo();

    const option = {
      address_action: '+',
      db_addr_line_id: addressCode,
      db_addrline_no: length,
      db_addr_line_type: '',
      db_addr_line_typename: '',
      db_addr_line: '',
      editable: true,
    };

    setSize(length);

    tableAPI.updateRowData({ add: [option] });
    //adjustModifiers([option]);
    //handleItemSelect([option]);
  };

  const handleItemEdit = () => {
    setLineDeleteDisabled(true);
    setLineEditDisabled(true);

    const option = selected[0];
    option.address_action = '*';

    setSelected([option]);

    tableAPI.updateRowData({ update: [option] });
    adjustModifiers([option]);
  };

  const handleItemRemove = () => {
    setLineDeleteDisabled(true);
    setLineEditDisabled(true);

    const option = selected[0];

    if (option?.address_action === '+') {
      tableAPI.updateRowData({ remove: [option] });
    } else if (option?.address_action === '-') {
      option.address_action = '';
      tableAPI.updateRowData({ update: [value] });
    } else if (
      option?.address_action === '' ||
      option?.address_action === null ||
      option?.address_action === undefined
    ) {
      option.address_action = '-';
      tableAPI.updateRowData({ update: [option] });
    } else {
    }

    adjustModifiers([option]);
  };

  const onEditingFinished = (value) => {
    let payload = value.data;

    tableAPI.updateRowData({ update: [payload] });

    setSelected([payload]);
  };

  useEffect(() => {
    if (tableAPI) {
      setTableAPIContext(tableAPI);
    }
  }, [tableAPI, setTableAPIContext]);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        disabled={lineAddDisabled}
        onClick={handleItemAdd}
        style={{ marginRight: 5 }}
      >
        {t('operations.addLineItem')}
      </Button>

      {/*
      <Button
        type="primary"
        icon={<EditOutlined />}
        disabled={lineEditDisabled}
        onClick={handleItemEdit}
        style={{ marginBottom: 10 }}
      >
        {t('operations.editLineItem')}
      </Button>
      */}
      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={lineDeleteDisabled}
        onClick={handleItemRemove}
        style={{ marginBottom: 10 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Form.Item name="addr_lines">
        <DataTable
          columns={fields}
          data={value}
          height="42vh"
          onClick={(payload) => handleItemSelect([payload])}
          handleSelect={(payload) => handleItemSelect(payload)}
          apiContext={setTableAPI}
          selectionMode="single"
          onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default Items;
