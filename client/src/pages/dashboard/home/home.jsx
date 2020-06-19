import React, { useContext } from 'react';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from 'components';
import { DASHBOARD } from 'api';

import { folio, movement, ids } from './columns';

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
                  flexDirection: 'column',
                  width: '66%',
                }}
              >
                <table className="statistic" style={{ width: '50%' }}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className="first">
                      <td>Active:</td>
                      <td style={{ textAlign: 'right' }}>{data?.tanker_active}</td>
                      <td style={{ textAlign: 'right' }}>{` [${
                        Math.floor((data?.tanker_active / data?.tanker_total) * 100) || 0
                      }%]`}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>Total:</td>
                      <td style={{ textAlign: 'right' }}>{data?.tanker_total}</td>
                    </tr>
                  </tbody>
                </table>
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
                <table className="statistic" style={{ width: '50%' }}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className="first">
                      <td>Unlocked:</td>
                      <td style={{ textAlign: 'right' }}>{data?.personnel_unlocked}</td>
                      <td style={{ textAlign: 'right' }}>{` [${
                        Math.floor((data?.personnel_unlocked / data?.personnel_total) * 100) || 0
                      }%]`}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>Total:</td>
                      <td style={{ textAlign: 'right' }}>{data?.personnel_total}</td>
                    </tr>
                  </tbody>
                </table>
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
                <table className="statistic" style={{ width: '66%' }}>
                  <tbody>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className="first">
                      <td>Used:</td>
                      <td style={{ textAlign: 'right' }}>{data?.key_used}</td>
                      <td style={{ textAlign: 'right' }}>{` [${
                        Math.floor((data?.key_used / data?.key_available) * 100) || 0
                      }%]`}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>Available:</td>
                      <td style={{ textAlign: 'right' }}>{data?.key_available}</td>
                    </tr>
                  </tbody>
                </table>
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
            <DataTable
              data={data?.folio_loads}
              columns={folio(t)}
              parentHeight="450px"
              minimal
              footer={[
                {
                  trsa_bay_cd: 'Total: ',
                  loads: _.sumBy(data?.folio, (object) => {
                    return _.toNumber(object?.loads) || 0;
                  }),
                  sum_amb: _.sumBy(data?.folio, (object) => {
                    return _.toNumber(object?.sum_amb) || 0;
                  }),
                  avgamb_per_load: null,
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Tanker Movement" hoverable size="small" loading={isLoading}>
            <DataTable
              data={data?.tanker_movement}
              columns={movement(t)}
              parentHeight="450px"
              minimal
              footer={[
                {
                  bays_per_load: 'Total: ',
                  loads: _.sumBy(data?.tanker_movement, (object) => {
                    return _.toNumber(object?.loads) || 0;
                  }),
                  percent: null,
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Transaction Numbers" hoverable size="small" loading={isLoading}>
            <DataTable data={data?.transaction_ids} columns={ids(t)} parentHeight="450px" minimal />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
