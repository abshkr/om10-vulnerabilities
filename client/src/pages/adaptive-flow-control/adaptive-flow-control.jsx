import React, { useState, useEffect } from 'react';

import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { BASE_PRODUCTS, ADAPTIVE_FLOW_CONTROL } from '../../api';
import { Page } from '../../components';

import { AdaptiveFlowFooter } from './styles';

import generator from './generator';
import FlowRates from './flow-rates';

import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';
import load from './load';

const AdaptiveFlowControl = () => {
  const access = useAuth('M_ADAPTIVEFLOW');

  const { t } = useTranslation();

  const { data: products } = useSWR(BASE_PRODUCTS.READ, { refreshInterval: 1000 });
  const { data: flow } = useSWR(ADAPTIVE_FLOW_CONTROL.READ, { refreshInterval: 1000 });
  const { data: current } = useSWR(ADAPTIVE_FLOW_CONTROL.CURRENT_FLOW, { refreshInterval: 1000 });

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

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

  //     setTotal(_.sumBy(flow.data, 'current_flow_rate'));
  //     setData(payload);
  //   }
  // }, [isLoading, flow, current, products]);

  console.log(data);
  return (
    <Page page={t('pageMenu.modules')} name={t('pageNames.adaptiveFlow')} access={access}>
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
      />
    </Page>
  );
};

export default auth(AdaptiveFlowControl);
