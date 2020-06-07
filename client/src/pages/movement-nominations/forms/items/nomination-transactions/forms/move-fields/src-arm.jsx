import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { NOMINATION_TRANSACTIONS } from '../../../../../../../api';

const SourceArm = ({ form, value, onChange, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const {
    data: options,
    isValidating,
  } = useSWR(
    `${NOMINATION_TRANSACTIONS.ARMS}?prod_code=${value?.mvitm_prodcode_from}&prod_cmpy=${value?.mvitm_prodcmpy_from}`,
    { refreshInterval: 0 }
  );

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranFromArm')}`);
      }
    }

    return Promise.resolve();
  };

  const getArmItem = (code, list) => {
    // find the item having a particular stream_armcode
    let arm_item = _.filter(list, (item) => {
      return item.stream_armcode === code;
    });

    return arm_item;
  };

  const onArmChange = (value) => {
    onChange(getArmItem(value, options?.records));
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_arm: value.mvitm_arm,
      });

      //onChange(value.mvitm_arm);
      onChange(getArmItem(value.mvitm_arm, options?.records));
    }
  }, [value, options, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="mvitm_arm"
      label={t('fields.nomtranFromArm')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        allowClear
        showSearch
        onChange={onArmChange}
        disabled={pageState === 'disposal' ? false : true}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectFromArm') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.stream_armcode}>
            {item.stream_armcode}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SourceArm;
