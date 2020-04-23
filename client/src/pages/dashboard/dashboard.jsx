import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Table, Tabs } from 'antd';

import { DashboardContainer } from './styles';
import { Page } from '../../components';
import Tankers from './tankers';
import auth from '../../auth';

const columns = [
  {
    title: 'Bay Number',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Number of Unloads',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Total Products',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Average Quantity / Load',
    key: 'tags',
    dataIndex: 'tags',
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Page page={t('pageMenu.dashboard')} isBlank={true}>
      <DashboardContainer>
        <Tabs defaultActiveKey="1" style={{ marginTop: -20 }}>
          <Tabs.TabPane tab="Overview" key="1">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="Tankers" bordered={false}>
                  <Tankers />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Personnel" bordered={false}>
                  <Tankers />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Id Assignment" bordered={false}>
                  <Tankers />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Card title="Tanker Movement" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Transaction Ids" bordered={false}>
                  Card content
                </Card>
              </Col>

              <Col span={12}>
                <Card title="Current Folios" bordered={false}>
                  <Table
                    size="small"
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                    scroll={{ y: 280 }}
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="System Status" key="2"></Tabs.TabPane>
        </Tabs>
      </DashboardContainer>
    </Page>
  );
};

export default auth(Dashboard);
