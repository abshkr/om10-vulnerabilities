import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { NOMINATION_TRANSACTIONS } from '../../../../api';

const SourceTank = ({ form, value, onChange, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(
    `${NOMINATION_TRANSACTIONS.TANKS}?supplier=${value?.mvitm_prodcmpy_from}`,
    { refreshInterval: 0,
    }
  );

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranFromTank')}`);
      }
    }

    return Promise.resolve();
  };

  const getTankItem = (code, list) => {
    // find the item having a particular tank_code
    let tank_item = _.filter(list, (item) => {
      return item.tank_code === code
    });

    return tank_item;
  };

  const onTankChange = (value) => {
    onChange(getTankItem(value, options?.records));
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_tank_from: value.mvitm_tank_from,
      });

      //onChange(value.mvitm_tank_from);
      onChange(getTankItem(value.mvitm_tank_from, options?.records));
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="mvitm_tank_from"
      label={t('fields.nomtranFromTank')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        loading={isValidating}
        showSearch
        onChange={onTankChange}
        disabled={(pageState==='receipt')? true : false}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectFromTank') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option key={index} value={item.tank_code}>
            {item.tank_name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SourceTank;
