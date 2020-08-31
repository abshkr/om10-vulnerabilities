import React, { useContext } from 'react';
import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import _ from 'lodash';

import { DataTable } from 'components';
import { DASHBOARD } from 'api';
import * as ROUTES from 'constants/routes';

import { folio, movement, ids } from './columns';

const Home = () => {
  const { t } = useTranslation();
  const { data: payload } = useSWR(DASHBOARD.HOME);

  let history = useHistory();

  const data = payload?.records ? payload?.records[0] : {};

  const isLoading = !payload;

  const onTankers = (v) => {
    if (v.target.className === "ant-card-head-title") {
      history.push(ROUTES.TANKER_LIST);
    }
  }

  const onPersonnel = (v) => {
    if (v.target.className === "ant-card-head-title") {
      history.push(ROUTES.PERSONNEL);
    }
  }

  const onID = (v) => {
    if (v.target.className === "ant-card-head-title") {
      history.push(ROUTES.ID_ASSIGNMENT);
    }
  }

  const onFolio = (v) => {
    if (v.target.className === "ant-card-head-title") {
      history.push(ROUTES.FOLIO_SUMMARY);
    }
  }

  const onSchedule = (v) => {
    if (v.target.className === "ant-card-head-title") {
      history.push(ROUTES.LOAD_SCHEDULES);
    }
  }

  const onTransactionList = (v) => {
    if (v.target.className === "ant-card-head-title") {
      history.push(ROUTES.TRANSACTION_LIST);
    } 
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title={t('pageNames.overviewTankers')} hoverable size="small" loading={isLoading} onClick={onTankers}>
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
                      <td>{t('fields.countActive')+':'}</td>
                      <td style={{ textAlign: 'right' }}>{data?.tanker_active}</td>
                      <td style={{ textAlign: 'right' }}>{` [${
                        Math.floor((data?.tanker_active / data?.tanker_total) * 100) || 0
                      }%]`}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>{t('fields.totalCount')+':'}</td>
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
          <Card title={t('pageNames.overviewPersonnel')} hoverable size="small" loading={isLoading} onClick={onPersonnel}>
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
                      <td>{t('fields.countUnlocked')+':'}</td>
                      <td style={{ textAlign: 'right' }}>{data?.personnel_unlocked}</td>
                      <td style={{ textAlign: 'right' }}>{` [${
                        Math.floor((data?.personnel_unlocked / data?.personnel_total) * 100) || 0
                      }%]`}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>{t('fields.totalCount')+':'}</td>
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
          <Card title={t('pageNames.overviewIdAssignment')} hoverable size="small" loading={isLoading} onClick={onID}>
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
                      <td>{t('fields.countUsed')+':'}</td>
                      <td style={{ textAlign: 'right' }}>{data?.key_used}</td>
                      <td style={{ textAlign: 'right' }}>{` [${
                        Math.floor((data?.key_used / data?.key_available) * 100) || 0
                      }%]`}</td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr>
                      <td>{t('fields.countAvailable')+':'}</td>
                      <td style={{ textAlign: 'right' }}>{data?.key_available}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <img src="/svg/id-assignment.svg" alt="truck" style={{ height: 150, width: '33%' }} />
            </div>

            <div style={{ fontSize: 16, position: 'absolute', bottom: 5, fontWeight: 500 }}>
              {`${t('fields.countTagPersonnel')}: ${data?.key_person || 0}, ${t('fields.countTagTanker')}: ${data?.key_tanker || 0}, ${t('fields.countTagCombo')}: ${
                data?.key_combo || 0
              }, ${t('fields.countTagOther')}: ${data?.key_other || 0}`}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title={t('pageNames.overviewCurrentFolio')} hoverable size="small" loading={isLoading} onClick={onFolio}>
            <DataTable
              data={data?.folio_loads}
              columns={folio(t)}
              parentHeight="450px"
              minimal
              footer={[
                {
                  trsa_bay_cd: t('fields.totalSum') + ': ',
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
          <Card title={t('pageNames.overviewTankerMovement')} hoverable size="small" loading={isLoading} onClick={onSchedule}>
            <DataTable
              data={data?.tanker_movement}
              columns={movement(t)}
              parentHeight="450px"
              minimal
              footer={[
                {
                  bays_per_load: t('fields.totalSum') + ': ',
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
          <Card title={t('pageNames.overviewTransactionNumbers')} hoverable size="small" loading={isLoading} onClick={onTransactionList}>
            <DataTable data={data?.transaction_ids} columns={ids(t)} parentHeight="450px" minimal />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
