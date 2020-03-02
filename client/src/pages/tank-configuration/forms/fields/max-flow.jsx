import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

const MaxFlow = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      const payload = {};

      _.forEach(value.tank_max_flow, (data, index) => {
        payload[`tank_max_flow.${index}.tank_level`] = data.tank_level;
        payload[`tank_max_flow.${index}.flow_rate`] = data.flow_rate;
      });

      setFieldsValue(payload);
    }
  }, [value, setFieldsValue]);

  const handleValidation = (rule, input) => {
    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && input.length > 126) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <div>
      <Form.Item
        name="tank_max_flow.0.tank_level"
        label={`${t('fields.flowContributionStage')}: 1`}
        rules={[
          {
            validator: handleValidation
          }
        ]}
      >
        <Input addonBefore={t('fields.tankLevel')} />
      </Form.Item>

      <Form.Item name="tank_max_flow.0.flow_rate">
        {getFieldDecorator('tank_max_flow.0.flow_rate', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>

      <Form.Item label={`${t('fields.flowContributionStage')}: 2`}>
        {getFieldDecorator('tank_max_flow.1.tank_level', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.1.flow_rate', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>

      <Form.Item label={`${t('fields.flowContributionStage')}: 3`}>
        {getFieldDecorator('tank_max_flow.2.tank_level', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.2.flow_rate', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>

      <Form.Item label={`${t('fields.flowContributionStage')}: 4`}>
        {getFieldDecorator('tank_max_flow.3.tank_level', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.3.flow_rate', {
          rules: [
            {
              validator: handleValidation
            }
          ]
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>
    </div>
  );
};

export default MaxFlow;
