import React, { useState, useEffect } from 'react';

import { Form, Input, Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import api, { DRAWER_PRODUCTS } from 'api';
import { REGEX } from '../../../constants';

const GuardmasterProduct = ({ value, form, flag }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: qualitys, isValidating } = useSWR(DRAWER_PRODUCTS.PRODUCT_QUALITYS);

  const validateCode = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.copsGuardMasterProdCode')}`);
      }
    }

    if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    }

    const regex = new RegExp(REGEX.ALPHANUMERIC_NOSPACE);
    const validated = regex.exec(input);

    if (input && input.length > 0 && !validated) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.regexpTextAlphaNumericNoSpace')}`);
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 4) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: ${4} ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prod_guardmaster_code: value.prod_guardmaster_code,
        prod_guardmaster_quality: value.prod_guardmaster_quality,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Row gutter={[8, 2]}>
        <Col span={8}>
          <Form.Item
            name="prod_guardmaster_code"
            label={t('fields.copsGuardMasterProdCode')}
            rules={[{ required: false, validator: validateCode }]}
          >
            <Input disabled={!flag} />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item name="prod_guardmaster_quality" label={t('fields.copsGuardMasterProdQuality')}>
            <Select
              popupMatchSelectWidth={false}
              loading={isValidating}
              disabled={!flag}
              showSearch
              allowClear
              optionFilterProp="children"
              placeholder={!value ? t('placeholder.selectProductQuality') : null}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {qualitys?.records.map((item, index) => (
                <Select.Option key={index} value={item.quality_id}>
                  {item.quality_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GuardmasterProduct;
