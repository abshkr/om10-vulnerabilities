import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { PARTNERSHIP } from '../../../../api';

const Partner = ({ form, value, company, disable }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(`${PARTNERSHIP.PARTNERS}?supplier=${company}`);
  const { setFieldsValue } = form;

  const validate = (rule, value) => {
    if (value === '' || !value) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.partner')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      if (value.peers.length > 0) {
        let payload = [];
        for (let i = 0; i < value.peers.length; i++) {
          payload.push(value.peers[i].prtnr_desc)
        }
        
        setFieldsValue({
          partner: payload,
        });
      } else {
        setFieldsValue({
          partner: [value.prtnr_desc],
        });
      }

      setFieldsValue({
        partners: {
          partner_seq: value.partner_seq
        },
      });
    }
  }, [value, setFieldsValue]);

  const onChange = (values) => {
    const payload = [];

    _.forEach(options?.records, (record) => {
      if (values.includes(record.prtnr_desc)) {
        payload.push({
          partner_seq: record.prtnr_seq,
        });
      }
    });

    setFieldsValue({
      partners: payload,
    });
  };

  return (
    <>
      <Form.Item name="partners" noStyle />
      <Form.Item name="partner" label={t('fields.partner')} rules={[{ required: true, validator: validate }]}>
        <Select
          loading={isValidating}
          disabled={isValidating || disable}
          onChange={onChange}
          showSearch
          mode="multiple"
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectPartner') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {options?.records.map((item, index) => (
            <Select.Option key={index} value={item.prtnr_desc}>
              {item.prtnr_desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default Partner;
