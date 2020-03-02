import React, { useEffect, useCallback } from 'react';

import { Form, Select, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { PERSONNEL } from '../../../../api';

const Lock = ({ form, value }) => {
  const { t } = useTranslation();
  const { data } = useSWR(PERSONNEL.AREAS);

  const { setFieldsValue } = form;

  const choices = [
    {
      key: 'Yes',
      value: 'Y'
    },
    {
      key: 'No',
      value: 'N'
    }
  ];

  const handleAreaConversion = useCallback(values => {
    const payload = [];

    _.forEach(values, object => {
      payload.push({
        label: object.area_name,
        value: object.area_k
      });
    });

    return payload;
  }, []);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        per_lock: value.per_lock,
        area_accesses: value.area_accesses
      });
    } else {
      setFieldsValue({
        per_lock: 'N'
      });
    }
  }, [value, setFieldsValue, handleAreaConversion]);

  const options = handleAreaConversion(data?.records);

  return (
    <div className="personnel-lock">
      <Form.Item name="per_lcok" label={t('fields.lockOut')}>
        <Select>
          {choices.map((item, index) => (
            <Select.Option key={index} value={item.value}>
              {item.key}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Divider />
      <Form.Item name="area_accesses" label="">
        <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }} options={options} />
      </Form.Item>
    </div>
  );
};

export default Lock;
