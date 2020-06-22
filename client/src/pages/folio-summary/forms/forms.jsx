import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, Drawer, Button } from 'antd';
import { RedoOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';

import Tanks from './tanks';
import Reports from './reports';
import Meters from './meters';

const TabPane = Tabs.TabPane;

const Forms = ({ value, visible, handleFormState, access }) => {
  const { t } = useTranslation();

  const enabled = value?.status === 0 || value?.status === 1;

  return (
    <Drawer
      bodyStyle={{ paddingTop: 5 }}
      onClose={() => handleFormState(false, null)}
      // maskClosable={IS_CREATING}
      destroyOnClose={true}
      // mask={IS_CREATING}
      placement="right"
      width="90vw"
      visible={visible}
    >
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane style={{ paddingRight: 0 }} tab={t('tabColumns.reports')} key="1">
          <Reports id={value?.closeout_nr} enabled={enabled} access={access} handleFormState={handleFormState} />
        </TabPane>

        <TabPane style={{ paddingRight: 0 }} tab={t('tabColumns.meters')} key="2">
          <Meters id={value?.closeout_nr} enabled={enabled} access={access} handleFormState={handleFormState} />
        </TabPane>

        <TabPane tab={t('tabColumns.tanks')} key="3">
          <Tanks id={value?.closeout_nr} enabled={enabled} access={access} handleFormState={handleFormState} />
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default Forms;
