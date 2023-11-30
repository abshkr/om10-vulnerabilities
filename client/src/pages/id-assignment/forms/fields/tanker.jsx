import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LockOutlined, PaperClipOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { ID_ASSIGNMENT } from '../../../../api';

const Tanker = ({ form, value, owner, carrier, setTnkrNumber }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const { data: options, isValidating } = useSWR(
    `${ID_ASSIGNMENT.TANKERS}?tnkr_owner=${owner}&tnkr_carrier=${carrier}`
  );

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.tanker')}`);
    }

    return Promise.resolve();
  };

  const onChange = (value) => {
    const target = _.find(options?.records, (item) => {
      return item.tnkr_code === value;
    });
    setTnkrNumber(target?.tnkr_carrier, target?.tnkr_number);
    if (!owner) {
      setFieldsValue({
        kya_tnkr_cmpy: target?.tnkr_owner,
      });
    }
    if (!carrier) {
      setFieldsValue({
        kya_tnkr_carrier: target?.tnkr_carrier,
      });
    }
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        kya_tanker: value.kya_tanker,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        kya_tanker: undefined,
      });
    } else {
      if ((owner || carrier) && options) {
        const found = _.find(options?.records, (o) => o?.tnkr_code === value.kya_tanker);
        if (!found) {
          setFieldsValue({
            kya_tanker: undefined,
          });
        } else {
          setFieldsValue({
            kya_tanker: value.kya_tanker,
          });
        }
      }
    }
  }, [owner, carrier, options, setFieldsValue, value]);

  return (
    <Form.Item name="kya_tanker" label={t('fields.tanker')} rules={[{ required: true, validator: validate }]}>
      <Select
        popupMatchSelectWidth={false}
        disabled={!owner && !carrier}
        loading={isValidating}
        showSearch
        allowClear
        onChange={onChange}
        optionFilterProp="children"
        placeholder={!value ? t('placeholder.selectTanker') : null}
        filterOption={(input, option) =>
          String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options?.records.map((item, index) => (
          <Select.Option
            key={index}
            value={item.tnkr_code}
            disabled={item.tnkr_lock === 'Y' || item.tnkr_archive === 'Y'}
          >
            {item.tnkr_desc}
            {item.tnkr_lock === 'Y' ? <LockOutlined style={{ color: 'red' }} /> : ''}
            {item.tnkr_archive === 'Y' ? <PaperClipOutlined style={{ color: 'red' }} /> : ''}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Tanker;
