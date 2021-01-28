import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { AXLE_WEIGHTS } from 'api';

const AxleLimitTypes = ({ form, value, config, onChange }) => {
  const { t } = useTranslation();

  // const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.LIMIT_TYPES);
  const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.AVAIL_LIMIT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.axleLimitType')}`);
      }
    }

    return Promise.resolve();
  };

  const getLimitTypeID = (options, code) => {
    const typeItem = _.find(options?.records, (item) => {
      return item.axle_limit_type_code === code;
    });

    if (!typeItem) {
      return 1;
    } else {
      return typeItem.axle_limit_type_id;
    }
  };

  useEffect(() => {
    if (value && value.eqpt_axle_limit_type) {
      setFieldsValue({
        eqpt_axle_limit_type: value.eqpt_axle_limit_type,
      });

      onChange(value.eqpt_axle_limit_type);
    } else {
      // when !value or !value.eqpt_axle_limit_type, use the site setting
      if (options) {
        const num = getLimitTypeID(options, config?.siteAxleWeightLimitType);
        setFieldsValue({
          eqpt_axle_limit_type: num,
        });

        onChange(num);
      }
    }
  }, [value, options, config, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="eqpt_axle_limit_type"
      label={t('fields.axleLimitType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        // disabled={!!value}
        showSearch
        placeholder={!value ? t('placeholder.selectAxleLimitType') : null}
        onChange={onChange}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.axle_limit_type_id}>
            {item.axle_limit_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default AxleLimitTypes;
