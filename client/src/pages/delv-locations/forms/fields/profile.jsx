import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { DELV_LOCATIONS } from '../../../../api';
import { Form, Select } from 'antd';

const Profile = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(DELV_LOCATIONS.PROFILES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvProfile')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_prf_code: value.delv_prf_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="delv_prf_code"
      label={t('fields.delvProfile')}
      rules={[{ required: false, validator: null }]}
    >
      <Select
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectProfile') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item?.prf_code}>
            {item?.prf_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Profile;
