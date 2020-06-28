import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const LpgRemark = ({ form, value, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.ddLpgRemark')}`);
      }
    }

    if (input && input.length > 70) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 70 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        dd_lpg_remark: value.dd_lpg_remark,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="dd_lpg_remark"
      label={t('fields.ddLpgRemark')}
      rules={[{ required: false, validator: validate }]}
    >
      <Input style={{ width: '100%' }} disabled={pageState === 'create' ? false : false} />
    </Form.Item>
  );
};

export default LpgRemark;
