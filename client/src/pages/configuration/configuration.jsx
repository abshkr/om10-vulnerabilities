import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Tabs, List, Switch, InputNumber, Button } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { SITE_CONFIGURATION } from '../../api';
import { Page } from '../../components';
import auth from '../../auth';

const { TabPane } = Tabs;

const InputSwitch = (value) => {
  switch (value) {
    case value:
      break;

    default:
      return null;
  }
};

const ConfigurationItems = ({ data }) => (
  <List
    style={{ height: '75vh' }}
    itemLayout="horizontal"
    size="small"
    dataSource={data}
    renderItem={(item) => {
      return (
        <List.Item style={{ background: 'white', marginBottom: 5 }}>
          <List.Item.Meta
            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
            avatar={
              <Switch
                checked={item.config_value === 'Y'}
                disabled={item.config_value !== 'N' && item.config_value !== 'Y'}
                checkedChildren={<span>On</span>}
                unCheckedChildren={<span>Off</span>}
              />
            }
            // eslint-disable-next-line
            title={<a>{item.config_comment}</a>}
          />
          {item.config_value !== 'N' && item.config_value !== 'Y' && (
            <div>
              <InputNumber value={item.config_value} />
            </div>
          )}
        </List.Item>
      );
    }}
  />
);

const Configuration = () => {
  const [closeoutOptions, setCloseoutOptions] = useState([]);
  const [screenAccess, setScreenAccess] = useState([]);
  const [driverPin, setDriverPin] = useState([]);
  const [general, setGeneral] = useState([]);

  const { t } = useTranslation();
  const { data: payload } = useSWR(SITE_CONFIGURATION.READ, { revalidateOnFocus: false });

  const page = t('pageMenu.configuration');

  useEffect(() => {
    const resource = payload?.records;

    if (resource) {
      setDriverPin(_.filter(resource, ['config_required_by_gui', 'P']));
      setScreenAccess(_.filter(resource, ['config_required_by_gui', 'Y']));
      setGeneral(_.filter(resource, ['config_required_by_gui', 'R']));
      setCloseoutOptions(_.filter(resource, ['config_required_by_gui', 'M']));
    }
  }, [payload]);

  const modifiers = <Button type="primary">{t('operations.update')}</Button>;

  return (
    <Page page={page} auth={auth} minimal modifiers={modifiers}>
      <Tabs defaultActiveKey="1" style={{ marginLeft: 5 }}>
        <TabPane tab={t('tabColumns.screenAccess')} key="1">
          <ConfigurationItems data={screenAccess} />
        </TabPane>
        <TabPane tab={t('tabColumns.general')} key="2">
          <ConfigurationItems data={general} />
        </TabPane>
        <TabPane tab={t('tabColumns.driverPin')} key="3">
          <ConfigurationItems data={driverPin} />
        </TabPane>

        <TabPane tab={t('tabColumns.closeoutOptions')} key="4">
          <ConfigurationItems data={closeoutOptions} />
        </TabPane>

        <TabPane tab={t('tabColumns.terminalLocations')} key="5">
          <ConfigurationItems />
        </TabPane>

        <TabPane tab={t('tabColumns.features')} key="6">
          <ConfigurationItems />
        </TabPane>
      </Tabs>
    </Page>
  );
};

export default auth(Configuration);
