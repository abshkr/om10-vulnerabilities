import React, { useState } from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { TANKS, COMMON } from '../../api';

import generator from './generator';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { useAuth } from 'hooks';
import { useConfig, useQuery } from '../../hooks';

const TankConfiguration = () => {
  const query = useQuery();

  const product = query.get('product') || '';

  const config = useConfig();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filterValue, setFilterValue] = useState(product);

  const access = useAuth('M_TANKCONFIGURATION');

  const { data: payload, isValidating, revalidate } = useSWR(TANKS.READ);
  // const { data: configuration } = useSWR(COMMON.CONFIG);

  const fields = columns(config, t);
  const data = generator(payload?.records);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
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
    <Page
      page={t('pageMenu.config')}
      name={t('pageNames.tankConfiguration')}
      modifiers={modifiers}
      access={access}
      avatar="tankConfiguration"
    >
      <DataTable
        columns={fields}
        data={data}
        isLoading={isValidating}
        onClick={(payload) => handleFormState(true, payload)}
        handleSelect={(payload) => handleFormState(true, payload[0])}
        filterValue={filterValue}
      />
      <Forms
        value={selected}
        visible={visible}
        handleFormState={handleFormState}
        access={access}
        config={config}
        setFilterValue={setFilterValue}
      />
    </Page>
  );
};

export default auth(TankConfiguration);
