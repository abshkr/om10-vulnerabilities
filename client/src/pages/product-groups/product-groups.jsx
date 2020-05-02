import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { PRODUCT_GROUPS } from '../../api';
import columns from './columns';
import auth from '../../auth';

import GroupForm from './groups-form';

const ProductGroups = () => {
  const [endpoint, setEndpoint] = useState(PRODUCT_GROUPS.READ_GROUPS);

  const { t } = useTranslation();

  const { data: payload, isValidating, revalidate } = useSWR(endpoint);

  const data = payload?.records;
  const fields = columns(endpoint, t);

  const handleClick = (value) => {
    if (endpoint === PRODUCT_GROUPS.READ_GROUPS) {
      FormModal({
        value,
        form: <GroupForm value={value} />,
        id: value?.pgr_code,
        name: value?.pgr_description,
        t,
      });
    }
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
    <Page page={t('pageMenu.gantry')} name={t('pageNames.productGroups')} modifiers={modifiers}>
      <Tabs defaultActiveKey={PRODUCT_GROUPS.READ_GROUPS} onChange={setEndpoint} animated={false}>
        <Tabs.TabPane tab={t('tabColumns.groups')} key={PRODUCT_GROUPS.READ_GROUPS}>
          <DataTable
            columns={fields}
            data={data}
            isLoading={isValidating}
            onClick={handleClick}
            height="320px"
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={t('tabColumns.messages')} key={PRODUCT_GROUPS.READ_MESSAGES}>
          <DataTable
            columns={fields}
            data={data}
            isLoading={isValidating}
            onClick={handleClick}
            height="320px"
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={t('tabColumns.messageGroups')} key={PRODUCT_GROUPS.READ_MESSAGE_GROUPS}>
          <DataTable
            columns={fields}
            data={data}
            fields
            isLoading={isValidating}
            onClick={handleClick}
            height="320px"
          />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(ProductGroups);
