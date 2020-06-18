import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { TANKER_LIST } from '../../api';
import columns from './columns';
import { useAuth } from '../../hooks';
import auth from '../../auth';
import Forms from './forms';
// import { useEffect } from 'react';

const TankerList = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const access = useAuth('M_TANKERS');

  const { data: payload, isValidating, revalidate } = useSWR(TANKER_LIST.READ);
  const { data: expiryTypes } = useSWR(TANKER_LIST.EXPIRY);

  const [fields, setFields] = useState(columns(expiryTypes?.records, t));
  
  const data = payload?.records;

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
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.schedules')} name={t('pageNames.tankerList')} modifiers={modifiers} access={access}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        selectionMode="single"
        autoColWidth
        filterValue={filterValue}
      />
      <Forms 
        value={selected} 
        visible={visible} 
        handleFormState={handleFormState} 
        access={access} 
        setFilterValue={setFilterValue}
      />
    </Page>
  );
};

export default auth(TankerList);
