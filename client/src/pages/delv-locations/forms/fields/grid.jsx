import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Grid = ({ form, value, flag }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input && input.length > 60) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 60 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_grid: value.delv_grid
      });
    }
  }, [value, setFieldsValue]);
/*
  const onChange = (e) => {
    if (value) {
      value.delv_flag = e.target.value === 'CSTDLV'? true : false;
    }
  };
*/
  return (
    <Form.Item name="delv_grid" label={t('fields.delvGrid')} rules={[{ validator: validate }]}>
      <Input disabled={flag}/>
    </Form.Item>
  );
};

export default Grid;
