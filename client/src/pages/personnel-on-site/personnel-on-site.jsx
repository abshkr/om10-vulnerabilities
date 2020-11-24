import React, { useState } from 'react';

import useSWR, { mutate } from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { PERSONNEL_ON_SITE } from '../../api';
import columns from './columns';
import auth from '../../auth';
import useAuth from 'hooks/use-auth';

import Forms from './forms';

const PersonnelOnSite = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { t } = useTranslation();

  const access = useAuth('M_ONSITEREPORT');

  const { data: payload, isValidating, revalidate } = useSWR(PERSONNEL_ON_SITE.READ);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const fields = columns(t);

  const data = payload?.records;
  const isLoading = isValidating || !data;

  const page = t('pageMenu.reports');
  const name = t('pageNames.personnelOnSite');

  const site = {value:"ON_SITE"};


  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isLoading} columns={fields} />
    </>
  );
  
  

  return (
    <Page page={page} name={name} modifiers={modifiers} access={access} avatar="personnelOnSite">
      
      <DataTable 
        columns={fields} 
        data={data} 
        isLoading={isLoading}
        selectionMode="single"
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        filterValue = {site.value}
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} access={access} />
    </Page>
  );
};

export default auth(PersonnelOnSite);
