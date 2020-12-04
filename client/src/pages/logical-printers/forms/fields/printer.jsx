import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { LOGICAL_PRINTERS } from '../../../../api';
import { Form, Select } from 'antd';

const Printer = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOGICAL_PRINTERS.PRINTERS);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' && !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.printer')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prt_printer: value.prt_printer,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="prt_printer"
      label={t('fields.printer')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectPrinter') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.prntr}>
            {item.prntr_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Printer;
