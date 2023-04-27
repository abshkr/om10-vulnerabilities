import React, { useEffect, useState } from 'react';
import { Form, Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';

import CheckboxContainer from './style';

const BaseAllocFlag = ({ form, value, type, flag, setFlag }) => {
  const { t } = useTranslation();
  const { setFieldsValue } = form;
  // const [flag, setFlag] = useState(type === '1' ? true : value?.alloc_baseflag);

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
    if (!value && type === '3') {
      setFieldsValue({
        alloc_baseflag: false,
      });
      setFlag(false);
    }
  }, [value, type, setFieldsValue, setFlag]);

  return (
    <Form.Item name="alloc_baseflag" label={t('fields.allocBaseFlag')}>
      {type === '1' && (
        <CheckboxContainer>
          <Checkbox checked={flag} onChange={onCheck} disabled={true}></Checkbox>
        </CheckboxContainer>
      )}
      {type !== '1' && <Checkbox checked={flag} onChange={onCheck} disabled={false}></Checkbox>}
    </Form.Item>
  );
};

export default BaseAllocFlag;
