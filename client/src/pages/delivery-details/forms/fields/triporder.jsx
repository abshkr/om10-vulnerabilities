import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const TripOrderNo = ({ form, value, defValue, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddTripOrdNo')}`);
      }
    }

    if (input && input.length > 9) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 9 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_tripord_no: value.dd_tripord_no,
      });
    } else {
      setFieldsValue({
        dd_tripord_no: defValue,
      });
    }
  }, [value, setFieldsValue, defValue]);

  return (
    <Form.Item
      name="dd_tripord_no"
      label={t('fields.ddTripOrdNo')}
      rules={[{ required: true, validator: validate }]}
    >
      <InputNumber style={{ width: '100%' }} disabled={pageState === 'create' ? true : true} />
    </Form.Item>
  );
};

export default TripOrderNo;
