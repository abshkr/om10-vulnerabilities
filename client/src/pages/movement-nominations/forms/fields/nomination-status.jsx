import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const NominationStatus = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.STATUS);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nominationStatus')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_status: value.mv_status,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mv_status"
      label={t('fields.nominationStatus')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        popupMatchSelectWidth={false}
        allowClear
        disabled={true}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectNominationStatus') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.movstatus_type_id}>
            {item.movstatus_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default NominationStatus;
