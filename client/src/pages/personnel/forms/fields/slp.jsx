import React, { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const SLP = ({ form, value }) => {
  const { t } = useTranslation();
  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        slp_id: value.slp_id
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input, callback) => {
    if (input && input.length > 40) {
      callback(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }
    callback();
  };

  return (
    <Form.Item label={t('fields.slp')}>
      {getFieldDecorator('slp_id', {
        rules: [{ required: false, validator: validate }]
      })(
        <Input
          disabled
          addonAfter={
            <Tooltip title="This functionality is not available at this stage.">
              <InfoCircleOutlined style={{ fontSize: 16 }} />
            </Tooltip>
          }
        />
      )}
    </Form.Item>
  );
};

export default SLP;
