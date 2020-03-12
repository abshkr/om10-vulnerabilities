import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Table } from 'antd';

import { DashboardContainer } from './styles';
import { Page } from '../../components';
import Tankers from './tankers';
import auth from '../../auth';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags'
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Page page={t('pageMenu.dashboard')} isBlank={true}>
      <DashboardContainer>
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
            <Card title="Current Folios" bordered={false} actions={[<div>test</div>]}>
              <Table
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 220 }}
              />
            </Card>
          </Col>
        </Row>
      </DashboardContainer>
    </Page>
  );
};

export default auth(Dashboard);
