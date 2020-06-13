import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input, Select } from 'antd';
import useSWR from 'swr';
import _ from 'lodash';

import { PRODUCT_MOVEMENTS } from '../../../../api';

const Destination = ({ form, value, base }) => {
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
        pmv_dstcode: value.pmv_dstcode,
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
        name="pmv_dstcode"
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
            {_.filter(tanks?.records, (item) => {
              return item.tank_base === base
            }).map((item, index) => (
              <Select.Option key={index} value={item.tank_code}>
                {item.tank_code}
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
