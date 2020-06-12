import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { EXPIRY_DATES } from '../../api';
import { Page, DataTable, Download } from '../../components';

import Forms from './forms';
import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

const ExpiryDates = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const auth = useAuth('M_EXPIRYDATES');

  const { data: payload, isValidating, revalidate } = useSWR(EXPIRY_DATES.READ);

  const fields = columns(t);

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
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => handleFormState(true, null)} 
        loading={isValidating}
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable 
        columns={fields} 
        data={payload?.records} 
        isLoading={isValidating} 
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(ExpiryDates);
