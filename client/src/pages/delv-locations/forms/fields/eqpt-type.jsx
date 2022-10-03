import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { DELV_LOCATIONS } from '../../../../api';
import { Form, Select } from 'antd';

const EquipmentType = ({ form, value }) => {
  const { t } = useTranslation();

  const [list, setList] = useState([]);
  const { data: options, isValidating } = useSWR(DELV_LOCATIONS.EQPT_TYPES);

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.delvEtyp')}`);
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_etyp_id: value.delv_etyp_id !== undefined ? String(value.delv_etyp_id) : list?.[0]?.etyp_id,
      });
    } else {
      setFieldsValue({
        delv_etyp_id: list?.[0]?.etyp_id,
      });
    }
  }, [value, list, setFieldsValue]);

  useEffect(() => {
    if (options?.records) {
      const arr = _.orderBy(options?.records, ['cmptnu'], ['desc']);
      setList(arr);
    }
  }, [options]);

  return (
    <Form.Item
      name="delv_etyp_id"
      label={t('fields.delvEtyp')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        showSearch
        allowClear
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEqptType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {list.map((item, index) => (
          <Select.Option key={index} value={item.etyp_id}>
            {item.etyp_title} [{t('fields.compartments')}: {item.cmptnu}]
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default EquipmentType;
