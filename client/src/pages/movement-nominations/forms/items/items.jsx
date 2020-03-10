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

  const disabled = selected.length === 0;
  const canModifyFurther = selected[0]?.mvitm_status_name === 'NEW' || disabled;
  const fields = columns(value, selected);

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
      editable: true
    };

    setSize(length);

    tableAPI.updateRowData({ add: [value] });
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  const onEditingFinished = value => {
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
        disabled={disabled || !canModifyFurther}
      >
        {t('operations.makeTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={canModifyFurther}
        onClick={() =>
          window.open(
            `${ROUTES.TRANSACTION_LIST}?mv_id=${value?.mv_id}&line_id=${selected[0]?.mvitm_line_id}`,
            '_blank'
          )
        }
      >
        {t('operations.viewTransaction')}
      </Button>

      <Button
        type="primary"
        icon={<EyeOutlined />}
        style={{ float: 'right', marginRight: 5 }}
        disabled={canModifyFurther}
        onClick={() => window.open(`${ROUTES.LOAD_SCHEDULES}?mv_key=${value?.mv_key}`, '_blank')}
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
          height="42vh"
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
