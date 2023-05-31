import React, { useEffect, useState, Fragment } from 'react';

import { EditOutlined, PlusOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { Form, Button, Card, Tabs, Modal, notification, Drawer, Row, Col, InputNumber } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { useTranslation } from 'react-i18next';
import useSWR, { mutate } from 'swr';
import api from 'api';
import _ from 'lodash';

import { SETTINGS } from '../../../../constants';
import { LOAD_SCHEDULES, TANKER_LIST } from '../../../../api';

import PreSchedules from './pre-schedules';
import PreOrders from './pre-orders';
import OpenOrders from './open-orders';

const TabPane = Tabs.TabPane;

const StagedSources = ({ value, form, supplier, config }) => {
  const { t } = useTranslation();

  /*
    1	F	NEW SCHEDULE
    2	S	SPECED
    3	A	ACTIVE
    4	L	LOADING
    5	E	ENDED
    6	D	DELIVERED OK
  */

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card
          size="small"
          title={t('tabColumns.stagingSources')}
          hoverable
          headStyle={{ paddingRight: 10, fontWeight: 'bold' }}
          style={{ marginBottom: 8 }}
          // extra={popupText}
        >
          <Tabs defaultActiveKey="1" type="card">
            <TabPane key="1" tab={t('tabColumns.preSchedules')}>
              <PreSchedules value={value} form={form} supplier={supplier} config={config} />
            </TabPane>

            <TabPane key="2" tab={t('tabColumns.preOrders')}>
              <PreOrders value={value} form={form} supplier={supplier} config={config} />
            </TabPane>

            <TabPane key="3" tab={t('tabColumns.openOrders')}>
              <OpenOrders value={value} form={form} supplier={supplier} config={config} />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default StagedSources;
