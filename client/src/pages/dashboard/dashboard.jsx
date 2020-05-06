import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Tabs, Statistic, Table } from 'antd';

import { DashboardContainer } from './styles';
import { Page, Chart, Icons } from '../../components';
import auth from '../../auth';

const Dashboard = () => {
  const { t } = useTranslation();

  const colors = ['#0054a4', '#f79043', '#edc3b2', '#24b55e', '#f94646'];

  const throughput = {
    labels: ['Folio Type'],
    datasets: [
      {
        label: 'Last Week',
        data: [8220],
        backgroundColor: ['#52a5dd'],
        hoverBackgroundColor: ['#52a5dd'],
        hoverBorderColor: ['#52a5dd'],
      },

      {
        label: 'Current Week',
        data: [2101],
        backgroundColor: ['#f79043'],
        hoverBackgroundColor: ['#f79043'],
        hoverBorderColor: ['#f79043'],
      },

      {
        label: 'Previous Folio',
        data: [1521],
        backgroundColor: ['#edc3b2'],
        hoverBackgroundColor: ['#edc3b2'],
        hoverBorderColor: ['#edc3b2'],
      },

      {
        label: 'Current Folio',
        data: [720],
        backgroundColor: ['#24b55e'],
        hoverBackgroundColor: ['#24b55e'],
        hoverBorderColor: ['#24b55e'],
      },
    ],
  };

  const storage = {
    labels: ['Product'],
    datasets: [
      {
        label: 'ULP',
        data: [15200],
        backgroundColor: ['#52a5dd'],
        hoverBackgroundColor: ['#52a5dd'],
        hoverBorderColor: ['#52a5dd'],
      },

      {
        label: 'ULG',
        data: [14221],
        backgroundColor: ['#f79043'],
        hoverBackgroundColor: ['#f79043'],
        hoverBorderColor: ['#f79043'],
      },

      {
        label: 'Jet-A1',
        data: [8430],
        backgroundColor: ['#edc3b2'],
        hoverBackgroundColor: ['#edc3b2'],
        hoverBorderColor: ['#edc3b2'],
      },

      {
        label: 'Nemo 2015',
        data: [4329],
        backgroundColor: ['#24b55e'],
        hoverBackgroundColor: ['#24b55e'],
        hoverBorderColor: ['#24b55e'],
      },

      {
        label: 'Nemo 6114',
        data: [3012],
        backgroundColor: ['#f94646'],
        hoverBackgroundColor: ['#f94646'],
        hoverBorderColor: ['#f94646'],
      },
    ],
  };

  const folio = {
    labels: ['Product'],
    datasets: [
      {
        label: 'RON 97',
        data: [230],
        backgroundColor: ['#52a5dd'],
        hoverBackgroundColor: ['#52a5dd'],
        hoverBorderColor: ['#52a5dd'],
      },

      {
        label: 'RON 95',
        data: [400],
        backgroundColor: ['#f79043'],
        hoverBackgroundColor: ['#f79043'],
        hoverBorderColor: ['#f79043'],
      },

      {
        label: 'V-POWER',
        data: [150],
        backgroundColor: ['#edc3b2'],
        hoverBackgroundColor: ['#edc3b2'],
        hoverBorderColor: ['#edc3b2'],
      },

      {
        label: 'Diesel',
        data: [290],
        backgroundColor: ['#24b55e'],
        hoverBackgroundColor: ['#24b55e'],
        hoverBorderColor: ['#24b55e'],
      },

      {
        label: 'Jet-A1',
        data: [195],
        backgroundColor: ['#f94646'],
        hoverBackgroundColor: ['#f94646'],
        hoverBorderColor: ['#f94646'],
      },
    ],
  };

  const yearlyThroughput = {
    labels: [
      'Week 8',
      'Week 9',
      'Week 10',
      'Week 11',
      'Week 12',
      'Week 13',
      'Week 14',
      'Week 15',
      'Week 16',
      'Week 17',
      'Week 18',
      'Week 19',
    ],
    datasets: [
      {
        label: 'RON 97',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#52a5dd'],
        hoverBorderColor: ['#52a5dd'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'RON 95',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#f79043'],
        hoverBorderColor: ['#f79043'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'V-POWER',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#edc3b2'],
        hoverBorderColor: ['#edc3b2'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'Diesel',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#24b55e'],
        hoverBorderColor: ['#24b55e'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'Jet-A1',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#f94646'],
        hoverBorderColor: ['#f94646'],
        borderWidth: 0.98,
        fill: false,
      },
    ],
  };

  const currentFolioData = [
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },

    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
    {
      key: '1',
      name: 'test',
      age: 32,
      address: 'test',
    },
  ];

  const currentFolioColumns = [
    {
      title: 'Bay',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of (Un)Loads',
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
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const tankerMovementColumns = [
    {
      title: 'Bay/Loads',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of (Un)Loads',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '%',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const transactionColumns = [
    {
      title: 'Bay Code',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Max ID',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Total Transactions',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <Page page={t('pageMenu.dashboard')} isBlank noHeader>
      <DashboardContainer>
        <Tabs type="card" defaultActiveKey="0">
          <Tabs.TabPane tab="Home" key="0">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="Tankers" hoverable size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Statistic title="Total / Active" value={802} suffix="/ 798" />
                    <img src="/svg/truck.svg" />
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Personnel" hoverable size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Statistic title="Total / Active" value={45} suffix="/ 38" />
                    <Icons type="id" scale={1} size={86} />
                    <img src="/svg/people.svg" />
                  </div>
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Id Assignment [0.03]%" hoverable size="small">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Statistic title="Available / Used" value={4000} suffix="/ 1" />
                    <Icons type="people" scale={1} size={86} />
                    <img src="/svg/id.svg" />
                  </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card title="Current Folio" hoverable size="small">
                  <Table
                    dataSource={currentFolioData}
                    columns={currentFolioColumns}
                    bordered
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Tanker Movement" hoverable size="small">
                  <Table
                    dataSource={currentFolioData}
                    columns={tankerMovementColumns}
                    bordered
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Transaction Ids" hoverable size="small">
                  <Table
                    dataSource={currentFolioData}
                    columns={transactionColumns}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Overview" key="1">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Total Throughput (m3)" hoverable size="small">
                  <Chart type="bar" height={100} data={throughput} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Product Storage (m3)" hoverable size="small">
                  <Chart type="bar" height={100} data={storage} />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Current Folio Throughput (m3)" hoverable size="small">
                  <Chart type="bar" height={100} data={folio} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Weekly Throughput (m3)" hoverable size="small">
                  <Chart type="line" height={100} data={yearlyThroughput} />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="System Status" key="2"></Tabs.TabPane>
          <Tabs.TabPane tab="Favourites" key="3"></Tabs.TabPane>
        </Tabs>
      </DashboardContainer>
    </Page>
  );
};

export default auth(Dashboard);
