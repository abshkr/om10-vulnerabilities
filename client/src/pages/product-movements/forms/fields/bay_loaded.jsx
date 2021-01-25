import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';
import useSWR from 'swr';
import { PRODUCT_MOVEMENTS } from 'api';

const BayLoaded = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();
  const { data: payload } = useSWR(`${PRODUCT_MOVEMENTS.BAY_LOADED}?pmv_number=${value?.pmv_number}`);

  useEffect(() => {
    if (payload && payload.records.length > 0) {
      setFieldsValue({
        bay_avl_sum: payload.records[0].bay_avl_sum,
        bay_cvl_sum: payload.records[0].bay_cvl_sum,
        bay_kg_sum: payload.records[0].bay_kg_sum,
      });
    }
  }, [payload]);

  return (
    <>
      <Col span={6}>
          <Form.Item
            name="bay_avl_sum"
            label={t('fields.bayAmb')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="bay_cvl_sum"
            label={t('fields.bayStd')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="bay_kg_sum"
            label={t('fields.bayKG')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
    </>
  );
};

export default BayLoaded;
