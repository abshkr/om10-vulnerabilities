import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

const ExpiryDateTarget = ({ form, value, all }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const options = [
    {
      id: 'TANKERS',
      title: 'Expiry Dates For Tankers'
    },

    {
      id: 'PERSONNEL',
      title: 'Expiry Dates For Personnel'
    },

    {
      id: 'TRANSP_EQUIP',
      title: 'Expiry Dates For Equipment'
    }
  ];

  const validate = (rule, input) => {
    const filtered = _.filter(all, (item) => {
      return item.edt_target_code === input;
    })
    console.log(filtered.length)
    
    if (filtered.length >= 10) {
      return Promise.reject(`${t('descriptions.maxExpTarget')}`);
    }

    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.expiryDateTarget')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        edt_target_code: value.edt_target_code
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="edt_target_code"
      label={t('fields.expiryDateTarget')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectExpiryDateTarget') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((item, index) => (
          <Select.Option key={index} value={item.id}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default ExpiryDateTarget;
