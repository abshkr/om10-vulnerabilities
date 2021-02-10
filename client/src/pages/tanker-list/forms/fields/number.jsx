import React, { useEffect } from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { NumericInput } from 'components';

const Number = ({ form, value, carrier, tankers }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.number')}`);
    }

    const match = _.find(tankers, item => {
      if (value) {
        return (item.tnkr_code != value.tnkr_code 
          && item.tnkr_carrier === (carrier !== null ? carrier : value.tnkr_carrier)
          && item.tnkr_number === input);
      }
      
      return (item.tnkr_carrier === carrier && item.tnkr_number === input);
    });

    if (input && match) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }
    
    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_number: value.tnkr_number,
      });
    }
  }, [value]);

  return (
    <Form.Item name="tnkr_number" label={t('fields.number')} rules={[{ required: true, validator: validate }]}>
      <NumericInput 
        inputValue={value?.tnkr_number} 
        onChange={(tnkr_number)=>setFieldsValue({
          tnkr_number: tnkr_number,
        })}
      />
    </Form.Item>
  );
};

export default Number;
