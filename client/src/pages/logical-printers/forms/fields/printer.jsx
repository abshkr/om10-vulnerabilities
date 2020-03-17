import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { LOGICAL_PRINTERS } from '../../../../api';
import { Form, Select } from 'antd';

const Printer = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOGICAL_PRINTERS.PRINTERS);
  const { data: logicalPrinters } = useSWR(LOGICAL_PRINTERS.READ);

  const { setFieldsValue, getFieldsValue } = form;

  const matches = getFieldsValue(['prt_usage_name', 'prt_printer']);

  const validate = (rule, value) => {
    const match = _.find(logicalPrinters?.records, value => {
      return value.prt_usage_name === matches.prt_usage_name && value.prt_printer === matches.prt_printer;
    });

    if (value && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.printer')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prt_printer: value.prt_printer
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
            {item.sys_prntr}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Printer;
