import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Button, Tabs, notification, Modal } from 'antd';
import {
  SyncOutlined,
  PlusOutlined,
  CheckOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

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

  const [selected, setSelected] = useState([]);
  const [api, setAPI] = useState(null);
  const [tab, setTab] = useState('1');

  const isLoading = requestsLoading || tanksLoading;
  const requestsData = generator(requests?.records);
  const tanksData = tanks?.records;
  const tankFields = tankColumns(t);
  const fields = columns(t);

  const CAN_SET_REQUIRED = tab === '2';
  const IS_REQUIRED = selected.length > 0 && selected[0]?.tank_inv_needed;

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
    const value = {
      ...selected[0],
      tank_inv_needed: !IS_REQUIRED,
    };

    Modal.confirm({
      title: t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await axios
          .post(INVENTORY_REQUESTS.UPDATE_TANKS, value)
          .then(() => {
            mutate(INVENTORY_REQUESTS.TANKS);

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

      {!CAN_SET_REQUIRED && (
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isLoading}>
          {t('operations.create')}
        </Button>
      )}

      {CAN_SET_REQUIRED && (
        <Button
          type="primary"
          disabled={selected.length === 0}
          icon={IS_REQUIRED ? <CloseOutlined /> : <CheckOutlined />}
          onClick={onTankUpdate}
          loading={isLoading}
        >
          {IS_REQUIRED ? 'Not Required' : 'Required'}
        </Button>
      )}
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
            selectionMode="single"
          />
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(InventoryRequests);
