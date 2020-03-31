import React from 'react';

import useSWR from 'swr';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { SITE_ACCESS_DEVICES } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const SiteAccessDevices = () => {
  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(SITE_ACCESS_DEVICES.READ);
  const { data: codes } = useSWR(SITE_ACCESS_DEVICES.DEVICE_CODES);

  const fields = columns(t);
  const data = payload?.records;

  const handleClick = value => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.adv_code,
      name: value?.adv_device,
      t
    });
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
        onClick={() => handleClick(null)}
        loading={isValidating}
        disabled={codes?.records?.length === 0}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.siteAccessDevices')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(SiteAccessDevices);
