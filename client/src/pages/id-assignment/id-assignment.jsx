import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SecurityScanOutlined, SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, IButton, FormModal } from '../../components';
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

  const auth = useAuth('M_IDENTIFICATIONASSIGNMENT');

  const { data: payload, isValidating, revalidate } = useSWR(ID_ASSIGNMENT.READ);

  const fields = columns(t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const handleTagLookUp = () => {
    IButton({
      setSearch,
      t
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
        disabled={!auth.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.idAssignment')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        search={search}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
      />
      <Forms value={selected} visible={visible} handleFormState={handleFormState} auth={auth} />
    </Page>
  );
};

export default auth(IdAssignment);
