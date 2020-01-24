import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';

import { LOGICAL_PRINTERS } from '../../../../api';
import { Form, Select } from 'antd';

const Printer = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: payload, isValidating } = useSWR(LOGICAL_PRINTERS.PRINTERS);

  const { getFieldDecorator, setFieldsValue } = form;

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.printer')}`);
    }

    callback();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prt_printer: value.prt_printer
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.printer')}>
      {getFieldDecorator('prt_printer', {
        rules: [{ required: true, validator: validate }]
      })(
        <Select
          loading={isValidating}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectPrinter') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {payload?.records.map((item, index) => (
            <Select.Option key={index} value={item.prntr}>
              {item.sys_prntr}
            </Select.Option>
          ))}
        </Select>
      )}
    </Form.Item>
  );
};

export default Printer;
