import React, { useEffect } from 'react';
import { Form, Select } from 'antd';

const CloseOutReportBy = ({ form, value, t }) => {
  const { getFieldDecorator, setFieldsValue } = form;

  const options = [
    {
      key: 'Date Range [Start/End Date]',
      value: false,
    },
    {
      key: 'Folio Range [Start/End Folio Number]',
      value: true,
    },
  ];

  const validate = (rule, input, callback) => {
    if (input === '' || input === undefined) {
      callback(`${t('validate.select')} ─ ${t('fields.closeOutReportBy')}`);
    }

    callback();
  };

  useEffect(() => {
    if (!!value) {
      setFieldsValue({
        report_closeout_flag2: value.report_closeout_flag2,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.closeOutReportBy')}>
      {getFieldDecorator('report_closeout_flag2', {
        rules: [{ required: true, validator: validate }],
      })(
        <Select
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
        </Select>,
      )}
    </Form.Item>
  );
};

export default CloseOutReportBy;
