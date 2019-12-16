import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import axios from 'axios';
import { Table } from 'antd';

import auth from '../../auth';
import columns from './columns';
import FlowRates from './flow-rates';
import generator from './generator';
import search from '../../utils/search';

import { baseProducts, adaptiveFlow } from '../../api';
import { Page, Search, Container } from '../../components';

import './adaptive-flow-control.css';

const AdaptiveFlowControl = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [totalFlow, setTotalFLow] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState(null);

  const handleSearch = value => {
    setFiltered(search(value, data));
    setValue(value);
  };

  useEffect(() => {
    const fetch = setInterval(() => {
      axios
        .all([
          baseProducts.readBaseProduct(),
          adaptiveFlow.readFlowRate(),
          adaptiveFlow.readTankCurrentFlow(),
        ])
        .then(
          axios.spread((baseProducts, flowRate, currentFlow) => {
            setLoading(false);
            setTotalFLow(_.sumBy(flowRate.data, 'current_flow_rate'));
            setData(generator(baseProducts.data.records, flowRate.data.records, currentFlow.data));
          }),
        );
    }, 1000);
    return () => clearInterval(fetch);
  }, []);

  const results = filtered ? filtered : data;

  return (
    <Page page={t('pageMenu.operations')} name={t('pageNames.adaptiveFlow')} block={true}>
      <Container>
        <Search value={value} search={handleSearch} />
        <Table
          size="middle"
          dataSource={results}
          rowKey="baseCode"
          bordered
          loading={isLoading}
          columns={columns(results, t)}
          expandedRowRender={tank => FlowRates(tank, t)}
          footer={() => (
            <span style={{ textAlign: 'center' }}>
              {t('descriptions.totalFlow')}: {totalFlow} {t('units.lpm')}{' '}
            </span>
          )}
        />
      </Container>
    </Page>
  );
};

export default auth(AdaptiveFlowControl);
