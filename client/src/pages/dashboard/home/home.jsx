import React from 'react';
import { Card, Col, Row, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from '../../../components';
import { folio, movement, ids } from './columns';
import { DASHBOARD } from '../../../api';

const Home = () => {
  const { t } = useTranslation();
  const { data: payload } = useSWR(DASHBOARD.HOME);

  const data = payload?.records ? payload?.records[0] : {};

  const isLoading = !payload;

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title={`Tankers`} hoverable size="small" loading={isLoading}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: '66%',
                }}
              >
                <Descriptions bordered size="small">
                  <Descriptions.Item label="Active:" span={12}>
                    {`${data.tanker_active}  [${
                      Math.floor((data?.tanker_active / data?.tanker_total) * 100) || 0
                    }%]`}
                  </Descriptions.Item>

                  <Descriptions.Item label="Total:" span={12}>
                    {data.tanker_total}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <img src="/svg/truck.svg" alt="truck" style={{ height: 150, width: '33%' }} />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title={`Personnel`} hoverable size="small" loading={isLoading}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: '66%',
                }}
              >
                <Descriptions bordered size="small">
                  <Descriptions.Item label="Active:" span={12}>
                    {`${data.personnel_active}  [${
                      Math.floor((data?.personnel_active / data?.personnel_total) * 100) || 0
                    }%]`}
                  </Descriptions.Item>

                  <Descriptions.Item label="Total:" span={12}>
                    {data.personnel_total}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <img src="/svg/people.svg" alt="truck" style={{ height: 150, width: '33%' }} />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title={`ID Assignment`} hoverable size="small" loading={isLoading}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  width: '66%',
                }}
              >
                <Descriptions bordered size="small">
                  <Descriptions.Item label="Used:" span={12}>
                    {`${data.key_used}  [${Math.floor((data?.key_used / data?.key_available) * 100) || 0}%]`}
                  </Descriptions.Item>

                  <Descriptions.Item label="Available:" span={12}>
                    {data.key_available}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <img src="/svg/id-assignment.svg" alt="truck" style={{ height: 150, width: '33%' }} />
            </div>

            <div style={{ fontSize: 16, position: 'absolute', bottom: 5, fontWeight: 500 }}>
              {`Personnel: ${data?.key_person || 0}, Tanker: ${data?.key_tanker || 0}, Combo: ${
                data?.key_combo || 0
              }, Other: ${data?.key_other || 0}`}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Current Folio" hoverable size="small" loading={isLoading}>
            <DataTable data={data?.folio_loads} columns={folio(t)} height="50vh" minimal />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Tanker Movement" hoverable size="small" loading={isLoading}>
            <DataTable data={data?.tanker_movement} columns={movement(t)} height="50vh" minimal />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Transaction Numbers" hoverable size="small" loading={isLoading}>
            <DataTable data={data?.transaction_ids} columns={ids(t)} height="50vh" minimal />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
