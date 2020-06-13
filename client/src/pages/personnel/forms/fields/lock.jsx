import React, { useEffect, useCallback, useState } from 'react';

import { Form, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import _ from 'lodash';

import { PERSONNEL } from '../../../../api';

const Lock = ({ form, value }) => {
  const { t } = useTranslation();
  const { data } = useSWR(PERSONNEL.AREAS);

  const { setFieldsValue } = form;
  const [lockout, setLockout] = useState(value?.per_lock);

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

  const onChange = (e) => {
    setLockout(e.target.checked);
  }

  useEffect(() => {
    if (value) {
      setLockout(value.per_lock);
      setFieldsValue({
        per_lock: value.per_lock,
        area_accesses: value.area_accesses,
      });
    } else {
      setFieldsValue({
        per_lock: false
      });
    }
  }, [value, setFieldsValue]);

  const options = handleAreaConversion(data?.records);

  return (
    <div className="personnel-lock">
      <Form.Item 
        name="per_lock" 
        label="Area Access Control" 
        valuePropName="checked"
        onChange={onChange}
      >
        <Checkbox>{t('fields.lockOut')}</Checkbox>
      </Form.Item>
      <Divider></Divider>
      <Form.Item name="area_accesses" label={t("fields.areaAccess")}>
        <Checkbox.Group 
          style={{ display: 'flex', flexDirection: 'column' }} 
          options={options} 
          disabled={lockout}
        />
      </Form.Item>
    </div>
  );
};

export default Lock;
