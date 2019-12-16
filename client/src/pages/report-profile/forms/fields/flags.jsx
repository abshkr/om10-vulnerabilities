import React, { useEffect } from 'react';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_closeout_flag: value.report_closeout_flag,
        report_ondemand_flag: value.report_ondemand_flag,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <div>
      <Form.Item>
        {getFieldDecorator('report_closeout_flag', {
          valuePropName: 'checked',
        })(<Checkbox>{t('fields.closeOutReport')}</Checkbox>)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('report_ondemand_flag', {
          valuePropName: 'checked',
        })(<Checkbox>{t('fields.onDemandReport')}</Checkbox>)}
      </Form.Item>
    </div>
  );
};

export default Flags;
