import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Divider } from 'antd';

const Levels = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_hh_level: value.tank_hh_level,
        tank_h_level: value.tank_h_level,
        tank_ll_level: value.tank_ll_level,
        tank_l_level: value.tank_l_level,
        tank_uh_level: value.tank_uh_level,
        tank_ul_level: value.tank_ul_level,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="tank_hh_level" label={t('fields.hhLevel')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_h_level" label={t('fields.hLevel')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_ll_level" label={t('fields.llLevel')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_l_level" label={t('fields.lLevel')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_uh_level" label={t('fields.userHLevel')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_ul_level" label={t('fields.userLLevel')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default Levels;
