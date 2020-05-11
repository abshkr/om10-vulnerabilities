import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Icons, DataTable } from '../../../components';
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
          <Card
            title={`Tankers [${((data?.tanker_active / data?.tanker_total) * 100 || 0).toFixed(2)}]%`}
            hoverable
            size="small"
            loading={isLoading}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Statistic
                title="Total Active Tankers"
                value={data.tanker_active}
                suffix={`/ ${data.tanker_total}`}
              />
              <img src="/svg/truck.svg" alt="truck" />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={`Personnel [${((data?.personnel_active / data?.personnel_total) * 100 || 0).toFixed(2)}]%`}
            hoverable
            size="small"
            loading={isLoading}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Statistic
                title="Total Active Personnel"
                value={data.personnel_active}
                suffix={`/ ${data.personnel_total}`}
              />
              <Icons type="id" scale={1} size={86} />
              <img src="/svg/people.svg" alt="people" />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title={`Id Assignment [${((data?.key_used / data?.key_available) * 100 || 0).toFixed(2)}]%`}
            hoverable
            size="small"
            loading={isLoading}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Statistic
                  title="Total Used Assignments"
                  value={data?.key_used}
                  suffix={`/ ${data?.key_available}`}
                />
                <div
                  style={{
                    height: 65,
                    display: 'flex',
                    alignContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}
                >{`Personnel: ${data?.key_person || 0}, Tanker: ${data?.key_tanker || 0}, Combo: ${
                  data?.key_combo || 0
                }, Other: ${data?.key_other || 0}`}</div>
              </div>
              <Icons type="people" scale={1} size={86} />
              <img src="/svg/id.svg" alt="id" />
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
          <Card title="Transaction Ids" hoverable size="small" loading={isLoading}>
            <DataTable data={data?.transaction_ids} columns={ids(t)} height="50vh" minimal />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
