import React, { useEffect } from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const AdaptiveFlowControlPriority = ({ form, value, flag }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const options = [
    {
      code: 'LILO',
      desc: 'LILO (' + t('descriptions.listLastIn') + ' / ' + t('descriptions.listLastOut') + ')',
    },
    {
      code: 'LIFO',
      desc: 'LIFO (' + t('descriptions.listLastIn') + ' / ' + t('descriptions.listFirstOut') + ')',
    },
  ];

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.adaptiveArmPriority')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    setFieldsValue({
      afc_priority: value ? value.afc_priority : '',
    });
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="afc_priority"
      label={t('fields.adaptiveArmPriority')}
      rules={[{ required: flag, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        showSearch
        allowClear
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectRefTempSpec') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map((item, index) => (
          <Select.Option key={index} value={item.code}>
            {item.desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AdaptiveFlowControlPriority;
