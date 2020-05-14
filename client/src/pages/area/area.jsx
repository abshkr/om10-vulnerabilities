import React from 'react';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import useSWR from 'swr';

import { Page, DataTable, FormModal, Download } from '../../components';
import generator from './generator';
import { AREA } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const Area = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(AREA.READ);

  const fields = columns(t);
  
  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.area_k,
      name: value?.area_name,
      t,
      width: '60vw',
    });
  };

  const data = generator(payload?.records);

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />

      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.area')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(Area);
