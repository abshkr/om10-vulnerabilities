import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { ID_ASSIGNMENT } from '../../../../api';

const Tanker = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const carrier = getFieldValue('kya_tnkr_cmpy');

  const { data: options, isValidating, revalidate } = useSWR(
    `${ID_ASSIGNMENT.TANKERS}?tnkr_owner=${carrier}`
  );

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.tanker')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_tanker: value.kya_tanker
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    revalidate();

    if (!value) {
      setFieldsValue({
        kya_tanker: undefined
      });
    }
  }, [carrier, revalidate, setFieldsValue, value]);

  return (
    <Form.Item label={t('fields.tanker')}>
      {getFieldDecorator('kya_tanker', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          disabled={!carrier}
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectTanker') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.tnkr_code}>
              {item.tnkr_desc}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Tanker;
