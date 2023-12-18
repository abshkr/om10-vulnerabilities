import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import useSWR, { mutate } from 'swr';
import { useTranslation } from 'react-i18next';
import { Button, Tabs, notification, Modal } from 'antd';
import jwtDecode from 'jwt-decode';
import moment from 'dayjs';

import {
  SyncOutlined,
  PlusOutlined,
  CheckOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { TerminalList } from 'components/fields';
import api, { INVENTORY_REQUESTS } from '../../api';
import tankColumns from './tank-columns';
import generator from './generator';
import columns from './columns';
import auth from '../../auth';
import { useAuth, useConfig } from 'hooks';
import Forms from './forms';

const { TabPane } = Tabs;

const InventoryRequests = () => {
  const { t } = useTranslation();
  const config = useConfig();
  const [visible, setVisible] = useState(false);
  const [invSelected, setInvSelected] = useState(null);
  const [requestsData, setRequestsData] = useState(null);

  const token = sessionStorage.getItem('token');
  const decoded = jwtDecode(token);
  const site_code = decoded?.site_code;
  // const [terminal, setTerminal] = useState(site_code);
  const [terminal, setTerminal] = useState('');

  const access = useAuth('M_INVENTORYREQUEST');

  const {
    data: requests,
    isValidating: requestsLoading,
    mutate: revalidate,
  } = useSWR(`${INVENTORY_REQUESTS.READ}?terminal=${terminal}`);
  const {
    data: tanks,
    mutate: revalidateTanks,
    isValidating: tanksLoading,
  } = useSWR(`${INVENTORY_REQUESTS.TANKS}?terminal=${terminal}`);

  const [selected, setSelected] = useState([]);
  const [tableAPI, setTableAPI] = useState(null);
  const [tab, setTab] = useState('1');

  const isLoading = requestsLoading || tanksLoading;
  // const requestsData = generator(requests?.records, config);
  const tanksData = tanks?.records;
  const tankFields = tankColumns(t);
  const fields = columns(t);

  const CAN_SET_REQUIRED = tab === '2';
  const IS_REQUIRED = selected.length > 0 && selected[0]?.tank_inv_needed;

  const onTankUpdate = (field) => {
    const value = {};
    value.tank_code = selected[0]?.tank_code;
    value.tank_terminal = selected[0]?.tank_terminal;
    if (field === 'tank_inv_needed') {
      value.tank_inv_needed = !selected[0]?.tank_inv_needed;
    } else if (field === 'tank_adhoc_ivrq') {
      value.tank_adhoc_ivrq = !selected[0]?.tank_adhoc_ivrq;
    } else {
      value.tank_inv_needed = selected[0]?.tank_inv_needed;
      value.tank_adhoc_ivrq = selected[0]?.tank_adhoc_ivrq;
    }

    Modal.confirm({
      title:
        field === 'tank_inv_needed'
          ? t('prompts.toggleRequired')
          : field === 'tank_adhoc_ivrq'
          ? t('prompts.toggleAdhoc')
          : t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(INVENTORY_REQUESTS.UPDATE_TANK, value)
          .then(() => {
            if (revalidateTanks) {
              revalidateTanks();
            }
            // mutate(INVENTORY_REQUESTS.TANKS);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onTankUpdateRequired = () => {
    onTankUpdate('tank_inv_needed');
  };

  const onTankUpdateAdhoc = () => {
    onTankUpdate('tank_adhoc_ivrq');
  };

  const onTankUpdateAll = (field) => {
    const values = [];

    for (let i = 0; i < tanks?.records?.length; i++) {
      const item = tanks?.records?.[i];
      const value = {};
      value.tank_code = item?.tank_code;
      value.tank_terminal = item?.tank_terminal;
      if (field === 'tank_inv_needed') {
        value.tank_inv_needed = !item?.tank_inv_needed;
      } else if (field === 'tank_adhoc_ivrq') {
        value.tank_adhoc_ivrq = !item?.tank_adhoc_ivrq;
      } else {
        value.tank_inv_needed = item?.tank_inv_needed;
        value.tank_adhoc_ivrq = item?.tank_adhoc_ivrq;
      }
      values.push(value);
    }

    Modal.confirm({
      title:
        field === 'tank_inv_needed'
          ? t('prompts.toggleAllRequired')
          : field === 'tank_adhoc_ivrq'
          ? t('prompts.toggleAllAdhoc')
          : t('prompts.update'),
      okText: t('operations.update'),
      okType: 'primary',
      icon: <QuestionCircleOutlined />,
      cancelText: t('operations.no'),
      centered: true,
      onOk: async () => {
        await api
          .post(INVENTORY_REQUESTS.UPDATE_TANKS, values)
          .then(() => {
            if (revalidateTanks) {
              revalidateTanks();
            }
            // mutate(INVENTORY_REQUESTS.TANKS);

            notification.success({
              message: t('messages.updateSuccess'),
              description: t('descriptions.updateSuccess'),
            });
          })
          .catch((errors) => {
            _.forEach(errors.response.data.errors, (error) => {
              notification.error({
                message: error.type,
                description: error.message,
              });
            });
          });
      },
    });
  };

  const onTankUpdateAllRequired = () => {
    onTankUpdateAll('tank_inv_needed');
  };

  const onTankUpdateAllAdhoc = () => {
    onTankUpdateAll('tank_adhoc_ivrq');
  };

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setInvSelected(value);
  };

  const modifiers = (
    <>
      {config?.siteUseMultiTerminals && (
        <TerminalList
          value={terminal}
          listOptions={[]}
          itemCode={'tank_terminal'}
          itemTitle={'terminal'}
          itemRequired={false}
          itemDisabled={false}
          onChange={setTerminal}
        />
      )}

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download
        data={tab === '1' ? requestsData : tanksData}
        isLoading={isLoading}
        columns={tab === '1' ? fields : tankFields}
      />

      {!CAN_SET_REQUIRED && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleFormState(true, null)}
          loading={isLoading}
          disabled={!access.canCreate}
        >
          {t('operations.create')}
        </Button>
      )}

      {/* CAN_SET_REQUIRED && (
        <Button
          type="primary"
          disabled={selected.length === 0}
          icon={IS_REQUIRED ? <CloseOutlined /> : <CheckOutlined />}
          onClick={onTankUpdate}
          loading={isLoading}
        >
          {IS_REQUIRED ? t('operations.notRequired') : t('operations.required')}
        </Button>
      ) */}
    </>
  );

  const tabActions = (
    <div style={{ display: 'flex' }}>
      <Button
        type="primary"
        disabled={selected.length === 0}
        // icon={IS_REQUIRED ? <CloseOutlined /> : <CheckOutlined />}
        style={{ marginLeft: '10px' }}
        onClick={onTankUpdateRequired}
        loading={isLoading}
      >
        {t('operations.toggleRequired')}
      </Button>

      <Button
        type="primary"
        disabled={selected.length === 0}
        // icon={IS_REQUIRED ? <CloseOutlined /> : <CheckOutlined />}
        style={{ marginLeft: '10px' }}
        onClick={onTankUpdateAdhoc}
        loading={isLoading}
      >
        {t('operations.toggleAdhoc')}
      </Button>

      <Button
        type="primary"
        disabled={selected.length > 0}
        // icon={IS_REQUIRED ? <CloseOutlined /> : <CheckOutlined />}
        style={{ marginLeft: '10px' }}
        onClick={onTankUpdateAllRequired}
        loading={isLoading}
      >
        {t('operations.toggleAllRequired')}
      </Button>

      <Button
        type="primary"
        disabled={selected.length > 0}
        // icon={IS_REQUIRED ? <CloseOutlined /> : <CheckOutlined />}
        style={{ marginLeft: '10px' }}
        onClick={onTankUpdateAllAdhoc}
        loading={isLoading}
      >
        {t('operations.toggleAllAdhoc')}
      </Button>
    </div>
  );

  useEffect(() => {
    if (!selected) {
      const filtered = _.filter(tanks?.records, ['tank_inv_needed', true]);
      const mapped = _.uniq(_.map(filtered, 'tank_code'));

      if (tableAPI) {
        tableAPI.forEachNode((node) => {
          node.setSelected(mapped.includes(node.data['tank_code']));
        });
      }
    }

    if (tableAPI && selected) {
      const mapped = _.uniq(_.map(selected, 'tank_code'));

      tableAPI.forEachNode((node) => {
        node.setSelected(mapped.includes(node.data['tank_code']));
      });
    }
  }, [tanks, selected, tableAPI]);

  useEffect(() => {
    if (requests) {
      setRequestsData(generator(requests?.records, config));
    }
  }, [requests, config, generator, setRequestsData]);

  return (
    <Page
      page={t('pageMenu.operations')}
      name={t('pageNames.inventoryRequests')}
      modifiers={modifiers}
      avatar="inventoryRequests"
      access={access}
    >
      <Tabs
        defaultActiveKey={tab}
        animated={false}
        onChange={setTab}
        tabBarExtraContent={tab === '2' ? tabActions : undefined}
      >
        <TabPane tab={t('tabColumns.requests')} key="1">
          <DataTable
            columns={fields}
            data={requestsData}
            isLoading={isLoading}
            height="320px"
            onClick={(payload) => handleFormState(true, payload)}
            handleSelect={(payload) => handleFormState(true, payload[0])}
          />
          <Forms
            value={invSelected}
            visible={visible}
            handleFormState={handleFormState}
            access={access}
            config={config}
            refresh={revalidate}
          />
        </TabPane>
        <TabPane tab={t('tabColumns.tankSelection')} key="2">
          <DataTable
            columns={tankFields}
            data={tanksData}
            isLoading={isLoading}
            height="320px"
            apiContext={setTableAPI}
            handleSelect={setSelected}
            selectionMode="single"
          />
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(InventoryRequests);
