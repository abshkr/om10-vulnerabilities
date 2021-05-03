import React, { useEffect, useState, useCallback } from 'react';
import api, { TANKER_LIST } from '../../../../api';
import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const EquipmentType = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  // const { data: options, isValidating } = useSWR(TANKER_LIST.EQUIPMENT_TYPES);
  const { data: options, isValidating } = useSWR(TANKER_LIST.TOTAL_COMPOSITION);

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.equipmentType')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tnkr_etp: _.toNumber(value.tnkr_etp),
      });
    }
  }, [value, setFieldsValue]);

  /* useEffect(() => {
    if (options) {
      console.log('..............', options);
    }
  }, [options]); */

  return (
    <Form.Item
      name="tnkr_etp"
      label={t('fields.equipmentType')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        loading={isValidating}
        disabled={!!value}
        showSearch
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectEquipmentType') : null}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records?.map((item, index) => (
          <Select.Option key={index} value={_.toNumber(item.etyp_id)}>
            {/* {`${item.etyp_id} - ${item.etyp_title} `} */}
            {`${item.etyp_id}[${item.etyp_title}]: [${t('fields.compartments')}:${
              //item?.compartments?.length
              item?.cmptnu
            }]${item?.etyp_class === '0' ? '' : '[' + t('fields.comboType') + ']'}${
              item?.compartments?.length === 0 ? '' : '[' + item?.compartments?.[0]?.cmpt_units + ']'
            }${item?.compartments?.map((item2, index) => `[${item2.safefill}]`)}`}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default EquipmentType;
