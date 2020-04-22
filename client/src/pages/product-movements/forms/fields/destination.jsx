import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Select } from 'antd';
import useSWR from 'swr';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const Destination = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: types, typesLoading } = useSWR(PRODUCT_MOVEMENTS.TYPES);
  const { data: tanks, tanksLoading } = useSWR(PRODUCT_MOVEMENTS.TANKS);

  const [source, setSource] = useState(undefined);

  const { setFieldsValue } = form;

  const isLoading = typesLoading || tanksLoading;

  const validateType = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.destinationType')}`);
    }

    return Promise.resolve();
  };

  const validateCode = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.destinationUnit')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        pmv_dsttype: value.pmv_dsttype,
        pmv_dsttype_name: value.pmv_dsttype_name,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="pmv_dsttype"
        label={t('fields.destinationType')}
        rules={[{ required: true, validator: validateType }]}
      >
        <Select
          loading={isLoading}
          showSearch
          disabled={value}
          onChange={setSource}
          optionFilterProp="children"
          placeholder={t('placeholder.selectDestinationType')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {types?.records.map((item, index) => (
            <Select.Option key={index} value={item.pmv_id}>
              {item.pmv_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="pmv_dsttype_name"
        label={t('fields.destinationUnit')}
        rules={[{ required: true, validator: validateCode }]}
      >
        {source === '3' ? (
          <Select
            loading={isLoading}
            showSearch
            disabled={!source}
            optionFilterProp="children"
            placeholder={t('placeholder.setDestinationUnit')}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {tanks?.records.map((item, index) => (
              <Select.Option key={index} value={item.pmv_id}>
                {item.pmv_name}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Input disabled={!source} />
        )}
      </Form.Item>
    </>
  );
};

export default Destination;
