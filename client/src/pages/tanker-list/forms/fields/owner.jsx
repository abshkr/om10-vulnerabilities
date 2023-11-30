import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TANKER_LIST } from '../../../../api';
import { Form, Select } from 'antd';
import useSWR from 'swr';

const Owner = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(TANKER_LIST.OWNERS);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.owner')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_owner: value.tnkr_owner,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="tnkr_owner" label={t('fields.owner')} rules={[{ required: true, validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectOwner') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.cmpy_code}>
            {item.cmpy_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Owner;
