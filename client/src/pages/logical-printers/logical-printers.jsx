import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { LOGICAL_PRINTERS } from '../../api';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const LogicalPrinters = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(LOGICAL_PRINTERS.READ);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.prt_printer,
      name: value?.prt_cmpy,
      t
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.printers')} name={t('pageNames.logicalPrinters')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(LogicalPrinters);
