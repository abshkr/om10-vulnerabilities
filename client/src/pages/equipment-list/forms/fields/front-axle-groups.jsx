import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { AXLE_WEIGHTS } from 'api';

const FrontAxleGroups = ({ form, value, etype }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(AXLE_WEIGHTS.CURR_AXLE_WEIGHT_LIMIT);
  const { data: limits } = useSWR(`${AXLE_WEIGHTS.GET_ETYP_AXLE_WEIGHTS}?etyp_id=${etype}`);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || (input !== 0 && !input)) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.axleFrontWeightLimit')}`);
      }
    }

    return Promise.resolve();
  };

  const setDefaultLimit = (limit) => {
    const value = !limit ? limit : Number(limit);
    setFieldsValue({
      front_weigh_limit: value,
    });
  };

  useEffect(() => {
    if (value) {
      if (!value?.front_weigh_limit) {
        if (limits) {
          setDefaultLimit(limits?.records?.[0]?.front_weigh_limit);
        }
      } else {
        setFieldsValue({
          front_weigh_limit: value.front_weigh_limit,
        });
      }
    } else {
      if (limits) {
        setDefaultLimit(limits?.records?.[0]?.front_weigh_limit);
      }
    }
  }, [value, limits, setFieldsValue]);

  return (
    <Form.Item
      name="front_weigh_limit"
      label={t('fields.axleFrontWeightLimit')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        disabled={false}
        showSearch
        placeholder={!value ? t('placeholder.selectAxleGroup') : null}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.axle_group_id}>
            {item.axle_group_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default FrontAxleGroups;
