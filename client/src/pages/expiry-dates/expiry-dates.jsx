import React from 'react';

import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'antd';

import { EXPIRY_DATES } from '../../api';
import { Page, DataTable, Download } from '../../components';
import { useAPI } from '../../hooks';

import Forms from './forms';

import columns from './columns';
import auth from '../../auth';

const ExpiryDates = () => {
  const { data, isLoading, refetch } = useAPI([EXPIRY_DATES.READ]);
  const { t } = useTranslation();

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
      content: <Forms value={object} refetch={refetch} data={data} access={true} />,
      okButtonProps: {
        style: { display: 'none' }
      }
    });
  };

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => refetch()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isLoading} columns={fields} />
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isLoading}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable columns={fields} data={data?.[0].records} isLoading={isLoading} onClick={handleClick} />
    </Page>
  );
};

export default auth(ExpiryDates);
