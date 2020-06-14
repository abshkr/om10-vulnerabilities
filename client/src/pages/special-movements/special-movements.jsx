import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { SPECIAL_MOVEMENTS } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth } from 'hooks';
import Forms from './forms';

const SpecialMovements = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const auth = useAuth('M_SPECIALMOVEMENTS');

  const { data: payload, isValidating, revalidate } = useSWR(SPECIAL_MOVEMENTS.READ);

  const fields = columns(t);
  const data = payload?.records;

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
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.stockReconciliation')}
      name={t('pageNames.specialMovements')}
      modifiers={modifiers}
    >
      <DataTable 
        columns={fields} 
        data={data} 
        isLoading={isValidating} 
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(SpecialMovements);
