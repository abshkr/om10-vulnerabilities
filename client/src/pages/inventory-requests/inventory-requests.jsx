import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Tabs, notification, Modal } from 'antd';
import { SyncOutlined, PlusOutlined, CheckOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { Page, DataTable, Download, FormModal } from '../../components';
import { INVENTORY_REQUESTS } from '../../api';
import tankColumns from './tank-columns';
import generator from './generator';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const { TabPane } = Tabs;

const InventoryRequests = () => {
  const { t } = useTranslation();

  const { data: requests, isValidating: requestsLoading, revalidate } = useSWR(INVENTORY_REQUESTS.READ);
  const { data: tanks, isValidating: tanksLoading } = useSWR(INVENTORY_REQUESTS.TANKS);

  const [selected, setSelected] = useState(null);
  const [api, setAPI] = useState(null);
  const [tab, setTab] = useState('1');

  const isLoading = requestsLoading || tanksLoading;
  const requestsData = generator(requests?.records);
  const tanksData = tanks?.records;
  const tankFields = tankColumns(t);
  const fields = columns(t);

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.tkrq_type_name,
      name: value?.tkrq_period_name,
      t,
    });
  };

  const onTankUpdate = () => {
    const payload = [];

    _.forEach(selected, (tank) => {
      payload.push({
        ...tank,
        tank_inv_needed: true,
      });
    });

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(INVENTORY_REQUESTS.UPDATE_TANKS, payload)
          .then(() => {
            mutate(INVENTORY_REQUESTS.READ);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess'),
            });
          })
          .catch((error) => {
            notification.error({
              message: error.message,
              description: t('descriptions.updateFailed'),
            });
          });
      },
    });
  };

  const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download
        data={tab === '1' ? requestsData : tanksData}
        isLoading={isLoading}
        columns={tab === '1' ? fields : tankFields}
      />

      <Button
        type="primary"
        icon={tab === '1' ? <PlusOutlined /> : <CheckOutlined />}
        onClick={() => (tab === '1' ? handleClick(null) : onTankUpdate())}
        loading={isLoading}
      >
        {tab === '1' ? t('operations.create') : t('operations.update')}
      </Button>
    </>
  );

  useEffect(() => {
    // Preset all the selected values on the Tanks Tab

    if (!selected) {
      const filtered = _.filter(tanks?.records, ['tank_inv_needed', true]);
      const mapped = _.uniq(_.map(filtered, 'tank_code'));

      if (api) {
        api.forEachNode((node) => {
          node.setSelected(mapped.includes(node.data['tank_code']));
        });
      }
    }

    if (api && selected) {
      const mapped = _.uniq(_.map(selected, 'tank_code'));

      api.forEachNode((node) => {
        node.setSelected(mapped.includes(node.data['tank_code']));
      });
    }
  }, [tanks, selected, api]);

  return (
    <Page page={t('pageMenu.stockManagement')} name={t('pageNames.inventoryRequests')} modifiers={modifiers}>
      <Tabs defaultActiveKey={tab} animated={false} onChange={setTab}>
        <TabPane tab={t('tabColumns.requests')} key="1">
          <DataTable
            columns={fields}
            data={requestsData}
            isLoading={isLoading}
            onClick={handleClick}
            height="320px"
          />
        </TabPane>
        <TabPane tab={t('tabColumns.tankSelection')} key="2">
          <DataTable
            columns={tankFields}
            data={tanksData}
            isLoading={isLoading}
            height="320px"
            apiContext={setAPI}
            handleSelect={setSelected}
          />
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(InventoryRequests);
