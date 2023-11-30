import React, { useState } from 'react';

import { Button, Card, Row, Col, Descriptions } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';

import { DataTable, Download } from '../../../components';
import { BAY_CONFIGURATION } from '../../../api';
import { useConfig } from '../../../hooks';

import generator from './generator';
import columns from './columns';
// import Forms from './forms';

const BayMeters = ({ bay, value, access, config }) => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: payload, isValidating, mutate: revalidate } = useSWR(BAY_CONFIGURATION.PIPENODES);
  // const { data: configuration } = useSWR(COMMON.CONFIG);

  const fields = columns(config, t);
  const records = generator(payload?.records, bay, t);

  const handleFormState = (visibility, value) => {
    setVisible(visibility);
    setSelected(value);
  };

  /* const modifiers = (
    <>
      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isValidating} columns={fields} />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => handleFormState(true, null)}
        loading={isValidating}
        disabled={!access.canCreate}
      >
        {t('operations.create')}
      </Button>
    </>
  ); */

  return (
    <>
      <Card hoverable>
        <Row gutter={[2, 12]}>
          <Col span={10}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.bayCode')} span={1}>
                {bay && value?.stream_baycode}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={14}>
            <Descriptions bordered size="small" layout="horizontal" style={{ marginTop: 0 }} column={1}>
              <Descriptions.Item label={t('fields.bayName')} span={1}>
                {bay && value?.stream_bayname}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <div>{/*modifiers*/}</div>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col span={24}>
            <DataTable
              minimal={true}
              columns={fields}
              data={!bay ? [] : records}
              autoColWidth
              parentHeight="600px"
              onClick={(payload) => handleFormState(true, payload)}
              handleSelect={(payload) => handleFormState(true, payload[0])}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default BayMeters;
