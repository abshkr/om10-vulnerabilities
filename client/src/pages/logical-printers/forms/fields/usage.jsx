import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { LOGICAL_PRINTERS } from '../../../../api';

const Usage = ({ form, value, company }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(LOGICAL_PRINTERS.USAGES);
  const { data: logicalPrinters } = useSWR(LOGICAL_PRINTERS.READ);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    const match = _.find(logicalPrinters?.records, (object) => {
      return object.prt_usage === input && object.prt_cmpy === company;
    });

    if (input && !!match && !value) {
      return Promise.reject(t('descriptions.alreadyExists'));
    }

    if (input === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.usage')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        prt_usage: value.prt_usage,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item name="prt_usage" label={t('fields.usage')} rules={[{ required: true, validator: validate }]}>
      <Select
        loading={isValidating}
        showSearch
        disabled={!!value}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectUsage') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.use_id}>
            {item.use_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Usage;
