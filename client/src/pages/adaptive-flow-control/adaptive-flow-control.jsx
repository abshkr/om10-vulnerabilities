import React, { useState, useEffect } from 'react';

import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { BASE_PRODUCTS, ADAPTIVE_FLOW_CONTROL } from '../../api';
import { Page } from '../../components';
import CannotAccess from '../../components/cannot-access';

import { AdaptiveFlowFooter, AdaptiveFlowContainer } from './styles';

import generator from './generator';
import FlowRates from './flow-rates';

import { useAuth, useConfig } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import load from './load';

const AdaptiveFlowControl = () => {
  const config = useConfig();
  const access = useAuth('M_ADAPTIVEFLOW');

  const { t } = useTranslation();

  const { data: products } = useSWR(BASE_PRODUCTS.READ, { refreshInterval: 1000 });
  const { data: flow } = useSWR(ADAPTIVE_FLOW_CONTROL.READ, { refreshInterval: 1000 });
  const { data: current } = useSWR(ADAPTIVE_FLOW_CONTROL.CURRENT_FLOW, { refreshInterval: 1000 });
  const { data: comms } = useSWR(ADAPTIVE_FLOW_CONTROL.COMMS, { refreshInterval: 1000 });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [connected, setConnected] = useState(false);

  const isLoading = !products || !flow || !current;

  useEffect(() => {
    const interval = setInterval(() => {
      const data = load();

      const payload = generator(data?.products, data?.flow, data?.current);

      setTotal(_.sumBy(data?.flow, 'current_flow_rate'));
      setData(payload);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (products?.records && flow?.records && current) {
  //     const payload = generator(products?.records, flow?.records, current);
  //     // console.log('...........products?.records && flow?.records && current', products, flow, current);
  //     // _.forEach(flow?.records, (arm) => {
  //     //   arm.current_flow_rate = 1000;
  //     // });

  //     setTotal(_.round(_.sumBy(flow?.records, 'current_flow_rate'), 2));
  //     setData(payload);
  //   }
  // }, [isLoading, flow, current, products]);

  if (config?.siteUseAFC) {
    return <CannotAccess target={t('pageNames.adaptiveFlowControl')} />;
  } else {
    return (
      <Page page={t('pageMenu.modules')} name={t('pageNames.adaptiveFlow')} access={access}>
        <AdaptiveFlowContainer>
          <Table
            dataSource={data}
            rowKey="baseCode"
            bordered
            loading={false}
            columns={columns(data, t)}
            expandedRowRender={(tank) => FlowRates(tank, t)}
            footer={() => (
              <AdaptiveFlowFooter>
                {t('descriptions.totalFlow')}: {total} {t('units.lpm')}{' '}
              </AdaptiveFlowFooter>
            )}
            scroll={{ x: 1500 }}
          />
        </AdaptiveFlowContainer>
      </Page>
    );
  }
};

export default auth(AdaptiveFlowControl);
