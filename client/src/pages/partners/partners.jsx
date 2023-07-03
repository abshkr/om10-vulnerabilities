import React, { useState } from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, PowerTable as DataTable, Download } from '../../components';
import { PARTNERS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth, useConfig } from '../../hooks';

const Partners = () => {
  const config = useConfig();
  const { t } = useTranslation();
  const access = useAuth('M_PARTNERS');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const { data: payload, isValidating, revalidate } = useSWR(PARTNERS.READ);

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
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.companies')} name={t('pageNames.partners')} modifiers={modifiers} access={access}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        autoColWidth
        filterValue={filterValue}
        columnAdjustable={config?.siteCustomColumnPartner}
        pageModule={'M_PARTNERS'}
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

export default auth(Partners);
