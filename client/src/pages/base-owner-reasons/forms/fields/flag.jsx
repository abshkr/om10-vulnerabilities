import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const ReasonFlag = ({ form, value, onChange }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const handleCheck = (e) => {
    onChange(e.target.checked);
  };

  useEffect(() => {
    if (value) {
      onChange(value.otr_flag);

      setFieldsValue({
        otr_flag: value.otr_flag,
      });
    }
  }, [value, onChange, setFieldsValue]);

  return (
    <Form.Item name="otr_flag" valuePropName="checked">
      <Checkbox onChange={handleCheck} disabled={false}>
        {t('fields.otrFlag')}
      </Checkbox>
    </Form.Item>
  );
};

export default ReasonFlag;
