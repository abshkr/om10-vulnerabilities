import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';

const TPP = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mv_tppoint: value.mv_tppoint,
        mv_tpp_text: value.mv_tpp_text
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="mv_tppoint" label={t('fields.tpp')}>
        <Input placeholder={t('placeholder.setTPPCode')} style={{ width: '29.5%', marginRight: '0.5%' }} />
      </Form.Item>

      <Form.Item name="mv_tpp_text">
        <Input placeholder={t('placeholder.setTPPDescription')} style={{ width: '70%' }} />
      </Form.Item>
    </>
  );
};

export default TPP;
