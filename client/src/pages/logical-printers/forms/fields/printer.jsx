import React, { useState, useEffect } from 'react';
import { logicalPrinters } from '../../../../api';
import { Form, Select } from 'antd';
import axios from 'axios';

const Printer = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const validate = (rule, input, callback) => {
    if (input === '' || !input) {
      callback(`${t('validate.select')} ─ ${t('fields.printer')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        prt_printer: value.prt_printer,
      });
    }

    const getContext = () => {
      axios.all([logicalPrinters.printers()]).then(
        axios.spread(options => {
          setOptions(options.data.records);
          setLoading(false);
        }),
      );
    };

    setLoading(true);
    getContext();
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.printer')}>
      {getFieldDecorator('prt_printer', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectPrinter') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options.map((item, index) => (
            <Select.Option key={index} value={item.prntr}>
              {item.sys_prntr}
            </Select.Option>
          ))}
        </Select>,
      )}
    </Form.Item>
  );
};

export default Printer;
