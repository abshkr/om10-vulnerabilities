import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flag = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        delv_flag: value.delv_grid==='CSTDLV'? true : false
      });

      //onChange(e.target.value? 'CSTDLV' : '');
    }
  }, [value, setFieldsValue]);
/*
  const onChange = (e) => {
    if (value) {
      value.delv_grid = e.target.checked? 'CSTDLV' : '';
    }
  };
*/
  return (
    <div style={{ display: 'flex' }}>
      <Form.Item name="delv_flag" style={{ marginTop: 5 }} valuePropName="checked">
        <Checkbox > {t('fields.delvFlag')} </Checkbox>
      </Form.Item>
    </div>
  );
};

export default Flag;
