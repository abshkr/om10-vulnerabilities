import React from 'react';

import useSWR from 'swr';
import { Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { INVENTORY_REQUESTS } from '../../api';
import columns from './columns';
import tankColumns from './tank-columns';
import auth from '../../auth';

const { TabPane } = Tabs;

const InventoryRequests = () => {
  const { t } = useTranslation();

  const { data: requests, isValidating: requestsLoading, revalidate } = useSWR(INVENTORY_REQUESTS.READ);
  const { data: tanks, isValidating: tanksLoading } = useSWR(INVENTORY_REQUESTS.TANKS);

  const fields = columns(t);
  const tankFields = tankColumns(t);
  const isLoading = requestsLoading || tanksLoading;

  const handleClick = (value) => {
    FormModal({
      value,
      form: <div value={value} />,
      id: value?.prt_printer,
      name: value?.prt_cmpy,
      t,
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download data={requests?.records} isLoading={isLoading} columns={fields} />
      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isLoading}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.inventoryRequests')} modifiers={modifiers}>
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane tab={t('tabColumns.requests')} key="1">
          <DataTable
            columns={fields}
            data={requests?.records}
            isLoading={isLoading}
            onClick={handleClick}
            height="320px"
          />
        </TabPane>
        <TabPane tab={t('tabColumns.tankSelection')} key="2">
          <DataTable
            columns={tankFields}
            data={tanks?.records}
            isLoading={isLoading}
            onClick={handleClick}
            height="320px"
          />
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(InventoryRequests);
