import React, { useState } from 'react';

import useSWR from 'swr';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { Page, DataTable, Download } from '../../components';
import { LOGICAL_PRINTERS } from '../../api';

import Forms from './forms';

import columns from './columns';
import auth from '../../auth';

const LogicalPrinters = () => {
  const [value, setValue] = useState(null);

  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(LOGICAL_PRINTERS.READ);

  const fields = columns(t);

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={payload?.records} isLoading={isValidating} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => setValue(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.printers')} name={t('pageNames.logicalPrinters')} modifiers={modifiers}>
      <Modal
        title={value ? `${t('operations.editing')} (${value.prt_printer})` : `${t('operations.create')}`}
        visible={!!value}
        centered
        width="50vw"
        icon={value ? 'edit' : 'form'}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setValue(null)}
      >
        <Forms value={value} data={payload?.records} />,
      </Modal>

      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={setValue} />
    </Page>
  );
};

export default auth(LogicalPrinters);
