import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TANKER_LIST } from '../../../../api';
import { Form, Select } from 'antd';
import useSWR from 'swr';

const CurrentDepot = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(TANKER_LIST.TERMINAL);

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_cur_depot: value.tnkr_cur_depot
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="tnkr_cur_depot" label={t('fields.currentDepot')} rules={[{ required: false }]}>
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        disabled={!!value}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectCurrentDepot') : null}
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

export default CurrentDepot;
