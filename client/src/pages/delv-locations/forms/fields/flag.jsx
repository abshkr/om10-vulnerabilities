import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flag = ({ form, value, onChange }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const handleChange = (event) => {
    const { checked } = event.target;

    onChange(checked);

    setFieldsValue({
      delv_grid: checked ? 'CSTDLV' : undefined,
    });
  };

  useEffect(() => {
    if (value) {
      const payload = value.delv_grid === 'CSTDLV' ? true : false;

      setFieldsValue({
        delv_flag: payload,
      });

      onChange(payload);
    }
  }, [value, setFieldsValue, onChange]);

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item name="delv_flag" style={{ marginTop: 5 }} valuePropName="checked">
        <Checkbox onChange={handleChange}> {t('fields.delvFlag')} </Checkbox>
      </Form.Item>
    </div>
  );
};

export default Flag;
