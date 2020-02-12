import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import Tanks from './tanks';
import Reports from './reports';
import Meters from './meters';

const TabPane = Tabs.TabPane;

const Forms = ({ value, access }) => {
  const { t } = useTranslation();

  const enabled = value?.status === 0 || value?.status === 1;

  return (
    <Tabs defaultActiveKey="1" animated={false}>
      <TabPane className="ant-tab-window" style={{ paddingRight: 0 }} tab={t('tabColumns.reports')} key="1">
        <Reports id={value?.closeout_nr} enabled={enabled} access={access} />
      </TabPane>

      <TabPane className="ant-tab-window" style={{ paddingRight: 0 }} tab={t('tabColumns.meters')} key="2">
        <Meters id={value?.closeout_nr} enabled={enabled} access={access} />
      </TabPane>

      <TabPane className="ant-tab-window" tab={t('tabColumns.tanks')} key="3">
        <Tanks id={value?.closeout_nr} enabled={enabled} access={access} />
      </TabPane>
    </Tabs>
  );
};

export default Forms;
