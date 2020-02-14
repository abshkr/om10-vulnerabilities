import React, { useEffect } from 'react';
import { Form, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_closeout_flag: value.report_closeout_flag,
        report_ondemand_flag: value.report_ondemand_flag
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Divider>{t('divider.flags')}</Divider>
      <div style={{ display: 'flex' }}>
        <Form.Item>
          {getFieldDecorator('report_closeout_flag', {
            valuePropName: 'checked'
          })(<Checkbox>{t('fields.locked')}</Checkbox>)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('report_ondemand_flag', {
            valuePropName: 'checked'
          })(<Checkbox>{t('fields.adhoc')}</Checkbox>)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('report_ondemand_flag', {
            valuePropName: 'checked'
          })(<Checkbox>{t('fields.resetPin')}</Checkbox>)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('report_ondemand_flag', {
            valuePropName: 'checked'
          })(<Checkbox>{t('fields.removePin')}</Checkbox>)}
        </Form.Item>
      </div>
    </div>
  );
};

export default Flags;
