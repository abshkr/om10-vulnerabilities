import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';
import useSWR from 'swr';
import { PRODUCT_MOVEMENTS } from 'api';

const StartFolio = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const { data: payload } = useSWR(`${PRODUCT_MOVEMENTS.START_FOLIO}?pmv_number=${value?.pmv_number}`);

  useEffect(() => {
    if (payload && payload.records.length > 0) {
      setFieldsValue({
        start_nr: payload.records[0].closeout_nr,
        pmv_date1: payload.records[0].pmv_date1,
        start_tank_level: payload.records[0].tank_level,
        pmv_open_amb: payload.records[0].pmv_open_amb,
        pmv_open_cor: payload.records[0].pmv_open_cor,
        pmv_open_kg: payload.records[0].pmv_open_kg,
        open_temp: payload.records[0].open_temp,
        open_density: payload.records[0].open_density,
      });
    }
  }, [payload]);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item name="start_nr" label={t('fields.startCloseout')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="pmv_date1" label={t('fields.startDate')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="start_tank_level" label={t('fields.startLevel')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="open_temp" label={t('fields.startTemp')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item name="pmv_open_amb" label={t('fields.startAmb')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="pmv_open_cor" label={t('fields.startStd')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="pmv_open_kg" label={t('fields.startKg')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="open_density" label={t('fields.startDens')}>
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default StartFolio;
