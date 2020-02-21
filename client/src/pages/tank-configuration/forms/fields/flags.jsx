import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator } = form;

  return (
    <div>
      <Form.Item>
        {getFieldDecorator('tank_exc_pid', {
          valuePropName: 'checked',
          initialValue: value && value.tank_exc_pid
        })(<Checkbox>{t('fields.excludeFromPID')}</Checkbox>)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_exc_pds', {
          valuePropName: 'checked',
          initialValue: value && value.tank_exc_pds
        })(<Checkbox>{t('fields.excludeFromPDS')}</Checkbox>)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_exc_spmv', {
          valuePropName: 'checked',
          initialValue: value && value.tank_exc_spmv
        })(<Checkbox>{t('fields.excludeFromSMG')}</Checkbox>)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('tank_exc_stckrpt', {
          valuePropName: 'checked',
          initialValue: value && value.tank_exc_stckrpt
        })(<Checkbox>{t('fields.excludeFromStockReport')}</Checkbox>)}
      </Form.Item>
    </div>
  );
};

export default Flags;
