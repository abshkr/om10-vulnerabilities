import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import _ from 'lodash';

const Levels = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const onMaxLevelValidation = (rule, input) => {
    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && parseInt(input) < -100) {
      return Promise.reject(`${t('placeholder.limit')}: ${-100} ─ ${t('descriptions.valueTooLow')}`);
    }

    return Promise.resolve();
  };

  const onUserLevelValidation = (rule, input) => {
    if (input && !_.isInteger(parseInt(input))) {
      return Promise.reject(`${t('placeholder.wrongType')}: ${t('types.integer')}`);
    }

    if (input && parseInt(input) < 0) {
      return Promise.reject(`${t('placeholder.limit')}: ${0} ─ ${t('descriptions.valueTooLow')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_max_level: value.tank_max_level,
        tank_ul_level: value.tank_ul_level,
        tank_uh_level: value.tank_uh_level,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <Form.Item
        name="tank_max_level"
        label={`${t('fields.tankMaxLevel')} (${t('units.mm')})`}
        style={{ flex: '1 1 auto', marginRight: 5, width: 300 }}
        rules={[
          {
            validator: onMaxLevelValidation,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tank_ul_level"
        label={`${t('fields.userLLevel')} (${t('units.mm')})`}
        style={{ flex: '1 1 auto', marginLeft: 5, width: 300 }}
        rules={[
          {
            validator: onUserLevelValidation,
          },
        ]}
      >
        <Input addonAfter={t('units.mm')} />
      </Form.Item>

      <Form.Item
        name="tank_uh_level"
        label={`${t('fields.userHLevel')} (${t('units.mm')})`}
        style={{ flex: '1 1 auto', marginLeft: 5, width: 300 }}
        rules={[
          {
            validator: onUserLevelValidation,
          },
        ]}
      >
        <Input addonAfter={t('units.mm')} />
      </Form.Item>
    </div>
  );
};

export default Levels;
