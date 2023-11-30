import React, { useState } from 'react';

import useSWR from 'swr';
import { Button, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { Page, DataTable, Download } from '../../components';
import { PRODUCT_GROUPS } from '../../api';
import columns from './columns';
import auth from '../../auth';
import { useAuth } from '../../hooks';

import GroupForm from './groups-form';
import MessageGroupForm from './message-group-form';
import MessageForm from './messages-form';

const ProductGroups = () => {
  const [endpoint, setEndpoint] = useState(PRODUCT_GROUPS.READ_GROUPS);

  const { t } = useTranslation();
  const access = useAuth('M_PRODUCTS');

  const [groupVisible, setGroupVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageGrpVisible, setMessageGrpVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: payload, isValidating, mutate: revalidate } = useSWR(endpoint);

  const data = payload ? payload.records : [];

  const fields = columns(endpoint, t);

  const handleFormState = (visibility, value) => {
    setSelected(value);
    if (endpoint === PRODUCT_GROUPS.READ_GROUPS) {
      setGroupVisible(visibility);
    } else if (endpoint === PRODUCT_GROUPS.READ_MESSAGES) {
      setMessageVisible(visibility);
    } else {
      setMessageGrpVisible(visibility);
    }

    if (!visibility) {
      setGroupVisible(false);
      setMessageVisible(false);
      setMessageGrpVisible(false);
    }
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
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page
      page={t('pageMenu.products')}
      name={t('pageNames.productGroups')}
      modifiers={modifiers}
      access={access}
    >
      <Tabs defaultActiveKey={PRODUCT_GROUPS.READ_GROUPS} onChange={setEndpoint} animated={false}>
        <Tabs.TabPane tab={t('tabColumns.groups')} key={PRODUCT_GROUPS.READ_GROUPS} forceRender>
          <DataTable
            columns={fields}
            data={data}
            isLoading={isValidating}
            // onClick={handleClick}
            height="320px"
            onClick={(payload) => handleFormState(true, payload)}
            handleSelect={(payload) => handleFormState(true, payload[0])}
          />
          <GroupForm
            value={selected}
            visible={groupVisible}
            handleFormState={handleFormState}
            access={access}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={t('tabColumns.messages')} key={PRODUCT_GROUPS.READ_MESSAGES} forceRender>
          <DataTable
            columns={fields}
            data={data}
            isLoading={isValidating}
            // onClick={handleClick}
            height="320px"
            onClick={(payload) => handleFormState(true, payload)}
            handleSelect={(payload) => handleFormState(true, payload[0])}
          />
          <MessageForm
            value={selected}
            visible={messageVisible}
            handleFormState={handleFormState}
            access={access}
          />
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={t('tabColumns.messageGroups')}
          key={PRODUCT_GROUPS.READ_MESSAGE_GROUPS}
          forceRender
        >
          <DataTable
            columns={fields}
            data={data}
            fields
            isLoading={isValidating}
            // onClick={handleClick}
            height="320px"
            onClick={(payload) => handleFormState(true, payload)}
            handleSelect={(payload) => handleFormState(true, payload[0])}
          />
          <MessageGroupForm
            value={selected}
            visible={messageGrpVisible}
            handleFormState={handleFormState}
            access={access}
          />
        </Tabs.TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(ProductGroups);
