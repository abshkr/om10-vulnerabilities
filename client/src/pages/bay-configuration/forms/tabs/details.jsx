import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import {
  Code,
  Name,
  BayType,
  BayLoadType,
  BayArea,
  BayLoadOption,
  BayStats,
  BayLockFlag,
  BayAuxiliary,
  BayChannel,
  BayHost,
  BayInstance,
  BayServer,
  BayDevice,
  BayDeviceType,
  BayDeviceLockFlag,
  BayDeviceAuxiliary,
  BayDeviceChannel,
  BayDeviceHost,
  BayDeviceInstance,
  BayDeviceServer,
} from '../../forms/fields';

const Details = ({ form, value, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const disabledFlag = true;

  return (
    <>
      <Card
        size="small"
        hoverable
        style={{ marginBottom: 5, marginTop: 5 }}
        bodyStyle={{ padding: 5 }}
        title={t('tabColumns.bayMain')}
      >
        <Row gutter={[12, 4]}>
          <Col span={6}>
            <Code form={form} value={value} config={config} />
          </Col>
          <Col span={6}>
            <Name form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayType form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayLoadType form={form} value={value} disabled={disabledFlag} />
          </Col>
        </Row>
        <Row gutter={[12, 4]}>
          <Col span={6}>
            <BayLockFlag form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayLoadOption form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayArea form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayStats form={form} value={value} disabled={disabledFlag} />
          </Col>
        </Row>
        <Row gutter={[12, 4]}>
          <Col span={6}>
            <BayHost form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayServer form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={4}>
            <BayInstance form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={4}>
            <BayChannel form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={4}>
            <BayAuxiliary form={form} value={value} disabled={disabledFlag} />
          </Col>
        </Row>
      </Card>

      <Card
        size="small"
        hoverable
        style={{ marginBottom: 5, marginTop: 25 }}
        bodyStyle={{ padding: 5 }}
        title={t('tabColumns.bayDevice')}
      >
        <Row gutter={[12, 4]}>
          <Col span={6}>
            <BayDeviceLockFlag form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayDevice form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={12}>
            <BayDeviceType form={form} value={value} disabled={disabledFlag} />
          </Col>
        </Row>
        <Row gutter={[12, 4]}>
          <Col span={6}>
            <BayDeviceHost form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={6}>
            <BayDeviceServer form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={4}>
            <BayDeviceInstance form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={4}>
            <BayDeviceChannel form={form} value={value} disabled={disabledFlag} />
          </Col>
          <Col span={4}>
            <BayDeviceAuxiliary form={form} value={value} disabled={disabledFlag} />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Details;
