import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SecurityScanOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, IButton } from '../../components';
import { ID_ASSIGNMENT } from '../../api';

import columns from './columns';
import auth from '../../auth';
import { useAuth } from 'hooks';
import Forms from './forms';

const IdAssignment = () => {
  const [search, setSearch] = useState('');

  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  
  const access = useAuth('M_IDENTIFICATIONASSIGNMENT');

  const { data: payload, isValidating, revalidate } = useSWR(ID_ASSIGNMENT.READ);

  const fields = columns(t);

  const page = t('pageMenu.security');
  const name = t('pageNames.idAssignment');

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const handleTagLookUp = () => {
    IButton({
      setSearch,
      t,
    });
  };

  const modifiers = (
    <>
      <Button icon={<SecurityScanOutlined />} onClick={() => handleTagLookUp()}>
        {t('operations.tagLookUp')}
      </Button>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Download data={payload?.records} isLoading={isValidating} columns={fields} />

      <Button
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
    <Page page={page} name={name} modifiers={modifiers} avatar="idAssignment">
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        search={search}
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

export default auth(IdAssignment);
