import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { PRODUCT_GROUPS } from '../../../../api';

const Message = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PRODUCT_GROUPS.READ_MESSAGES);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.message')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cpm_msg_id: value.cpm_msg_id,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="cpm_msg_id"
      label={t('fields.message')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectMessage') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.cm_msg_id}>
            {`${item.cm_msg_id} - ${item.cm_msg_name}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Message;
