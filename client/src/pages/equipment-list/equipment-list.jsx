import React, { useState, useEffect } from 'react';

import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download, FormModal } from '../../components';
import { EQUIPMENT_LIST } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig } from 'hooks';
import Forms from './forms';

const EquipmentList = () => {
  const { expiryDateMode } = useConfig();
  
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const access = useAuth('M_EQUIPMENTLIST');

  const { data: payload, isValidating, revalidate } = useSWR(EQUIPMENT_LIST.READ);
  const { data: expiryTypes } = useSWR(EQUIPMENT_LIST.EXPIRY);

  const [fields, setFields] = useState(columns(expiryTypes?.records, t, expiryDateMode));

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const [filterValue, setFilterValue] = useState('');

  const page = t('pageMenu.operations');
  const name = t('pageNames.equipmentList');

  useEffect(() => {
    if (expiryTypes) {
      setFields(columns(expiryTypes?.records, t, expiryDateMode));
    }
  }, [expiryTypes]);

  const modifiers = (
    <>
      <Button
        icon={<SyncOutlined />}
        onClick={() => revalidate()}
        loading={isValidating}
      >
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
        />
      )}
    </Page>
  );
};

export default auth(EquipmentList);
