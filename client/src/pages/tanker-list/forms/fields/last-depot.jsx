import React, { useEffect } from 'react';
import { TANKER_LIST } from '../../../../api';
import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';

const LastDepot = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(TANKER_LIST.CARRIERS);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_last_depot: value.tnkr_last_depot
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="tnkr_last_depot" label={t('fields.lastDepot')} rules={[{ required: false }]}>
      <Select
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectLastDepot') : null}
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

export default LastDepot;
