import React, { useState } from 'react';
import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { PHYSICAL_PRINTERS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const PhysicalPrinters = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(PHYSICAL_PRINTERS.READ);

  const [tableAPI, setTableAPI] = useState(null);

  const fields = columns(t);

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} tableAPI={tableAPI} />,
      id: value?.prntr,
      name: value?.sys_prntr,
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
    <Page page={t('pageMenu.printers')} name={t('pageNames.physicalPrinters')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={payload?.records}
        isLoading={isValidating}
        onClick={handleClick}
        apiContext={setTableAPI}
      />
    </Page>
  );
};

export default auth(PhysicalPrinters);
