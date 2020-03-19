import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { LOGICAL_PRINTERS } from '../../../../api';
import { Form, Select } from 'antd';

const Printer = ({ form, value, company, usage }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOGICAL_PRINTERS.PRINTERS);
  const { data: logicalPrinters } = useSWR(LOGICAL_PRINTERS.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const match = _.find(logicalPrinters?.records, object => {
      return object.prt_usage === usage && object.prt_printer === input && object.prt_cmpy === company;
    });

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' && !value) {
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
