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
import { useAuth } from 'hooks';

const Personnel = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const auth = useAuth('M_PERSONNEL');

  const { data: payload, isValidating, revalidate } = useSWR(PERSONNEL.READ);
  const { data: expiryTypes } = useSWR(PERSONNEL.EXPIRY_TYPES);

  const [fields, setFields] = useState(columns(expiryTypes?.records, t));

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  useEffect(() => {
    if (expiryTypes) {
      setFields(columns(expiryTypes?.records, t));
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
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.personnel')} modifiers={modifiers}>
      <DataTable 
        columns={fields} 
        data={payload?.records} 
        isLoading={isValidating} 
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(Personnel);
