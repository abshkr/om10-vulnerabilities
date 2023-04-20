import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

import CheckboxContainer from './style';

const BaseAllocFlag = ({ form, value, type }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  const [flag, setFlag] = useState(type === '1' ? true : value?.alloc_baseflag);

  const onCheck = (v) => {
    setFlag(v.target.checked);
    setFieldsValue({
      alloc_baseflag: v.target.checked,
    });
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        alloc_baseflag: value.alloc_baseflag,
      });
      setFlag(value.alloc_baseflag);
    }
  }, [value, setFieldsValue, setFlag]);

  useEffect(() => {
    if (!value && type === '1') {
      setFieldsValue({
        alloc_baseflag: true,
      });
      setFlag(true);
    }
  }, [value, type, setFieldsValue, setFlag]);

  return (
    <Form.Item name="alloc_baseflag" label={t('fields.allocBaseFlag')}>
      <CheckboxContainer>
        <Checkbox checked={flag} onChange={onCheck} disabled={type === '1'}></Checkbox>
      </CheckboxContainer>
    </Form.Item>
  );
};

export default BaseAllocFlag;
