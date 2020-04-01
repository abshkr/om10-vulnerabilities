import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { Form, Select } from 'antd';
import { TANKER_LIST } from '../../../../api';

const Destination = ({ form, value }) => {
  const { t } = useTranslation();
  const { data: options, isValidating } = useSWR(TANKER_LIST.TERMINAL);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_dest_depot: value.tnkr_dest_depot
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="fields" label={t('fields.destination')} rules={[{ required: false }]}>
      <Select
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectDestination') : null}
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

export default Destination;
