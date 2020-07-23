import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select, Checkbox } from 'antd';

import { PRODUCT_GROUPS } from '../../../../api';

const MessageLocale = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(PRODUCT_GROUPS.COMPLIANCE_LANGUAGE);

  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.messageLocale')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        cm_locale: value.cm_locale,
        cm_req_whole_ld: value.cm_req_whole_ld,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="cm_locale"
        label={t('fields.messageLocale')}
        rules={[{ required: true, validator: validate }]}
      >
        <Select
          dropdownMatchSelectWidth={false}
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectLocale') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.locale_code}>
              {item.locale_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="cm_req_whole_ld" valuePropName="checked">
        <Checkbox>{t('fields.requireWholeLoadToBeCompliant')}</Checkbox>
      </Form.Item>
    </>
  );
};

export default MessageLocale;
