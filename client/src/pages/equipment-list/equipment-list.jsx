import React, { useState, useEffect } from 'react';

import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download } from '../../components';
import { EQUIPMENT_LIST } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig, useQuery } from 'hooks';
import Forms from './forms';

const EquipmentList = () => {
  const query = useQuery();
  const config = useConfig();
  const { expiryDateMode, siteUseAxleWeightLimit } = useConfig();

  let equipment = query.get('equipment') || '';

  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [parentEqpt, setParentEqpt] = useState(equipment);

  const access = useAuth('M_EQUIPMENTLIST');

  const url =
    parentEqpt && parentEqpt?.length > 0 // && !_.isNaN(_.toNumber(parentEqpt))
      ? `${EQUIPMENT_LIST.READ}?eqpt_id=${parentEqpt}`
      : `${EQUIPMENT_LIST.READ}`;
  const { data: payload, isValidating, revalidate } = useSWR(url);
  const { data: expiryTypes } = useSWR(EQUIPMENT_LIST.EXPIRY);

  const [fields, setFields] = useState(
    columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit)
  );

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const [filterValue, setFilterValue] = useState(equipment);

  const page = t('pageMenu.operations');
  const name = t(config?.siteLabelUser + 'pageNames.equipmentList');

  const onRefresh = () => {
    // setFilterValue(' ');
    setParentEqpt('');
    revalidate();
  };

  useEffect(() => {
    if (payload && parentEqpt && parentEqpt?.length > 0) {
      if (parentEqpt?.indexOf(',') >= 0) setFilterValue(' ');
    }
  }, [payload, parentEqpt]);

  useEffect(() => {
    if (expiryTypes) {
      setFields(columns(expiryTypes?.records, t, expiryDateMode, siteUseAxleWeightLimit));
    }
  }, [expiryTypes, t, expiryDateMode, siteUseAxleWeightLimit]);

  /* useEffect(() => {
    console.log('...................... filter', filterValue);
  }, [filterValue]); */

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => onRefresh()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="equipmentList">
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
        autoColWidth
        filterValue={filterValue}
      />
      {visible && (
        <Forms
          value={selected}
          visible={visible}
          handleFormState={handleFormState}
          access={access}
          setFilterValue={setFilterValue}
          expiryDateMode={expiryDateMode}
          expiryTypes={expiryTypes?.records}
          config={config}
        />
      )}
    </Page>
  );
};

export default auth(EquipmentList);
