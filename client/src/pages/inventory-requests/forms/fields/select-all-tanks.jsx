import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const SelectAllTanks = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tkrq_allflag: value.tkrq_allflag,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item name="tkrq_allflag" valuePropName="checked">
        <Checkbox>{t('fields.selectAllTanks')}</Checkbox>
      </Form.Item>
    </div>
  );
};

export default SelectAllTanks;
