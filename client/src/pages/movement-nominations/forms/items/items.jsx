import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { DataTable } from '../../../../components';
import { MOVEMENT_NOMIATIONS } from '../../../../api';
import columns from './columns';

const Items = ({ form, value }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(`${MOVEMENT_NOMIATIONS.ITEMS}?mv_id=${value?.mv_id}`);

  const [data, setData] = useState([]);

  const [selected, setSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [size, setSize] = useState([]);

  const fields = columns(t);

  const handleItemAdd = () => {
    const value = {
      mvitm_line_id: String(size + 1),
      mvitm_item_id: '',
      mvitm_type: '0',
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
      mvitm_plant_to: '',
      mvitm_prodcmpy_to: '',
      mvitm_prodname_to: '',
      mvitm_tank_to: '',
      mvitm_shiploc_to: '',
      mvitm_shiptext_to: '',
      mvitm_shiptext_to2: '',
      mvitm_comments: '',
      mvitm_qty_schd: '0',
      mvitm_qty_move: '0',
      mvitm_qty_delv: '0'
    };

    const length = size + 1;
    setSize(length);
    tableAPI.updateRowData({ add: [value] });
  };

  const handleItemRemove = () => {
    tableAPI.updateRowData({ remove: selected });
  };

  useEffect(() => {
    setData(payload?.records);
    setSize(payload?.records?.length || 0);
  }, [payload]);

  getFieldDecorator('items');

  return (
    <div>
      <Button
        type={selected.length === 0 ? 'primary' : 'danger'}
        icon={selected.length === 0 ? 'plus' : 'minus'}
        onClick={selected.length === 0 ? handleItemAdd : handleItemRemove}
        style={{ marginBottom: 10 }}
        loading={isValidating}
      >
        {selected.length === 0 ? t('operations.addLineItem') : t('operations.deleteLineItem')}
      </Button>

      <DataTable
        columns={fields}
        data={data}
        height="42vh"
        selectionMode="single"
        handleSelect={setSelected}
        apiContext={setTableAPI}
      />
    </div>
  );
};

export default Items;
