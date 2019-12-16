import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import _ from 'lodash';

const MaxFlow = ({ form, value, t }) => {
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

  const handleValidation = (rule, input, callback) => {
    if (input && !_.isInteger(parseInt(input))) {
      callback(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && input.length > 126) {
      callback(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }

    callback();
  };

  return (
    <div>
      <Form.Item label={`${t('fields.flowContributionStage')}: 1`}>
        {getFieldDecorator('tank_max_flow.0.tank_level', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.0.flow_rate', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>

      <Form.Item label={`${t('fields.flowContributionStage')}: 2`}>
        {getFieldDecorator('tank_max_flow.1.tank_level', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.1.flow_rate', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>

      <Form.Item label={`${t('fields.flowContributionStage')}: 3`}>
        {getFieldDecorator('tank_max_flow.2.tank_level', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.2.flow_rate', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>

      <Form.Item label={`${t('fields.flowContributionStage')}: 4`}>
        {getFieldDecorator('tank_max_flow.3.tank_level', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.tankLevel')} />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_max_flow.3.flow_rate', {
          rules: [
            {
              validator: handleValidation,
            },
          ],
        })(<Input addonBefore={t('fields.flowRate')} />)}
      </Form.Item>
    </div>
  );
};

export default MaxFlow;
