import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Tabs, Statistic, Table } from 'antd';

import { DashboardContainer } from './styles';
import { Page, Chart } from '../../components';
import auth from '../../auth';

const Dashboard = () => {
  const { t } = useTranslation();

  const assignment = {
    labels: ['Available', 'Used'],
    datasets: [
      {
        data: [798, 500],
        backgroundColor: ['#66a61e', '#e7298a'],
        hoverBackgroundColor: ['#66a61e', '#e7298a'],
        hoverBorderColor: ['#66a61e', '#e7298a'],
      },
    ],
  };

  const throughput = {
    labels: ['Folio Type'],
    datasets: [
      {
        label: 'Last Week',
        data: [8220],
        backgroundColor: ['#666666'],
        hoverBackgroundColor: ['#666666'],
        hoverBorderColor: ['#666666'],
      },

      {
        label: 'Current Week',
        data: [2101],
        backgroundColor: ['#a6761d'],
        hoverBackgroundColor: ['#a6761d'],
        hoverBorderColor: ['#a6761d'],
      },

      {
        label: 'Previous Folio',
        data: [1521],
        backgroundColor: ['#e6ab02'],
        hoverBackgroundColor: ['#e6ab02'],
        hoverBorderColor: ['#e6ab02'],
      },

      {
        label: 'Current Folio',
        data: [720],
        backgroundColor: ['#66a61e'],
        hoverBackgroundColor: ['#66a61e'],
        hoverBorderColor: ['#66a61e'],
      },
    ],
  };

  const storage = {
    labels: ['Product'],
    datasets: [
      {
        label: 'ULP',
        data: [15200],
        backgroundColor: ['#666666'],
        hoverBackgroundColor: ['#666666'],
        hoverBorderColor: ['#666666'],
      },

      {
        label: 'ULG',
        data: [14221],
        backgroundColor: ['#a6761d'],
        hoverBackgroundColor: ['#a6761d'],
        hoverBorderColor: ['#a6761d'],
      },

      {
        label: 'Jet-A1',
        data: [8430],
        backgroundColor: ['#e6ab02'],
        hoverBackgroundColor: ['#e6ab02'],
        hoverBorderColor: ['#e6ab02'],
      },

      {
        label: 'Nemo 2015',
        data: [4329],
        backgroundColor: ['#66a61e'],
        hoverBackgroundColor: ['#66a61e'],
        hoverBorderColor: ['#66a61e'],
      },

      {
        label: 'Nemo 6114',
        data: [3012],
        backgroundColor: ['#e7298a'],
        hoverBackgroundColor: ['#e7298a'],
        hoverBorderColor: ['#e7298a'],
      },
    ],
  };

  const folio = {
    labels: ['Product'],
    datasets: [
      {
        label: 'RON 97',
        data: [230],
        backgroundColor: ['#666666'],
        hoverBackgroundColor: ['#666666'],
        hoverBorderColor: ['#666666'],
      },

      {
        label: 'RON 95',
        data: [400],
        backgroundColor: ['#a6761d'],
        hoverBackgroundColor: ['#a6761d'],
        hoverBorderColor: ['#a6761d'],
      },

      {
        label: 'V-POWER',
        data: [150],
        backgroundColor: ['#e6ab02'],
        hoverBackgroundColor: ['#e6ab02'],
        hoverBorderColor: ['#e6ab02'],
      },

      {
        label: 'Diesel',
        data: [290],
        backgroundColor: ['#66a61e'],
        hoverBackgroundColor: ['#66a61e'],
        hoverBorderColor: ['#66a61e'],
      },

      {
        label: 'Jet-A1',
        data: [195],
        backgroundColor: ['#e7298a'],
        hoverBackgroundColor: ['#e7298a'],
        hoverBorderColor: ['#e7298a'],
      },
    ],
  };

  const yearlyThroughput = {
    labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'RON 97',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#666666'],
        hoverBorderColor: ['#666666'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'RON 95',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#a6761d'],
        hoverBorderColor: ['#a6761d'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'V-POWER',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#e6ab02'],
        hoverBorderColor: ['#e6ab02'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'Diesel',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#66a61e'],
        hoverBorderColor: ['#66a61e'],
        borderWidth: 0.98,
        fill: false,
      },

      {
        label: 'Jet-A1',
        data: [...Array(12)].map(() => Math.floor(Math.random() * 600)),
        borderColor: ['#e7298a'],
        hoverBorderColor: ['#e7298a'],
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
      title: 'Bay Number',
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
                <Card title="Tankers">
                  <Statistic title="Total / Active" value={802} suffix="/ 798" />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Personnel">
                  <Statistic title="Total / Active" value={45} suffix="/ 38" />
                </Card>
              </Col>

              <Col span={8}>
                <Card title="Id Assignment [0.03]%">
                  <Statistic title="Available / Used" value={4000} suffix="/ 1" />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Card bodyStyle={{ padding: 5 }} title="Current Folio" size="small">
                  <Table
                    dataSource={currentFolioData}
                    columns={currentFolioColumns}
                    bordered
                    scroll={{ y: 508 }}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>

              <Col span={8}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card bodyStyle={{ padding: 5 }} title="Tanker Movement" size="small">
                      <Table
                        dataSource={currentFolioData}
                        columns={tankerMovementColumns}
                        bordered
                        scroll={{ y: 200 }}
                        pagination={false}
                        size="small"
                      />
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card bodyStyle={{ padding: 5 }} title="Transaction Ids" size="small">
                      <Table
                        dataSource={currentFolioData}
                        columns={transactionColumns}
                        bordered
                        scroll={{ y: 200 }}
                        pagination={false}
                        size="small"
                      />
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Overview" key="1">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Total Throughput (m3)">
                  <Chart type="bar" height={100} data={throughput} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Product Storage (m3)">
                  <Chart type="bar" height={100} data={storage} />
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Current Folio Throughput (m3)">
                  <Chart type="bar" height={100} data={folio} />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Yearly Throughput (m3)">
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
