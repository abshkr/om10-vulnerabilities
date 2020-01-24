import React from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'antd';

import { EXPIRY_DATES } from '../../api';
import { Page, DataTable, Download } from '../../components';

import Forms from './forms';

import columns from './columns';
import auth from '../../auth';

const ExpiryDates = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(EXPIRY_DATES.READ);

  const fields = columns(t);

  const handleClick = object => {
    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.edt_target_code} / ${object.edt_type_desc}) - Child Records ${
            object.child_count
          }`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: object ? 'edit' : 'form',
      content: <Forms value={object} data={payload?.records} access={true} />,
      okButtonProps: {
        style: { display: 'none' }
      }
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable columns={fields} data={payload?.records} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(ExpiryDates);
