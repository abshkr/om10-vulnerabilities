import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';
import _ from 'lodash';

const IntoTransitFields = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validateInput = (rule, input) => {
    const min = rule?.minValue || 0;
    const max = rule?.maxValue || 999999999;
    const limit = rule?.maxLen || 256;
    console.log('.............rule', rule);

    if (rule?.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.set')} ─ ${rule?.label}`);
      }
    }

    if (input && _.toNumber(input) < min) {
      return Promise.reject(`${t('placeholder.minNumber')}: ${min} ─ ${t('descriptions.minNumber')}`);
    }

    if (input && _.toNumber(input) > max) {
      return Promise.reject(`${t('placeholder.maxNumber')}: ${max} ─ ${t('descriptions.maxNumber')}`);
    }

    if (input && input.length > limit) {
      return Promise.reject(
        `${t('placeholder.maxCharacters')}: ${limit} ─ ${t('descriptions.maxCharacters')}`
      );
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_receipt_expected: value.mv_receipt_expected,
        mv_into_transit_gl: value.mv_into_transit_gl,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Row gutter={[8, 3]}>
      <Col span={12}>
        <Form.Item
          name="mv_receipt_expected"
          label={t('fields.nomQtyReceiptExpected')}
          rules={[
            {
              required: false,
              validator: validateInput,
              label: t('fields.nomQtyReceiptExpected'),
              minValue: 0,
              maxValue: 999999999,
              maxLen: 20,
            },
          ]}
        >
          <Input
            type="number"
            disabled={false}
            placeholder={t('placeholder.setNomQtyReceiptExpected')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item name="mv_into_transit_gl" label={t('fields.nomIntoTransitGL')}>
          <Input
            type="number"
            disabled={false}
            placeholder={t('placeholder.setNomIntoTransitGL')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default IntoTransitFields;
