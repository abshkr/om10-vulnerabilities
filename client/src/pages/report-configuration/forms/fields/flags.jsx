import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox } from 'antd';

const Flags = ({ form, value, onCanEmailChange, onEnabledChange, enabled, canEmail }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_active: value.report_active,
        report_enabled: value.report_enabled,
        report_canemail: value.report_canemail,
        report_canprint: value.report_canprint
      });

      onEnabledChange(value.report_enabled);
      onCanEmailChange(value.report_canemail);
    }
  }, [value, setFieldsValue, onEnabledChange, onCanEmailChange]);

  useEffect(() => {
    if (enabled === false) {
      setFieldsValue({
        report_active: false,
        report_canemail: false,
        report_canprint: false
      });
    }
  }, [enabled, setFieldsValue]);

  return (
    <div>
      <Form.Item name="report_enabled" valuePropName="checked">
        <Checkbox onChange={query => onEnabledChange(query.target.checked)}>
          {t('fields.enableReportForCompany')}
        </Checkbox>
      </Form.Item>

      <Form.Item name="report_active" valuePropName="checked">
        <Checkbox disabled={!enabled}>{t('fields.companyCanActivateReportUsage')}</Checkbox>
      </Form.Item>

      <Form.Item name="report_canprint" valuePropName="checked">
        <Checkbox disabled={!enabled}>{t('fields.companyCanReceiveReportByPrinting')}</Checkbox>
      </Form.Item>

      <Form.Item name="report_canemail" valuePropName="checked">
        <Checkbox onChange={query => onCanEmailChange(query.target.checked)} disabled={!enabled && !canEmail}>
          {t('fields.companyCanReceiveReportByEmail')}
        </Checkbox>
      </Form.Item>
    </div>
  );
};

export default Flags;
