import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Personnel = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const employer = getFieldValue('kya_psnl_cmpy');
  const role = getFieldValue('kya_role');

  const { data: options, isValidating, revalidate } = useSWR(
    `${ID_ASSIGNMENT.PSN}/?employer=${employer}&role=${role}`
  );

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.personnel')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_psnl_name: value.kya_psnl_name
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    revalidate();

    if (!value) {
      setFieldsValue({
        kya_psnl_name: undefined
      });
    }
  }, [employer, role, revalidate, setFieldsValue, value]);

  return (
    <Form.Item label={t('fields.personnel')}>
      {getFieldDecorator('kya_psnl_name', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          disabled={!employer || !role}
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectPersonnel') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.per_code}>
              {item.per_name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Personnel;
