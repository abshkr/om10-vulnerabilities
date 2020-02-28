import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TPP = ({ form, value }) => {
  const { t } = useTranslation();

  const { getFieldDecorator, setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tppoint: value.mv_tppoint,
        mv_tpp_text: value.mv_tpp_text
      });
    }
  }, [value, setFieldsValue]);

  return (
    <Form.Item label={t('fields.tpp')} labelCol="">
      <span>
        {getFieldDecorator('mv_tppoint')(
          <Input placeholder={t('placeholder.setTPPCode')} style={{ width: '29.5%', marginRight: '0.5%' }} />
        )}
        {getFieldDecorator('mv_tpp_text')(
          <Input placeholder={t('placeholder.setTPPDescription')} style={{ width: '70%' }} />
        )}
      </span>
    </Form.Item>
  );
};

export default TPP;
