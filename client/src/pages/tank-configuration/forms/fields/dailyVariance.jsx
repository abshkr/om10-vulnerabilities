import React, { useEffect } from 'react';
import _ from 'lodash';
import { Form, Input } from 'antd';

const DailyVariance = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const handlePercentageValidation = (rule, input, callback) => {
    if (input && !_.isInteger(parseInt(input))) {
      callback(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && parseInt(input) < -100) {
      callback(`${t('placeholder.limit')}: ${-100} ─ ${t('descriptions.valueTooLow')}`);
    }

    if (input && parseInt(input) > 100) {
      callback(`${t('placeholder.limit')}: ${100} ─ ${t('descriptions.valueTooHigh')}`);
    }

    callback();
  };

  const handleVolumeValidation = (rule, input, callback) => {
    if (input && !_.isInteger(parseInt(input))) {
      callback(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && input.length > 126) {
      callback(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_dtol_percent: value.tank_dtol_percent,
        tank_dtol_volume: value.tank_dtol_volume,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Form.Item
        label={`${t('fields.dailyVarianceLimit')} (%)`}
        style={{ flex: '1 1 auto', marginRight: 5, width: 300 }}
      >
        {getFieldDecorator('tank_dtol_percent', {
          initialValue: 0,
          rules: [
            {
              validator: handlePercentageValidation,
            },
          ],
        })(<Input />)}
      </Form.Item>

      <Form.Item
        label={`${t('fields.dailyVarianceLimit')} (${t('units.volume')})`}
        style={{ flex: '1 1 auto', marginLeft: 5, width: 300 }}
      >
        {getFieldDecorator('tank_dtol_volume', {
          initialValue: 0,
          rules: [
            {
              validator: handleVolumeValidation,
            },
          ],
        })(<Input addonAfter="Litres" />)}
      </Form.Item>
    </div>
  );
};

export default DailyVariance;
