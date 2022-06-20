import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LockOutlined, PaperClipOutlined } from '@ant-design/icons';

import { NOMINATION_TRANSACTIONS } from '../../../../../../../api';

const Tanker = ({ form, value, carrier, onChange, pageState }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(
    `${NOMINATION_TRANSACTIONS.TANKERS}?tnkr_carrier=${carrier}`
  );

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.select')} ─ ${t('fields.nomtranTanker')}`);
      }
    }

    return Promise.resolve();
  };

  const onTankerChange = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mvitm_tanker: value.mvitm_tanker,
      });

      onChange(value.mvitm_tanker);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <Form.Item
      name="mvitm_tanker"
      label={t('fields.nomtranTanker')}
      rules={[{ required: false, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        allowClear
        loading={isValidating}
        showSearch
        onChange={onTankerChange}
        disabled={(pageState === 'transfer' ? false : false) || !carrier}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTanker') : null}
        filterOption={(value, option) =>
          option.props.children.toLowerCase().indexOf(value.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option
            key={index}
            value={item.tnkr_code}
            disabled={item.tnkr_lock === 'Y' || item.tnkr_archive === 'Y'}
          >
            {item.tnkr_code + (!item.tnkr_name ? '' : ' - ' + item.tnkr_name)}
            {item.tnkr_lock === 'Y' && <LockOutlined style={{ color: 'red' }} />}
            {item.tnkr_archive === 'Y' && <PaperClipOutlined style={{ color: 'red' }} />}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Tanker;
