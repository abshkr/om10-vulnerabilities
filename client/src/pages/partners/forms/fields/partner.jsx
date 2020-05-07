import React, { useEffect } from 'react';

import useSWR from 'swr';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { PARTNERSHIP } from '../../../../api';

const Partner = ({ form, value, company }) => {
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
      const payload = [
        value.prtnr_name1,
        value.prtnr_name2,
        value.prtnr_name3,
        value.prtnr_name4,
        value.prtnr_name5,
      ];

      const filtered = _.reject(payload, function (o) {
        return o === '';
      });

      setFieldsValue({
        partner: filtered,
      });
    }
  }, [value, setFieldsValue]);

  const onChange = (values) => {
    const payload = [];

    _.forEach(options?.records, (record) => {
      if (values.includes(record.prtnr_name1)) {
        console.log(record);
        payload.push({
          partner_cmpy_code: record.prtnr_cmpy,
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
          disabled={isValidating}
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
            <Select.Option key={index} value={item.prtnr_name1}>
              {item.prtnr_desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default Partner;
