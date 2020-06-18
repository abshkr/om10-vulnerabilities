import React, { useState } from 'react';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, Download } from 'components';
import { DANGEROUS_GOODS } from 'api';
import auth from 'auth';

import columns from './columns';
import Forms from './forms';
import useAuth from 'hooks/use-auth';

const HazchemCodes = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(DANGEROUS_GOODS.READ);

  const access = useAuth('M_DANGEROUSGOODS');

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

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
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.gantry')}
      name={t('pageNames.dangerousGoods')}
      modifiers={modifiers}
      access={access}
    >
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

export default auth(HazchemCodes);
