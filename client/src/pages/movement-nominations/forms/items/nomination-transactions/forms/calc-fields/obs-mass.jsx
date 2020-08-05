import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const ObsMass = ({ form, value, onChange, setValue, pageState, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.nomtranMass')}`);
      }
    }

    if (input && input.length > 100) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 100 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_qty_kg: value.mlitm_qty_kg,
      });

      onChange({ qty: value.mlitm_qty_kg, type: 'KG', title: t('fields.nomtranMass') });
      setValue(value.mlitm_qty_kg);
    }
  }, [value, setFieldsValue, onChange, setValue]);

  const handleFieldChange = (value) => {
    onChange({ qty: value, type: 'KG', title: t('fields.nomtranMass') });
    setValue(value);
  };

  return (
    <Form.Item
      name="mlitm_qty_kg"
      label={t('fields.nomtranMass') + '(' + t('fields.nomtranMassUnit') + ')'}
      rules={[{ required: false, validator: validate }]}
    >
      <InputNumber
        min={0}
        max={999999999}
        precision={config.precisionMass}
        style={{ width: '100%' }}
        onChange={handleFieldChange}
        disabled={pageState === 'transfer' ? false : false}
      />
    </Form.Item>
  );
};

export default ObsMass;
