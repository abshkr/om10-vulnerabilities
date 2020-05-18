import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const Grid = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const validate = (rule, input) => {
    if (input === '' || !input) {
      return Promise.reject(`${t('validate.set')} ─ ${t('fields.delvGrid')}`);
    }

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

      //onChange(e.target.value==='CSTDLV'? true : false);
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
    <Form.Item name="delv_grid" label={t('fields.delvGrid')} rules={[{ required: true, validator: validate }]}>
      <Input />
    </Form.Item>
  );
};

export default Grid;
