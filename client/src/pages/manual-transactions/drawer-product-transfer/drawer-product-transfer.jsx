import React, { useEffect, useState, useCallback } from 'react';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DataTable } from '../../../components';
import columns from './columns';
import axios from 'axios';

import { MANUAL_TRANSACTIONS } from '../../../api';

const DrawerProductTransfer = ({ form, type, supplier, trip }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const fields = columns(t, type);

  const getDetails = useCallback((trip, supplier) => {
    setData([]);

    axios
      .get(MANUAL_TRANSACTIONS.DETAILS, {
        params: {
          supplier: supplier,
          trip_no: trip,
        },
      })
      .then((res) => setData(res.data?.records));
  }, []);

  const onDelete = () => {
    const filtered = _.filter(data, (element) => {
      return element.tnkr_cmpt_no !== selected.tnkr_cmpt_no;
    });

    setData(filtered);
    setSelected(null);
  };

  useEffect(() => {
    if (supplier && trip) {
      getDetails(trip, supplier);
    }
  }, [supplier, trip, type]);

  const modifiers = (
    <>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        disabled={!selected}
        style={{ marginRight: 5 }}
        onClick={onDelete}
      >
        {t('operations.deleteTransfer')}
      </Button>

      <Button type="primary" icon={<UndoOutlined />} style={{ marginRight: 5 }}>
        {t('operations.calculateDrawer')}
      </Button>

      <Button type="primary" icon={<UndoOutlined />} style={{ marginRight: 5 }}>
        {t('operations.getTankDensities')}
      </Button>
    </>
  );

  return (
    <DataTable
      height="80vh"
      data={data}
      extra={modifiers}
      columns={fields}
      selectionMode="single"
      handleSelect={(value) => setSelected(value[0])}
    />
  );
};

export default DrawerProductTransfer;
