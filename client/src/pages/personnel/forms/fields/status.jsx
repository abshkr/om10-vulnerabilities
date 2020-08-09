import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import useSWR from 'swr';
import { PERSONNEL } from 'api';

const Status = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(PERSONNEL.USER_STATUS);
  const { setFieldsValue } = form;

  // const [options] = useState([
  //   {
  //     key: '0',
  //     value: 'Inactive'
  //   },
  //   {
  //     key: '1',
  //     value: 'Active'
  //   },
  //   {
  //     key: '2',
  //     value: 'Locked'
  //   }
  // ]);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        user_status_flag: value.user_status_flag
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="user_status_flag" label={t('fields.status')}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectStatus') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.user_status_flag} disabled={item.user_status_flag !== '2'}>
            {item.urer_status_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Status;
