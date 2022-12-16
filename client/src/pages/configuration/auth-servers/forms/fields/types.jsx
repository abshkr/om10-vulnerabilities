import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

const Types = ({ form, value }) => {
  const { t } = useTranslation();

  const options = [
    {
      index: 1,
      code: 'LDAP',
      name: t('fields.authServerLDAP'),
    },
    {
      index: 2,
      code: 'SAML',
      name: t('fields.authServerSAML'),
    },
  ];

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.asType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        as_type: value.as_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="as_type" label={t('fields.asType')} rules={[{ required: true, validator: validate }]}>
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        // loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('fields.asType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((item, index) => (
          <Select.Option key={index} value={item.code}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Types;
