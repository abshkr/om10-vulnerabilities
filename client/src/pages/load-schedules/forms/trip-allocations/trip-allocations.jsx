import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, notification, Tag, Row, Col, Card, Descriptions, Table } from 'antd';
import { mutate } from 'swr';

import _ from 'lodash';

import api, { STAGING_BAY } from 'api';
import columns from './columns';
import AllocationProducts from './allocation-products';

import { AllocationFooter, AllocationContainer } from './styles';

const TripAllocations = ({ supplier, drawer, customer, carrier, disabled, config }) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  const { data: payload } = useSWR(STAGING_BAY.ALLOCATIONS);

  const getRowKey = (record) => {
    return `${record?.alloc_index}-${record?.alloc_type}-${record?.alloc_cmpycode}-${record?.alloc_suppcode}`;
  };

  useEffect(() => {
    // 1 - SUPPLIER
    // 2 - CARRIER
    // 3 - CUSTOMER
    // 4 - DRAWER
    if (payload) {
      const items = _.filter(
        payload?.records,
        (o) =>
          (o?.alloc_type === '1' && o?.alloc_cmpycode === supplier) ||
          (o?.alloc_type === '2' && o?.alloc_cmpycode === carrier) ||
          (o?.alloc_type === '3' && customer?.indexOf(o?.alloc_cmpycode) >= 0) ||
          (o?.alloc_type === '4' && o?.alloc_cmpycode === drawer)
      );

      // setData(items);
      setData(payload?.records);
    }
  }, [supplier, drawer, customer, carrier, payload]);

  return (
    <Card hoverable>
      <Row gutter={[2, 12]}>
        <Col span={10}>
          <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
            <Descriptions.Item label={t('fields.supplier')} span={1}>
              {supplier}
            </Descriptions.Item>
            <Descriptions.Item label={t('fields.drawer')} span={1}>
              {drawer}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={14}>
          <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
            <Descriptions.Item label={t('fields.customer')} span={1}>
              {customer?.toString()}
            </Descriptions.Item>
            <Descriptions.Item label={t('fields.carrier')} span={1}>
              {carrier}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <AllocationContainer>
            <Table
              dataSource={data}
              rowKey={getRowKey}
              bordered
              loading={false}
              columns={columns(t, config)}
              pagination={false}
              expandable={{
                expandedRowRender: (allocation) => AllocationProducts({ allocation, t, config }),
              }}
              // expandedRowRender={(item) => AllocationProducts(item, t)}
              // footer={() => (
              //   <AllocationFooter>
              //     {t('descriptions.totalFlow')}: {0} {t('units.lpm')}{' '}
              //   </AllocationFooter>
              // )}
              scroll={{ x: true, y: '300px' }}
              // scroll={{  }}
            />
          </AllocationContainer>
        </Col>
      </Row>
    </Card>
  );
};

export default TripAllocations;
