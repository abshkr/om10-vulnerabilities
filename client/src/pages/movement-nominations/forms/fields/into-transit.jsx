import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Row, Col } from 'antd';
import _ from 'lodash';

const IntoTransitFields = ({ form, value, receiptCount, receiptTotal }) => {
  const { t } = useTranslation();

  const { setFieldsValue, getFieldValue, getFieldsValue } = form;

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

  const onReceiptExpectedChange = () => {
    const fields = getFieldsValue(['mv_receipt_expected', 'mv_receipt_total']);
    const receiptExpected = fields?.mv_receipt_expected;
    const total = fields?.mv_receipt_total;
    const glValue = total - receiptExpected;
    setFieldsValue({
      // mv_receipt_total: receiptTotal,
      mv_into_transit_gl: glValue,
      mv_into_transit_gl_percent: receiptExpected > 0 ? _.round((glValue / receiptExpected) * 100, 4) : 0,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_receipt_expected: value.mv_receipt_expected,
        mv_receipt_total: value.mv_receipt_expected + value.mv_into_transit_gl,
        mv_into_transit_gl: value.mv_into_transit_gl,
        mv_into_transit_gl_percent:
          value.mv_receipt_expected > 0
            ? _.round((value.mv_into_transit_gl / value.mv_receipt_expected) * 100, 4)
            : 0,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (receiptTotal !== undefined) {
      const receiptExpected = getFieldValue('mv_receipt_expected');
      const glValue = receiptTotal - receiptExpected;
      setFieldsValue({
        mv_receipt_total: receiptTotal,
        mv_into_transit_gl: glValue,
        mv_into_transit_gl_percent: receiptExpected > 0 ? _.round((glValue / receiptExpected) * 100, 4) : 0,
      });
    }
  }, [receiptTotal, setFieldsValue]);

  return (
    <Row gutter={[8, 3]}>
      <Col span={6}>
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
            disabled={receiptCount === 0}
            onChange={onReceiptExpectedChange}
            placeholder={t('placeholder.setNomQtyReceiptExpected')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          name="mv_receipt_total"
          label={`${t('fields.nomQtyReceived')} (${receiptCount} ${t('fields.nomReceiptItems')})`}
        >
          <Input
            type="number"
            disabled={true}
            // placeholder={t('placeholder.setNomQtyReceiptExpected')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col span={6}>
        <Form.Item name="mv_into_transit_gl" label={t('fields.nomIntoTransitGL')}>
          <Input
            type="number"
            disabled={true}
            //placeholder={t('placeholder.setNomIntoTransitGL')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item name="mv_into_transit_gl_percent" label={t('fields.nomIntoTransitGLPercent')}>
          <Input
            type="number"
            disabled={true}
            // placeholder={t('placeholder.setNomIntoTransitGL')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default IntoTransitFields;
