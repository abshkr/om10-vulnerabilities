import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';
import useSWR from 'swr';
import { PRODUCT_MOVEMENTS } from 'api';

const EndFolio = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const { data: payload } = useSWR(`${PRODUCT_MOVEMENTS.END_FOLIO}?pmv_number=${value?.pmv_number}`);

  useEffect(() => {
    if (payload && payload.records.length > 0) {
      console.log(payload.records)
      setFieldsValue({
        closeout_nr: payload.records[0].closeout_nr,
        pmv_date2: payload.records[0].pmv_date2,
        tank_level: payload.records[0].tank_level,
        pmv_close_amb: payload.records[0].pmv_close_amb,
        pmv_close_cor: payload.records[0].pmv_close_cor,
        close_temp: payload.records[0].close_temp,
        close_density: payload.records[0].close_density,
        avl_sum: payload.records[0].avl_sum,
        cvl_sum: payload.records[0].cvl_sum,
      });
    }
  }, [payload]);

  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item
            name="closeout_nr"
            label={t('fields.endCloseout')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="pmv_date2"
            label={t('fields.endDate')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="tank_level"
            label={t('fields.endLevel')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="pmv_close_amb"
            label={t('fields.endAmb')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item
            name="pmv_close_cor"
            label={t('fields.endStd')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="close_temp"
            label={t('fields.endTemp')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="close_density"
            label={t('fields.endDens')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="avl_sum"
            label={t('fields.finalAmb')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8, 8]}>
        <Col span={6}>
          <Form.Item
            name="cvl_sum"
            label={t('fields.finalStd')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default EndFolio;
