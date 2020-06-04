import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined, EyeOutlined, CarryOutOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'antd';
import useSWR from 'swr';

import { ROUTES } from '../../../../constants';
import { DataTable } from '../../../../components';
import { MOVEMENT_NOMIATIONS } from '../../../../api';

import columns from './columns';

const Items = ({ setTableAPIContext, value }) => {
  const { t } = useTranslation();

  const { data: payload } = useSWR(`${MOVEMENT_NOMIATIONS.ITEMS}?mv_id=${value?.mv_id}`);

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState([]);

  const [buttonState, setButtonState] = useState({
    makeSchedule: false,
    viewSchedule: false,
    makeTransaction: false,
    viewTransaction: false,
    editLineItem: false,
  });

  const disabled = selected.length === 0;
  const canModifyFurther = selected[0]?.mvitm_status_name === 'NEW' || disabled;
  const fields = columns(value, selected);

  const handleButtonState = (state) => {
    switch (state) {
      case 'NEW':
        return {
          makeSchedule: true,
          viewSchedule: false,
          makeTransaction: true,
          viewTransaction: false,
          editLineItem: false,
        };

      case 'PARTIALLY SCHEDULED':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: false,
          editLineItem: true,
        };

      case 'FULLY SCHEDULED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: false,
          editLineItem: true,
        };

      case 'FULLY MOVED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: false,
          viewTransaction: true,
          editLineItem: true,
        };

      case 'OUTSTANDING':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: true,
          editLineItem: true,
        };

      case 'FULLY DELIVERED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: false,
          viewTransaction: true,
          editLineItem: true,
        };

      case 'EXPIRED':
        return {
          makeSchedule: false,
          viewSchedule: true,
          makeTransaction: false,
          viewTransaction: true,
          editLineItem: true,
        };

      case 'PARTIALLY MOVED':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: true,
          editLineItem: true,
        };

      case 'PARTIALLY DELIVERED':
        return {
          makeSchedule: true,
          viewSchedule: true,
          makeTransaction: true,
          viewTransaction: true,
          editLineItem: true,
        };

      default:
        return {
          makeSchedule: false,
          viewSchedule: false,
          makeTransaction: false,
          viewTransaction: false,
          editLineItem: false,
        };
    }
  };

  const handleItemAdd = () => {
    const length = size + 1;

    const value = {
      mvitm_line_id: String(size + 1),
      mvitm_item_id: '',
      mvitm_type_name: 'Receipt',
      mvitm_item_key: String(size + 1),
      mvitm_status_name: 'NEW',
      mvitm_prod_qty: '0',
      mvitm_prod_unit_str: 'l (amb)',
      mvitm_plant_from: '',
      mvitm_prodcmpy_from: '',
      mvitm_prodname_from: '',
      mvitm_tank_from: '',
      mvitm_shiploc_from: '',
      mvitm_shiptext_from: '',
      mvitm_shiptext_from2: '',
      mvitm_plant_to: 'Please Select',
      mvitm_prodcmpy_to: 'Please Select',
      mvitm_prodname_to: 'Please Select',
      mvitm_tank_to: '',
      mvitm_shiploc_to: '',
      mvitm_shiptext_to: '',
      mvitm_shiptext_to2: '',
      mvitm_comments: '',
      mvitm_qty_schd: '0',
      mvitm_qty_move: '0',
      mvitm_qty_delv: '0',
      editable: true,
    };

    setSize(length);

    tableAPI.updateRowData({ add: [value] });
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  const onEditingFinished = (value) => {
    let payload = value.data;

    if (value.colDef.field === 'mvitm_prodcmpy_from') {
      payload.mvitm_prodname_from = 'Please Select';
    }

    if (value.colDef.field === 'mvitm_prodcmpy_to') {
      payload.mvitm_prodname_to = 'Please Select';
    }

    if (value.colDef.field === 'mvitm_type_name') {
      if (value.value === 'Receipt') {
        payload.mvitm_plant_from = '';
        payload.mvitm_prodcmpy_from = '';
        payload.mvitm_prodname_from = '';
        payload.mvitm_tank_from = '';
        payload.mvitm_tank_to = '';

        payload.mvitm_plant_to = 'Please Select';
        payload.mvitm_prodcmpy_to = 'Please Select';
        payload.mvitm_prodname_to = 'Please Select';
      }

      if (value.value === 'Disposal') {
        payload.mvitm_plant_from = 'Please Select';
        payload.mvitm_prodcmpy_from = 'Please Select';
        payload.mvitm_prodname_from = 'Please Select';

        payload.mvitm_tank_to = '';
        payload.mvitm_tank_from = '';
        payload.mvitm_prodname_to = '';
        payload.mvitm_plant_to = '';
        payload.mvitm_prodcmpy_to = '';
        payload.mvitm_prodname_to = '';
      }

      if (value.value === 'Transfer') {
        payload.mvitm_plant_from = 'Please Select';
        payload.mvitm_prodcmpy_from = 'Please Select';
        payload.mvitm_prodname_from = 'Please Select';
        payload.mvitm_tank_from = 'Please Select';

        payload.mvitm_tank_to = 'Please Select';
        payload.mvitm_tank_from = 'Please Select';
        payload.mvitm_plant_to = 'Please Select';
        payload.mvitm_prodcmpy_to = 'Please Select';
        payload.mvitm_prodname_to = 'Please Select';
      }
    }

    tableAPI.updateRowData({ update: [payload] });

    setSelected([payload]);
  };

  useEffect(() => {
    setData(payload?.records);
    setSize(payload?.records?.length || 0);
  }, [payload]);

  useEffect(() => {
    if (tableAPI) {
      setTableAPIContext(tableAPI);
    }
  }, [tableAPI, setTableAPIContext]);

  useEffect(() => {
    if (value) {
      const buttonStates = handleButtonState(value?.mv_status_name);

      setButtonState(buttonStates);
    }
  }, [value]);

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleItemAdd} style={{ marginRight: 5 }}>
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
        type="primary"
        icon={<CarryOutOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!buttonState?.makeTransaction}
      >
        {t('operations.makeTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!buttonState?.viewTransaction}
      >
        {t('operations.viewTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={!buttonState?.viewSchedule}
      >
        {t('operations.viewSchedule')}
      </Button>

      <Button
        type="primary"
        icon={<LockOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={canModifyFurther}
      >
        {t('operations.lockItem')}
      </Button>

      <Form.Item name="items">
        <DataTable
          columns={fields}
          data={data}
          height="450px"
          handleSelect={setSelected}
          apiContext={setTableAPI}
          selectionMode="single"
          onEditingFinished={onEditingFinished}
        />
      </Form.Item>
    </>
  );
};

export default Items;
