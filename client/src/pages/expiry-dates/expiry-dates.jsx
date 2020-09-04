import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { EXPIRY_DATES } from '../../api';
import { Page, DataTable, Download } from '../../components';

import Forms from './forms';
import LegacyForms from './legacy-form';
import { useAuth, useConfig } from '../../hooks';
import columns from './columns';
import legacy_cols from './legacy_cols';
import auth from '../../auth';

const ExpiryDates = () => {
  const { expiryDateMode } = useConfig();

  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const access = useAuth('M_EXPIRYDATES');

  const { data: payload, isValidating, revalidate } = useSWR(EXPIRY_DATES.READ);

  const fields = expiryDateMode === '1' ? legacy_cols(t) : columns(t);

  const page = t('pageMenu.security');
  const name = t('pageNames.expiryDates');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      {expiryDateMode !== '1' && <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>}
    </>
  );

  const form = (expiryDateMode === '1' ?
    <LegacyForms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        all={payload?.records}
      />
    :
    <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        all={payload?.records}
      />)

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="expiryDates">
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
      />
      {form}
    </Page>
  );
};

export default auth(ExpiryDates);
