import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value }) => {
  const { t } = useTranslation();
  const { getFieldDecorator, setFieldsValue, getFieldValue } = form;

  const enabled = getFieldValue('report_enabled');
  const canEmail = getFieldValue('report_canemail');

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_active: value.report_active,
        report_enabled: value.report_enabled,
        report_canemail: value.report_canemail,
        report_canprint: value.report_canprint
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!enabled) {
      setFieldsValue({
        report_active: false,
        report_canemail: false,
        report_canprint: false
      });
    }
  }, [enabled, setFieldsValue]);

  return (
    <div>
      <Form.Item>
        {getFieldDecorator('report_enabled', { valuePropName: 'checked' })(
          <Checkbox>{t('fields.enableReportForCompany')}</Checkbox>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('report_active', { valuePropName: 'checked' })(
          <Checkbox disabled={!enabled}>{t('fields.companyCanActivateReportUsage')}</Checkbox>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('report_canprint', { valuePropName: 'checked' })(
          <Checkbox disabled={!enabled}>{t('fields.companyCanReceiveReportByPrinting')}</Checkbox>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('report_canemail', { valuePropName: 'checked' })(
          <Checkbox disabled={!enabled && !canEmail}>{t('fields.companyCanReceiveReportByEmail')}</Checkbox>
        )}
      </Form.Item>
    </div>
  );
};

export default Flags;
