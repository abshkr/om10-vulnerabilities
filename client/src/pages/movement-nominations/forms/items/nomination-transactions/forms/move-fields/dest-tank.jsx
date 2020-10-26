import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { NOMINATION_TRANSACTIONS } from '../../../../../../../api';

const DestinationTank = ({ form, value, onChange, pageState, config }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const {
    data: options,
    isValidating,
  } = useSWR(
    `${NOMINATION_TRANSACTIONS.TANKS_BY_DRAWPROD}?supplier=${value?.mvitm_prodcmpy_to}&product=${value?.mvitm_prodcode_to}`,
    { refreshInterval: 0 }
  );

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranToTank')}`);
      }
    }

    return Promise.resolve();
  };

  const getTankItem = (code, list) => {
    // find the item having a particular tank_code
    let tank_item = _.filter(list, (item) => {
      return item.tank_code === code;
    });
    console.log('dest tank, getTankItem', code, list, tank_item);
    return tank_item;
  };

  const onTankChange = (value) => {
    // console.log('dest tank, onTankChange', value);
    if (pageState === 'receipt' || (pageState === 'transfer' && config?.siteTransferTankSource === 'TO')) {
      onChange(getTankItem(value, options?.records));
    }
  };

  useEffect(() => {
    if (value && options) {
      setFieldsValue({
        mvitm_tank_to: value.mvitm_tank_to,
      });

      console.log('dest tank, useEffect', value, options?.records);
      //onChange(value.mvitm_tank_to);
      if (pageState === 'receipt' || (pageState === 'transfer' && config?.siteTransferTankSource === 'TO')) {
        onChange(getTankItem(value.mvitm_tank_to, options?.records));
      }
    }
  }, [value, setFieldsValue, onChange, options, pageState, config]);

  return (
    <Form.Item
      name="mvitm_tank_to"
      label={t('fields.nomtranToTank')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        loading={isValidating}
        allowClear
        showSearch
        onChange={onTankChange}
        disabled={pageState === 'disposal' ? true : false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectFromTank') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.tank_code}>
            {item.tank_desc}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DestinationTank;
