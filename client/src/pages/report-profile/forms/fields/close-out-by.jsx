import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

const CloseOutReportBy = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  const options = [
    {
      key: 'Date Range [Start/End Date]',
      value: false
    },
    {
      key: 'Folio Range [Start/End Folio Number]',
      value: true
    }
  ];

  const validate = (rule, input, callback) => {
    if (input === '' || input === undefined) {
      return Promise.reject(`${t('validate.select')} ─ ${t('fields.closeOutReportBy')}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        report_closeout_flag2: value.report_closeout_flag2
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item
      name="report_closeout_flag2"
      label={t('fields.closeOutReportBy')}
      rules={[{ required: true, validator: validate }]}
    >
      <Select
        dropdownMatchSelectWidth={false}
        showSearch
        optionFilterProp="children"
        placeholder={t('placeholder.selectCloseOutReportBy')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {options.map(item => (
          <Select.Option key={item.value} value={item.value}>
            {item.key}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CloseOutReportBy;
