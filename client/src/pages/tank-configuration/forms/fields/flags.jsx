import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_exc_pid: value.tank_density,
        tank_exc_pds: value.tank_exc_pds,
        tank_exc_spmv: value.tank_exc_spmv,
        tank_exc_stckrpt: value.tank_exc_stckrpt
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item name="tank_exc_pid" valuePropName="checked">
        <Checkbox>{t('fields.excludeFromPID')}</Checkbox>
      </Form.Item>

      <Form.Item name="tank_exc_pds" valuePropName="checked">
        <Checkbox>{t('fields.excludeFromPDS')}</Checkbox>
      </Form.Item>

      <Form.Item name="tank_exc_spmv" valuePropName="checked">
        <Checkbox>{t('fields.excludeFromSMG')}</Checkbox>
      </Form.Item>

      <Form.Item name="tank_exc_stckrpt" valuePropName="checked">
        <Checkbox>{t('fields.excludeFromStockReport')}</Checkbox>
      </Form.Item>
    </div>
  );
};

export default Flags;
