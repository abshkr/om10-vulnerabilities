import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form, Select } from 'antd';
import { TANKER_LIST } from '../../../../api';

const Depot = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(TANKER_LIST.TERMINAL);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.baseDepot')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_base_site: value.tnkr_base_site
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="tnkr_base_site"
      label={t('fields.baseDepot')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDepot') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={item.term_code}>
            {item.term_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Depot;
