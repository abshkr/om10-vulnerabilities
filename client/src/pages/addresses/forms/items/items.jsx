import React, { useState, useEffect, useCallback } from 'react';
import {
  EditOutlined,
  PlusOutlined,
  MinusOutlined,
  EyeOutlined,
  CarryOutOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, notification, Form } from 'antd';
import useSWR from 'swr';
import axios from 'axios';
import _ from 'lodash';

import { ROUTES } from '../../../../constants';
import { DataTable } from '../../../../components';
import { ADDRESSES } from '../../../../api';

import columns from './columns';

const Items = ({ form, setTableAPIContext, value, addressCode }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  //let addressCode = code;//value?.db_address_key;
  //let payload = null;
  //const { data: payload } = useSWR(`${ADDRESSES.LINES}?address_code=${addressCode}`, { refreshInterval: 0 });
  //const { data: payload, isValidating, revalidate } = useSWR(
  //  `${ADDRESSES.LINES}?address_code=${addressCode}`
  //);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchByAddress = useCallback(
    (code) => {
      setLoading(true);

      axios.get(`${ADDRESSES.LINES}?address_code=${code}`).then((response) => {
        setData(response.data.records);
        setFieldsValue({ addr_lines: response.data.records });
        setLoading(false);
      });
    },
    [setFieldsValue]
  );


  /*
    // get the address lines by the address code (value.db_address_key)
    axios
      .post(
        ADDRESSES.LINES, {
        address_code: value?.db_address_key
      })
      .then(response => {
        payload = response;
        data = response.records;
        //value.db_address_lines = response.records;
      })
      .catch((errors) => {
        _.forEach(errors.response.data.errors, (error) => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  */
  const disabled = selected.length === 0;
  let lineAddDisabled = false;
  let lineEditDisabled = true;
  let lineDeleteDisabled = true;
  const canModifyFurther =
    selected[0]?.address_action === '+' || selected[0]?.address_action === '*' || disabled;
  const fields = columns(value, selected);

  const handleItemSelect = (value) => {
    setSelected(value);
    if (selected == null) {
      lineDeleteDisabled = true;
      lineEditDisabled = true;
      return;
    }

    if (selected.address_action === '+') {
      lineDeleteDisabled = false;
      lineEditDisabled = true;
    } else if (selected.address_action === '-') {
      lineDeleteDisabled = false;
      lineEditDisabled = true;
    } else if (selected.address_action === '*') {
      lineDeleteDisabled = false;
      lineEditDisabled = true;
    } else {
      lineDeleteDisabled = false;
      lineEditDisabled = false;
    }
  };

  const handleItemAdd = () => {
    lineEditDisabled = true;
    lineDeleteDisabled = true;

    const length = size + 1;

    const value = {
      address_action: '+',
      db_addr_line_id: addressCode,
      db_addrline_no: String(size + 1),
      db_addr_line_type: '',
      db_addr_line_typename: '',
      db_addr_line: '',
      editable: true,
    };

    setSize(length);

    tableAPI.updateRowData({ add: [value] });
  };

  const handleItemRemove = () => {
    lineEditDisabled = true;
    lineDeleteDisabled = true;
    if (selected.address_action === '+') {
      tableAPI.updateRowData({ remove: selected });
    } else if (selected.address_action === '-') {
      let dataSelected = selected[0];
      dataSelected.address_action = '';
      tableAPI.updateRowData({ update: dataSelected });
    } else if (selected.address_action === '') {
      let dataSelected = selected[0];
      dataSelected.address_action = '-';
      tableAPI.updateRowData({ update: dataSelected });
    } else {
    }
  };

  const onEditingFinished = (value) => {
    let payload = value.data;

    tableAPI.updateRowData({ update: [payload] });

    setSelected([payload]);
  };
  /*
  useEffect(() => {
    revalidate();
    setData(payload?.records);
    setSize(payload?.records?.length || 0);
  }, [payload, revalidate]);
  */

  useEffect(() => {
    if (value) {
        fetchByAddress(value.addressCode);
    }

    if (!value && addressCode) {
      fetchByAddress(addressCode);
    }
  }, [value, addressCode, fetchByAddress]);

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

      <Button
        type="danger"
        icon={<MinusOutlined />}
        disabled={lineDeleteDisabled}
        onClick={handleItemRemove}
        style={{ marginBottom: 10 }}
      >
        {t('operations.deleteLineItem')}
      </Button>

      <Form.Item name="items">
        <DataTable
          columns={fields}
          data={data}
          height="42vh"
          onClick={(payload) => handleItemSelect(payload)}
          handleSelect={(payload) => handleItemSelect(payload[0])}
          apiContext={setTableAPI}
          selectionMode="single"
          onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default Items;
