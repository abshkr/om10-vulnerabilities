import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { COMPANIES } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const Companies = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: payload, isValidating, revalidate } = useSWR(COMPANIES.READ);

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
        loading={isValidating}
        onClick={() => handleFormState(true, null)}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.gantry')} name={t('pageNames.companies')} modifiers={modifiers}>
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

export default auth(Companies);
