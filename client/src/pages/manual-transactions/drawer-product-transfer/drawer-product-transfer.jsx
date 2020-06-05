import React, { useState, useEffect } from 'react';
import { UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { BayArm, DrawerProducts, Equipment, Temperature, Observed, Standard, Mass } from './fields';
import { DataTable } from '../../../components';
import columns from './columns';
import useSWR from 'swr';
import { MANUAL_TRANSACTIONS } from '../../../api';

const components = {
  BayArmEditor: BayArm,
  DrawerProductsEditor: DrawerProducts,
  EquipmentEditor: Equipment,
  TemperatureEditor: Temperature,
  ObservedEditor: Observed,
  StandardEditor: Standard,
  MassEditor: Mass,
};

const DrawerProductTransfer = ({ form, type, supplier, trip }) => {
  const { data } = useSWR(
    supplier && trip && `${MANUAL_TRANSACTIONS.DETAILS}?supplier=${supplier}&trip_no=${trip}`
  );

  const { t } = useTranslation();

  const [payload, setPayload] = useState([]);
  const [selected, setSelected] = useState(null);

  const fields = columns(t, type);

  const onDelete = () => {
    const filtered = _.reject(payload, ['tnkr_cmpt_no', selected?.tnkr_cmpt_no]);

    setSelected(null);
    setPayload(filtered);
  };

  useEffect(() => {
    setPayload([]);

    if (data) {
      const transformed = [];

      _.forEach(data?.records, (record) => {
        const object = {
          eqpt_code: record.eqpt_code,
          tnkr_cmpt_no: record.tnkr_cmpt_no,
          drawer_code: record.shls_supp,
          product_code: t('placeholder.selectDrawerProduct'),
          arm_code: t('placeholder.selectArmCode'),
          dens: null,
          temperature: null,
          cor_vol: null,
          amb_vol: null,
          liq_kg: null,
        };

        transformed.push(object);
      });

      setPayload(transformed);
    }
  }, [data, supplier, supplier]);

  const modifiers = (
    <>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        style={{ marginRight: 5 }}
        onClick={onDelete}
        disabled={!selected}
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
      parentHeight="200px"
      data={payload}
      extra={modifiers}
      columns={fields}
      handleSelect={(value) => setSelected(value[0])}
      components={components}
    />
  );
};

export default DrawerProductTransfer;
