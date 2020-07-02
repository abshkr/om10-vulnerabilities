import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

const DailyVariance = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const handlePercentageValidation = (rule, input) => {
    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && parseInt(input) < -100) {
      return Promise.reject(`${t('placeholder.limit')}: ${-100} ─ ${t('descriptions.valueTooLow')}`);
    }

    if (input && parseInt(input) > 100) {
      return Promise.reject(`${t('placeholder.limit')}: ${100} ─ ${t('descriptions.valueTooHigh')}`);
    }

    return Promise.resolve();
  };

  const handleVolumeValidation = (rule, input) => {
    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && input.length > 126) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 126 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_dtol_percent: value.tank_dtol_percent,
        tank_dtol_volume: value.tank_dtol_volume
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Form.Item
        name="tank_dtol_percent"
        label={`${t('fields.dailyVarianceLimit')} (%)`}
        style={{ flex: '1 1 auto', marginRight: 5, width: 300 }}
        rules={[
          {
            validator: handlePercentageValidation
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tank_dtol_volume"
        label={`${t('fields.dailyVarianceLimit')} (${t('units.volume')})`}
        style={{ flex: '1 1 auto', marginLeft: 5, width: 300 }}
        rules={[
          {
            validator: handleVolumeValidation
          }
        ]}
      >
        <Input addonAfter={t('units.litres')} />
      </Form.Item>
    </div>
  );
};

export default DailyVariance;
