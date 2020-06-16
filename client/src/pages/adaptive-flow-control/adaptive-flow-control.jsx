import React, { useState, useEffect } from 'react';

import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { BASE_PRODUCTS, ADAPTIVE_FLOW_CONTROL } from '../../api';
import { Page } from '../../components';

import { AdaptiveFlowFooter } from './styles';

import generator from './generator';
import FlowRates from './flow-rates';

import { useAuth } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

const AdaptiveFlowControl = () => {
  const access = useAuth('M_ADAPTIVEFLOWCONTROL');

  const { t } = useTranslation();

  const { data: baseProducts } = useSWR(BASE_PRODUCTS.READ, { refreshInterval: 1000 });
  const { data: flowRate } = useSWR(ADAPTIVE_FLOW_CONTROL.READ, { refreshInterval: 1000 });
  const { data: currentRate } = useSWR(ADAPTIVE_FLOW_CONTROL.CURRENT_FLOW, { refreshInterval: 1000 });

  const [data, setData] = useState([]);

  const isLoading = !baseProducts || !flowRate || !currentRate;

  useEffect(() => {
    if (baseProducts?.records && flowRate?.records && currentRate) {
      const payload = generator(baseProducts?.records, flowRate?.records, currentRate);
      setData(payload);
    }
  }, [isLoading, flowRate, currentRate, baseProducts]);

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
            {t('descriptions.totalFlow')}: {0} {t('units.lpm')}{' '}
          </AdaptiveFlowFooter>
        )}
      />
    </Page>
  );
};

export default auth(AdaptiveFlowControl);
