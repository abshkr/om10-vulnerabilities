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
      console.log(payload.records)
      setFieldsValue({
        avl_sum: payload.records[0].avl_sum,
        cvl_sum: payload.records[0].cvl_sum,
      });
    }
  }, [payload]);

  return (
    <>
      <Col span={8}>
          <Form.Item
            name="avl_sum"
            label={t('fields.bayAmb')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="cvl_sum"
            label={t('fields.bayStd')}
          >
            <Input disabled={!!value} />
          </Form.Item>
        </Col>
    </>
  );
};

export default BayLoaded;
