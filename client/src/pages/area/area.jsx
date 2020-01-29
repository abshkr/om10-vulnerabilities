import React from 'react';

import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Page, DataTable, FormModal, Download } from '../../components';
import { AREA } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const Area = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(AREA.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} data={payload} />,
      id: 'test',
      name: 'test',
      t
    });
  };

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.area')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(Area);
