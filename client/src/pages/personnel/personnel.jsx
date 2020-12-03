import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { PERSONNEL } from 'api';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth, useConfig } from 'hooks';

const Personnel = () => {
  const config = useConfig();
  const expiryDateMode = config.expiryDateMode;
  // const { expiryDateMode } = useConfig();
  const { t } = useTranslation();

  const access = useAuth('M_PERSONNEL');

  const { data: payload, isValidating, revalidate } = useSWR(PERSONNEL.READ);
  const { data: expiryTypes } = useSWR(PERSONNEL.EXPIRY_TYPES);

  const [fields, setFields] = useState(columns(expiryTypes?.records, t, expiryDateMode));
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  useEffect(() => {
    if (expiryTypes) {
      setFields(columns(expiryTypes?.records, t, expiryDateMode));
    }
  }, [expiryTypes]);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
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
    <Page
      page={t('pageMenu.security')}
      name={t('pageNames.personnel')}
      modifiers={modifiers}
      access={access}
      avatar="personnel"
    >
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
        filterValue={filterValue}
      />
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
    </Page>
  );
};

export default auth(Personnel);
