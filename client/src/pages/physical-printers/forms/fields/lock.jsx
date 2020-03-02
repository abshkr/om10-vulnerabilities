import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Lock = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prntr_lock: value.prntr_lock === 'Y'
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item name="prntr_lock">
        <Checkbox>{t('fields.locked')}</Checkbox>
      </Form.Item>
    </div>
  );
};

export default Lock;
