import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { MOVEMENT_NOMIATIONS } from '../../../../api';

const NominationSource = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(MOVEMENT_NOMIATIONS.SOURCES);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.nominationSource')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_srctype: value.mv_srctype
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="mv_srctype"
      label={t('fields.nominationSource')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        disabled={!!value}
        loading={isValidating}
        showSearch
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectNominationSource') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option
            key={index}
            value={item.movsource_type_id}
            disabled={!value && (item.movsource_type_id === '0' || item.movsource_type_id === '3')}
          >
            {item.movsource_type_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default NominationSource;
